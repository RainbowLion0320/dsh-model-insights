#!/usr/bin/env node
/**
 * Capture the public Artificial Analysis leaderboard into data/leaderboard.json.
 *
 *   node tools/fetch-aa.mjs
 *
 * The AA site renders the default (current models) leaderboard server-side, so
 * the table can be parsed without an API key. Their JSON API needs a key, and
 * this project does not ask for one.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = 'https://artificialanalysis.ai/leaderboards/models'

const html = await (await fetch(SOURCE, { headers: { 'user-agent': 'Mozilla/5.0' } })).text()
const rows = [...html.matchAll(/<tr[\s\S]*?<\/tr>/g)].map((m) => m[0])

const strip = (s) =>
  s
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const num = (s) => {
  if (!s) return null
  const m = String(s).replace(/,/g, '').match(/-?\d+(?:\.\d+)?/)
  return m ? Number(m[0]) : null
}

const ctxNum = (s) => {
  if (!s) return null
  const m = String(s).trim().toUpperCase().match(/(\d+(?:\.\d+)?)\s*([KM]?)/)
  if (!m) return null
  const v = Number(m[1])
  return m[2] === 'M' ? v * 1e6 : m[2] === 'K' ? v * 1e3 : v
}

const models = []
for (const row of rows) {
  const slug = row.match(/href="\/models\/([a-z0-9][a-z0-9.-]*)"/)?.[1]
  if (!slug) continue
  const cells = [...row.matchAll(/<td[\s\S]*?<\/td>/g)].map((m) => strip(m[0]))
  if (cells.length < 6) continue
  const intelligence = num(cells[1])
  if (intelligence === null) continue
  models.push({
    slug,
    name: cells[0],
    intelligence,
    cost: num(cells[2]),
    time: num(cells[3]),
    latency: num(cells[4]),
    context: ctxNum(cells[5]),
  })
}

mkdirSync(join(ROOT, 'data'), { recursive: true })
const payload = {
  source: SOURCE,
  index: /Intelligence Index v[\d.]+/.exec(strip(html))?.[0] || 'Artificial Analysis Intelligence Index',
  snapshot: new Date().toISOString().slice(0, 10),
  models,
}
writeFileSync(join(ROOT, 'data', 'leaderboard.json'), JSON.stringify(payload, null, 1))
console.log(`captured ${models.length} models -> data/leaderboard.json (${payload.snapshot})`)
