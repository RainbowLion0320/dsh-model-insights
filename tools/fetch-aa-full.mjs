#!/usr/bin/env node
/**
 * Crawl every Artificial Analysis model page and keep the per-reasoning-effort
 * rows (intelligence, cost per task, time per task).
 *
 *   node tools/fetch-aa-full.mjs [--limit N]
 *
 * AA's leaderboard page only ships its default view (about 60 scored rows) and
 * its JSON API needs a key. The model pages carry the full per-effort table in
 * their RSC payload, so this walks the sitemap once and writes
 * data/aa-points.jsonl.
 */
import { createWriteStream, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'data', 'aa-points.jsonl')
const UA = { 'user-agent': 'Mozilla/5.0' }
const limitArg = process.argv.indexOf('--limit')
const LIMIT = limitArg > 0 ? Number(process.argv[limitArg + 1]) : Infinity

const sitemap = await (await fetch('https://artificialanalysis.ai/sitemap.xml', { headers: UA })).text()
const IGNORE = new Set(['recommend', 'releases', 'comparisons', 'multilingual', 'caching'])
const slugs = [...new Set([...sitemap.matchAll(/https:\/\/artificialanalysis\.ai\/models\/([a-z0-9][a-z0-9.-]*)/g)].map((m) => m[1]))]
  .filter((slug) => !IGNORE.has(slug))
console.log(`sitemap: ${slugs.length} model pages`)

const decodeRsc = (html) => {
  const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,("[\s\S]*?")\]\)/g)].map((m) => m[1])
  let text = ''
  for (const raw of chunks) {
    try {
      text += JSON.parse(raw)
    } catch {
      /* a truncated chunk is not fatal */
    }
  }
  return text
}

const extractArrays = (text, marker) => {
  const out = []
  let from = 0
  for (;;) {
    const start = text.indexOf(marker, from)
    if (start < 0) break
    const begin = text.indexOf('[', start + marker.length - 1)
    let depth = 0
    let inString = false
    let escaped = false
    let end = -1
    for (let p = begin; p < text.length; p++) {
      const ch = text[p]
      if (inString) {
        if (escaped) escaped = false
        else if (ch === '\\') escaped = true
        else if (ch === '"') inString = false
        continue
      }
      if (ch === '"') inString = true
      else if (ch === '[') depth++
      else if (ch === ']') {
        depth--
        if (depth === 0) {
          end = p + 1
          break
        }
      }
    }
    if (end < 0) break
    try {
      out.push(JSON.parse(text.slice(begin, end)))
    } catch {
      /* skip malformed array */
    }
    from = end
  }
  return out
}

const rows = new Map()
const done = new Set()
if (existsSync(OUT)) {
  for (const line of readFileSync(OUT, 'utf8').split('\n')) {
    if (!line.trim()) continue
    try {
      const row = JSON.parse(line)
      rows.set(row.id, row)
      done.add(row.release)
    } catch {}
  }
  console.log(`resume: ${rows.size} points from ${done.size} releases`)
}

const sink = createWriteStream(OUT, { flags: 'a' })
let processed = 0
let cursor = 0
let failures = 0

const push = (entry) => {
  if (!entry || !entry.id || !entry.release) return
  if (entry.intelligenceIndex === null || entry.intelligenceIndex === undefined) return
  if (rows.has(entry.id)) return
  const cost = entry.intelligenceIndexCostPerTask && entry.intelligenceIndexCostPerTask.cost
  const row = {
    id: entry.id,
    release: entry.release.slug,
    name: entry.release.name,
    variant: entry.name,
    suffix: entry.suffix || null,
    effort: entry.effort ? entry.effort.slug : null,
    effortLevel: entry.effort ? entry.effort.level : null,
    intelligence: entry.intelligenceIndex,
    cost: cost && Number.isFinite(cost.total) ? cost.total : null,
    time: Number.isFinite(entry.intelligenceIndexTimePerTask) ? entry.intelligenceIndexTimePerTask : null,
    context: entry.contextWindowTokens || null,
    reasoning: !!entry.isReasoning,
    openWeights: !!entry.isOpenWeights,
    date: entry.releaseDate || null,
  }
  rows.set(row.id, row)
  sink.write(JSON.stringify(row) + '\n')
}

const worker = async () => {
  for (;;) {
    const index = cursor++
    if (index >= slugs.length || processed >= LIMIT) return
    const slug = slugs[index]
    try {
      const res = await fetch('https://artificialanalysis.ai/models/' + slug, { headers: UA })
      if (!res.ok) {
        failures++
        continue
      }
      const text = decodeRsc(await res.text())
      for (const array of extractArrays(text, '"initialModels":[')) {
        for (const entry of array) push(entry)
      }
    } catch (error) {
      failures++
    }
    processed++
    if (processed % 25 === 0) console.log(`progress ${processed}/${slugs.length} pages, points ${rows.size}, failures ${failures}`)
  }
}

await Promise.all(Array.from({ length: 8 }, worker))
sink.end()

const points = [...rows.values()]
writeFileSync(
  join(ROOT, 'data', 'aa-points.json'),
  JSON.stringify({ source: 'https://artificialanalysis.ai/models/<slug>', points }, null, 0),
)
console.log(`done: ${points.length} points across ${new Set(points.map((p) => p.release)).size} releases, failures ${failures}`)
