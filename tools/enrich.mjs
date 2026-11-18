#!/usr/bin/env node
/**
 * Add per-model pages for models the default leaderboard view omits.
 *
 *   node tools/enrich.mjs gpt-5-6-luna claude-opus-4-6 kimi-k3
 *
 * Model ids (or AA slugs) are resolved against the AA sitemap, the model page
 * is parsed for its intelligence index, cost per task and time per task, and
 * the rows land in data/extra-models.json, which tools/build.mjs merges.
 * Models AA has not evaluated come back empty, which is expected: the site
 * shows "N/A" for them and this project never invents a score.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const EXTRA = join(ROOT, 'data', 'extra-models.json')

const args = process.argv.slice(2)
if (!args.length) {
  console.error('usage: node tools/enrich.mjs <model-id-or-slug> [more...]')
  process.exit(1)
}

const sitemap = await (await fetch('https://artificialanalysis.ai/sitemap.xml')).text()
const IGNORE = new Set(['recommend', 'releases', 'comparisons', 'multilingual', 'caching'])
const slugs = [...new Set([...sitemap.matchAll(/https:\/\/artificialanalysis\.ai\/models\/([a-z0-9][a-z0-9.-]*)/g)].map((m) => m[1]))]
  .filter((slug) => !IGNORE.has(slug))

const norm = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '')

const resolveSlug = (id) => {
  const base = String(id).toLowerCase()
  for (const candidate of [base, base.replace(/\./g, '-')]) {
    if (slugs.includes(candidate)) return candidate
  }
  const key = norm(base)
  let best = null
  let bestPrefix = 0
  for (const slug of slugs) {
    const sk = norm(slug)
    let i = 0
    while (i < key.length && i < sk.length && key[i] === sk[i]) i++
    if (i > bestPrefix) {
      bestPrefix = i
      best = slug
    }
  }
  return best && bestPrefix >= Math.max(6, Math.floor(key.length * 0.6)) ? best : null
}

const parse = (html) => {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
  const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] || '')
    .replace(/&amp;/g, '&')
    .replace(/\s+Models?\s*[-–—:|].*$/i, '')
    .replace(/\s*[:|]\s*Intelligence.*$/i, '')
    .trim()
  return {
    name: title,
    intelligence: Number(text.match(/(\d{1,3})\s+Artificial Analysis Intelligence Index/)?.[1] ?? NaN),
    cost: Number(text.match(/\$(\d+(?:\.\d+)?)\s+Cost per Intelligence Index task/)?.[1] ?? NaN),
    time: Number(text.match(/(\d+(?:\.\d+)?)\s+Time per Intelligence Index task/)?.[1] ?? NaN),
  }
}

const existing = existsSync(EXTRA) ? JSON.parse(readFileSync(EXTRA, 'utf8')) : { models: [] }
const bySlug = new Map(existing.models.map((row) => [row.slug, row]))

for (const id of args) {
  const slug = resolveSlug(id)
  if (!slug) {
    console.log(`skip ${id}: no AA model page matches`)
    continue
  }
  const parsed = parse(await (await fetch('https://artificialanalysis.ai/models/' + slug, { headers: { 'user-agent': 'Mozilla/5.0' } })).text())
  if (!Number.isFinite(parsed.intelligence)) {
    console.log(`skip ${id} -> ${slug}: AA has no intelligence score`)
    continue
  }
  bySlug.set(slug, {
    slug,
    name: parsed.name || slug,
    intelligence: parsed.intelligence,
    cost: Number.isFinite(parsed.cost) ? parsed.cost : null,
    time: Number.isFinite(parsed.time) ? parsed.time : null,
  })
  console.log(`ok ${id} -> ${slug}: ${parsed.intelligence} / $${parsed.cost}`)
}

const models = [...bySlug.values()].sort((a, b) => b.intelligence - a.intelligence)
writeFileSync(EXTRA, JSON.stringify({ source: 'https://artificialanalysis.ai/models/<slug>', models }, null, 1))
console.log(`data/extra-models.json now holds ${models.length} rows`)
