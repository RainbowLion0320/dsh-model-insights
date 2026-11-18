#!/usr/bin/env node
/**
 * Build client.js from the per-effort AA points.
 *
 *   node tools/build.mjs
 *
 * Input  data/aa-points.json   (tools/fetch-aa-full.mjs)
 * Output data/aa.json, client.js
 *
 * Grades are Pareto layers over every *effort* point, not over models: a model
 * that is S at "max" and C at "low" is genuinely both, and the badge shows that
 * range instead of pretending there is one score per model.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const POINTS = join(ROOT, 'data', 'aa-points.json')

if (!existsSync(POINTS)) {
  console.error('missing data/aa-points.json — run: node tools/fetch-aa-full.mjs')
  process.exit(1)
}

const snapshot = JSON.parse(readFileSync(POINTS, 'utf8'))
const points = snapshot.points.filter((p) => Number.isFinite(p.intelligence) && Number.isFinite(p.cost))

// Pareto layers over points: maximize intelligence, minimize cost.
const dominatedBy = (a, b) =>
  b !== a &&
  b.intelligence >= a.intelligence &&
  b.cost <= a.cost &&
  (b.intelligence > a.intelligence || b.cost < a.cost)

const layers = []
let remaining = [...points].sort((a, b) => b.intelligence - a.intelligence || a.cost - b.cost)
while (remaining.length) {
  const layer = remaining.filter((a) => !remaining.some((b) => dominatedBy(a, b)))
  if (!layer.length) break
  layers.push(layer)
  const taken = new Set(layer)
  remaining = remaining.filter((p) => !taken.has(p))
}

const LETTERS = ['S', 'A', 'B', 'C']
const RANK = { S: 0, A: 1, B: 2, C: 3, D: 4 }
const assigned = new Map()
layers.forEach((layer, index) => {
  for (const point of layer) assigned.set(point.id, { layer: index + 1, grade: LETTERS[index] || 'D' })
})

// Group effort points per release.
const releases = new Map()
for (const point of points) {
  const meta = assigned.get(point.id)
  const entry = releases.get(point.release) || {
    slug: point.release,
    name: point.name,
    context: point.context || null,
    points: [],
  }
  entry.points.push({
    e: point.effort || null,
    lvl: Number.isFinite(point.effortLevel) ? point.effortLevel : null,
    i: Number(point.intelligence.toFixed(2)),
    c: Number(point.cost.toFixed(4)),
    t: Number.isFinite(point.time) ? Number(point.time.toFixed(1)) : null,
    y: meta ? meta.layer : null,
    r: meta ? meta.grade : null,
    v: point.variant || null,
  })
  releases.set(point.release, entry)
}

const rows = []
for (const entry of releases.values()) {
  const pts = entry.points
  const scored = pts.filter((p) => p.r)
  if (!scored.length) continue
  const iqs = scored.map((p) => p.i)
  const grades = scored.map((p) => p.r).sort((a, b) => RANK[a] - RANK[b])
  const best = grades[0]
  const worst = grades[grades.length - 1]
  const frontier = scored.some((p) => p.y === 1)
  // Default point: the model page's headline row is the highest-effort one.
  const headline = scored.reduce((acc, p) => (p.i > acc.i ? p : acc), scored[0])

  rows.push({
    s: entry.slug,
    n: entry.name,
    w: entry.context,
    iq: [Math.min(...iqs), Math.max(...iqs)],
    gr: [best, worst],
    p: frontier ? 1 : 0,
    d: { e: headline.e, i: headline.i, c: headline.c, r: headline.r },
    pts: scored
      .slice()
      .sort((a, b) => (b.lvl ?? -1) - (a.lvl ?? -1) || b.i - a.i)
      .map((p) => ({ e: p.e, i: p.i, c: p.c, t: p.t, r: p.r, y: p.y })),
  })
}

rows.sort((a, b) => RANK[a.gr[0]] - RANK[b.gr[0]] || b.iq[1] - a.iq[1])

// Quintile boundaries: each battery level holds about a fifth of the prices,
// so a log-normal price spread does not pile everything into one cell.
const sortedCosts = points
  .map((p) => p.cost)
  .filter((value) => Number.isFinite(value) && value > 0)
  .sort((a, b) => a - b)
const costQuantile = (p) => sortedCosts[Math.min(sortedCosts.length - 1, Math.floor(p * sortedCosts.length))]
const costBands = [costQuantile(0.2), costQuantile(0.4), costQuantile(0.6), costQuantile(0.8)]

const payload = {
  source: 'https://artificialanalysis.ai/models',
  index: 'Artificial Analysis Intelligence Index',
  snapshot: snapshot.snapshot || new Date().toISOString().slice(0, 10),
  builtAt: new Date().toISOString(),
  count: rows.length,
  points: points.length,
  layers: layers.length,
  costBands,
  models: rows,
}

writeFileSync(join(ROOT, 'data', 'aa.json'), JSON.stringify(payload))

const template = readFileSync(join(ROOT, 'client.template.js'), 'utf8')
const out = template.replace('/*__AA_DATA__*/null', JSON.stringify(payload))
if (out === template) throw new Error('data placeholder not found in client.template.js')
writeFileSync(join(ROOT, 'client.js'), out)

const gradeCounts = {}
for (const row of rows) gradeCounts[row.gr[0]] = (gradeCounts[row.gr[0]] || 0) + 1
console.log(`built ${rows.length} models from ${points.length} effort points (${layers.length} layers) -> client.js ${out.length} bytes`)
console.log('best-grade counts:', JSON.stringify(gradeCounts))
console.log('frontier models:', rows.filter((r) => r.p).length)
