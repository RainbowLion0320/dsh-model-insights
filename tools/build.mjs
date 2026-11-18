#!/usr/bin/env node
/**
 * Build client.js: derive value metrics, freeze them into data/aa.json, and
 * inline that snapshot into the Client module template.
 *
 *   node tools/build.mjs
 *
 * Inputs  data/leaderboard.json   (tools/fetch-aa.mjs)
 *         data/extra-models.json  (tools/enrich.mjs, optional)
 * Output  data/aa.json, client.js
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const leaderboard = JSON.parse(readFileSync(join(ROOT, 'data', 'leaderboard.json'), 'utf8'))
const extraPath = join(ROOT, 'data', 'extra-models.json')
const extra = existsSync(extraPath) ? JSON.parse(readFileSync(extraPath, 'utf8')) : { models: [] }

const models = []
const seen = new Set()
const add = (row) => {
  if (!row || seen.has(row.slug)) return
  if (!Number.isFinite(row.intelligence)) return
  seen.add(row.slug)
  models.push({
    slug: row.slug,
    name: row.name,
    intelligence: row.intelligence,
    cost: Number.isFinite(row.cost) ? row.cost : null,
    time: Number.isFinite(row.time) ? row.time : null,
    latency: Number.isFinite(row.latency) ? row.latency : null,
    context: Number.isFinite(row.context) ? row.context : null,
  })
}
for (const row of leaderboard.models) add(row)
for (const row of extra.models) add(row)

// Intelligence per dollar of one task.
for (const m of models) {
  m.value = m.cost && m.cost > 0 ? Number((m.intelligence / m.cost).toFixed(2)) : null
}

const values = models.map((m) => m.value).filter((v) => v !== null).sort((a, b) => a - b)
const quantile = (p) => values[Math.min(values.length - 1, Math.floor(p * (values.length - 1)))]
const hi = quantile(0.8)
const lo = quantile(0.4)

for (const m of models) {
  m.tier = m.value === null ? 0 : m.value >= hi ? 3 : m.value >= lo ? 2 : 1
}

// Log-scaled 0-100 value score (kept for the tooltip and panel ordering).
const logMin = Math.log(values[0])
const logMax = Math.log(values[values.length - 1])
for (const m of models) {
  m.score = m.value === null ? null : Math.round((100 * (Math.log(m.value) - logMin)) / (logMax - logMin))
}

// Grade by Pareto layer on (higher intelligence, lower cost) — the same read as
// AA's "Intelligence Index vs. Cost per Task" chart. Layer 1 is the frontier
// (nothing is both smarter and cheaper) and earns S; each peel below steps down
// a letter. A cheap model that a smarter, cheaper model already beats is NOT on
// the frontier and therefore never scores S.
const priced = models.filter((m) => m.cost !== null)
const dominatedBy = (a, b) =>
  b !== a &&
  b.intelligence >= a.intelligence &&
  b.cost <= a.cost &&
  (b.intelligence > a.intelligence || b.cost < a.cost)

const layers = []
let remaining = [...priced].sort((a, b) => b.intelligence - a.intelligence || a.cost - b.cost)
while (remaining.length) {
  const layer = remaining.filter((a) => !remaining.some((b) => dominatedBy(a, b)))
  if (!layer.length) break
  layers.push(layer)
  const taken = new Set(layer)
  remaining = remaining.filter((m) => !taken.has(m))
}

const LAYER_GRADES = ['S', 'A', 'B', 'C']
for (const [index, layer] of layers.entries()) {
  for (const m of layer) {
    m.layer = index + 1
    m.grade = LAYER_GRADES[index] || 'D'
  }
}
for (const m of models) {
  if (!m.layer) {
    m.layer = null
    m.grade = null
  }
}

const frontier = new Set(layers[0] ? layers[0].map((m) => m.slug) : [])

const layerSummary = layers.map((layer, index) => `${LAYER_GRADES[index] || 'D'}:${layer.length}`).join(' ')

const payload = {
  source: leaderboard.source,
  index: leaderboard.index,
  snapshot: leaderboard.snapshot,
  builtAt: new Date().toISOString(),
  count: models.length,
  models: models.map((m) => ({
    s: m.slug,
    n: m.name,
    i: m.intelligence,
    c: m.cost,
    t: m.time,
    l: m.latency,
    w: m.context,
    v: m.value,
    g: m.tier,
    q: m.score,
    r: m.grade,
    y: m.layer,
    p: frontier.has(m.slug) ? 1 : 0,
  })),
}

writeFileSync(join(ROOT, 'data', 'aa.json'), JSON.stringify(payload, null, 1))

const template = readFileSync(join(ROOT, 'client.template.js'), 'utf8')
const out = template.replace('/*__AA_DATA__*/null', JSON.stringify(payload))
if (out === template) throw new Error('data placeholder not found in client.template.js')
writeFileSync(join(ROOT, 'client.js'), out)

console.log(
  `built ${models.length} models (${priced.length} priced, ${frontier.size} on the frontier) -> data/aa.json, client.js (${out.length} bytes)`,
)
console.log(`pareto layers: ${layerSummary}`)
