window.__ModuleLoader__.load({
  id: 'dsh-model-insights',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Artificial Analysis snapshot, embedded at build time. */
    const AA = /*__AA_DATA__*/null

    const VARIANTS = new Set([
      'max', 'high', 'low', 'xhigh', 'medium', 'minimal', 'none',
      'default', 'fallback', 'reasoning', 'non', 'thinking', 'think',
      'preview', 'exp', 'experimental', 'turbo', 'instruct', 'chat',
      'latest', 'alpha', 'beta', 'rc', 'defaultfallback', 'hybrid',
      'highspeed', 'fast',
    ])

    const tokensOf = (text) =>
      String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((t) => t.replace(/\./g, ''))
        .filter((t) => t && !VARIANTS.has(t))

    const compactOf = (text) => tokensOf(text).join('')
    const NUMERIC = /^\d+$/

    /** Pick the most representative AA row for one compact key. */
    const better = (candidate, current) => {
      if (!current) return true
      const plain = (row) => !/\b(max|high|low|xhigh|default fallback)\b/i.test(row.n)
      if (plain(candidate) !== plain(current)) return plain(candidate)
      if (/\bdefault fallback\b/i.test(candidate.n) !== /\bdefault fallback\b/i.test(current.n)) {
        return /\bdefault fallback\b/i.test(candidate.n)
      }
      return candidate.i > current.i
    }

    const byKey = new Map()
    for (const row of AA.models) {
      const key = compactOf(row.n)
      if (!key) continue
      if (better(row, byKey.get(key))) byKey.set(key, row)
    }

    const byTokens = AA.models.map((row) => {
      const tokens = tokensOf(row.n)
      return { row, tokens, set: new Set(tokens) }
    })

    /**
     * Exact compact-name match first, then a guarded fuzzy pass: the query's
     * version numbers must all appear in the AA name, and only date-code-like
     * extras (>= 3 digits) are tolerated. A row that merely shares the vendor
     * and the generation number is not a match.
     */
    const lookup = (id, name) => {
      for (const key of [compactOf(name), compactOf(id)]) {
        if (key && byKey.has(key)) return { row: byKey.get(key), exact: true }
      }
      let best = null
      let bestScore = 0
      let bestExtra = Infinity
      for (const query of [tokensOf(name), tokensOf(id)]) {
        if (!query.length) continue
        const querySet = new Set(query)
        const queryNums = query.filter((t) => NUMERIC.test(t))
        for (const entry of byTokens) {
          if (!queryNums.every((n) => entry.set.has(n))) continue
          const extraNumbers = entry.tokens.filter((t) => NUMERIC.test(t) && !queryNums.includes(t))
          if (extraNumbers.some((n) => n.length < 3)) continue
          let shared = 0
          for (const token of querySet) if (entry.set.has(token)) shared++
          const coverage = shared / querySet.size
          const extra = entry.tokens.length - shared
          if (coverage > bestScore || (coverage === bestScore && extra < bestExtra)) {
            bestScore = coverage
            best = entry.row
            bestExtra = extra
          }
        }
      }
      return bestScore >= 0.8 ? { row: best, exact: false } : null
    }

    const money = (value) => {
      if (value === null || value === undefined) return '—'
      if (value === 0) return '$0'
      return value < 0.01 ? '<$0.01' : '$' + value.toFixed(2)
    }

    const TIER_COLOR = {
      3: 'var(--dsw-alias-state-success-primary)',
      2: 'var(--dsw-alias-state-warn-primary)',
      1: 'var(--dsw-alias-label-secondary)',
      0: 'var(--dsw-alias-label-secondary)',
    }

    /** Value grade letters: S is the top quintile of intelligence per dollar. */
    const GRADE_COLOR = {
      S: 'var(--dsw-alias-state-success-primary)',
      A: 'var(--dsw-alias-brand-primary)',
      B: 'var(--dsw-alias-label-primary)',
      C: 'var(--dsw-alias-state-warn-primary)',
      D: 'var(--dsw-alias-state-error-primary)',
    }

    const pill = (children, options) =>
      h(
        'span',
        {
          title: options && options.title,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginInlineStart:
              options && options.marginInlineStart !== undefined ? options.marginInlineStart : 6,
            padding: '0 5px',
            height: 16,
            borderRadius: 8,
            border: '1px solid var(--dsw-alias-border-l1)',
            background: 'var(--dsw-alias-bg-layer-2)',
            color: options && options.color ? options.color : 'var(--dsw-alias-label-secondary)',
            fontSize: 10,
            lineHeight: '14px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            flex: 'none',
          },
        },
        children,
      )

    const readLabel = (t, key, fallback) => {
      try {
        const value = t(key)
        return value === key ? fallback : value
      } catch {
        return fallback
      }
    }

    const tierName = (tier) =>
      ({ 3: 'High value', 2: 'Fair value', 1: 'Low value', 0: 'No cost data' })[tier] || ''

    function makeBadge(t) {
      return function ModelInsightBadge(props) {
        const model = props && props.model
        if (!model) return null
        // This slot owns the label itself, not just a badge: without the name
        // rendered here the model rows would show only the score.
        const name = model.name || model.displayName || model.id || ''
        const label = h(
          'span',
          {
            key: 'name',
            style: {
              minWidth: 0,
              flex: '0 1 auto',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              fontWeight: 'inherit',
            },
          },
          name,
        )
        const hit = lookup(model.id, model.name)
        if (!hit) return label
        const row = hit.row
        const isTrigger = props.placement === 'trigger'
        // Two readable signals: the official index, then a letter grade for
        // value (quintiles of intelligence-per-dollar across the snapshot), so
        // nobody has to divide intelligence by dollars in their head.
        const grade = row.r || null
        const title = [
          row.n,
          readLabel(t, 'badge.intelligence', 'Intelligence index') + ': ' + row.i,
          readLabel(t, 'badge.cost', 'Cost per task') + ': ' + (row.c === null ? '—' : money(row.c)),
          row.t === null ? null : readLabel(t, 'badge.time', 'Time per task') + ': ' + row.t + ' min',
          row.v === null ? null : readLabel(t, 'badge.value', 'Intelligence per $') + ': ' + row.v,
          grade ? readLabel(t, 'badge.grade', 'Value grade') + ': ' + grade + ' (Pareto layer ' + row.y + ')' : null,
          AA.source + ' · ' + AA.snapshot,
        ]
          .filter(Boolean)
          .join('\n')
        return h(
          'span',
          {
            key: 'row',
            style: {
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              maxWidth: '100%',
              // Fill the menu row so the badge can sit on its right edge; the
              // compact trigger keeps its natural width instead.
              flex: isTrigger ? '0 1 auto' : '1 1 auto',
              width: isTrigger ? 'auto' : '100%',
              gap: 6,
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            },
          },
          label,
          pill(
            [
              h('span', { key: 'iq' }, 'IQ ' + row.i),
              grade ? h('span', { key: 'sep', style: { opacity: 0.45 } }, '·') : null,
              grade
                ? h(
                    'span',
                    {
                      key: 'grade',
                      title: readLabel(t, 'badge.grade', 'Value grade') + ': ' + grade,
                      style: {
                        fontWeight: 700,
                        color: GRADE_COLOR[grade] || 'inherit',
                        letterSpacing: '0.02em',
                      },
                    },
                    grade,
                  )
                : null,
              row.p ? h('span', { key: 'frontier', 'aria-hidden': true, style: { opacity: 0.75 } }, '◆') : null,
            ],
            { title, marginInlineStart: isTrigger ? 4 : 'auto' },
          ),
        )
      }
    }

    function makePanel(t) {
      const ROWS = 12
      return function ModelInsightPanel() {
        const [open, setOpen] = React.useState(false)
        const [mode, setMode] = React.useState('value')
        const sorted = React.useMemo(() => {
          const rows = AA.models.filter((row) => row.c !== null && row.i !== null)
          if (mode === 'iq') return [...rows].sort((a, b) => b.i - a.i)
          if (mode === 'cost') return [...rows].sort((a, b) => a.c - b.c)
          // Pareto layers first: S, then A, then B...; smarter first inside a layer.
          return [...rows].sort((a, b) => (a.y || 99) - (b.y || 99) || b.i - a.i)
        }, [mode])
        const best = React.useMemo(() => AA.models.filter((row) => row.p === 1), [])

        const tab = (key, labelText) =>
          h(
            'button',
            {
              key,
              type: 'button',
              onClick: (event) => {
                event.stopPropagation()
                setMode(key)
              },
              style: {
                border: 'none',
                background: mode === key ? 'var(--dsw-alias-bg-layer-2)' : 'transparent',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 6,
                cursor: 'pointer',
              },
            },
            labelText,
          )

        return h(
          'div',
          { style: { padding: '2px 0 4px' } },
          h(
            'button',
            {
              type: 'button',
              'aria-expanded': open,
              onClick: (event) => {
                event.stopPropagation()
                setOpen(!open)
              },
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                width: '100%',
                border: 'none',
                background: 'transparent',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 12,
                padding: '5px 8px',
                cursor: 'pointer',
                textAlign: 'start',
              },
            },
            h('span', { 'aria-hidden': true }, open ? '▾' : '▸'),
            h('span', null, readLabel(t, 'panel.title', 'AA intelligence vs cost')),
            h('span', { style: { marginInlineStart: 'auto', fontSize: 10, opacity: 0.7 } }, AA.snapshot),
          ),
          open
            ? h(
                'div',
                { style: { padding: '2px 8px 6px' } },
                h(
                  'div',
                  { style: { display: 'flex', gap: 4, marginBottom: 4 } },
                  tab('value', readLabel(t, 'panel.tabValue', 'Value')),
                  tab('iq', readLabel(t, 'panel.tabIq', 'Intelligence')),
                  tab('cost', readLabel(t, 'panel.tabCost', 'Cost')),
                ),
                h(
                  'div',
                  { style: { fontSize: 10, opacity: 0.65, marginBottom: 5, lineHeight: 1.4 } },
                  readLabel(
                    t,
                    'panel.hint',
                    'Intelligence on the left, value score on the right. ◆ marks the Pareto frontier: nothing is both smarter and cheaper.',
                  ),
                ),
                h(
                  'div',
                  {
                    style: {
                      maxHeight: 232,
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    },
                  },
                  sorted.slice(0, ROWS).map((row) =>
                    h(
                      'div',
                      {
                        key: row.s,
                        title: row.n + ' · ' + AA.index,
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 11,
                          padding: '2px 0',
                          color: 'var(--dsw-alias-label-primary)',
                        },
                      },
                      h('span', {
                        'aria-hidden': true,
                        style: {
                          width: 5,
                          height: 5,
                          borderRadius: 3,
                          flex: 'none',
                            background: GRADE_COLOR[row.r] || TIER_COLOR[row.g] || TIER_COLOR[0],
                        },
                      }),
                      h(
                        'span',
                        {
                          style: {
                            flex: 1,
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          },
                        },
                        row.n,
                        row.p ? h('span', { style: { opacity: 0.7 } }, ' ◆') : null,
                      ),
                      h('span', { style: { opacity: 0.75, flex: 'none', fontVariantNumeric: 'tabular-nums' } }, 'IQ ' + row.i),
                      h('span', {
                        style: {
                          flex: 'none',
                          width: 18,
                          textAlign: 'end',
                          fontWeight: 700,
                          color: GRADE_COLOR[row.r] || 'var(--dsw-alias-label-secondary)',
                        },
                        title: readLabel(t, 'badge.grade', 'Value grade'),
                      }, row.r || '—'),
                    ),
                  ),
                ),
                best.length
                  ? h(
                      'div',
                      { style: { marginTop: 6, fontSize: 10, opacity: 0.65, lineHeight: 1.4 } },
                      readLabel(t, 'panel.frontier', 'Frontier picks') +
                        ': ' +
                        best
                          .slice()
                          .sort((a, b) => b.i - a.i)
                          .slice(0, 5)
                          .map((row) => row.n + ' (' + money(row.c) + ')')
                          .join(' · '),
                    )
                  : null,
                h(
                  'div',
                  { style: { marginTop: 5, fontSize: 10, opacity: 0.55 } },
                  AA.index + ' · ' + AA.source,
                ),
              )
            : null,
        )
      }
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const disposeEn = ctx.locale.register('model-insights', 'en', {
          'badge.intelligence': 'Intelligence index',
          'badge.cost': 'Cost per task',
          'badge.time': 'Time per task',
          'badge.value': 'Intelligence per $',
          'badge.grade': 'Value grade (S = Pareto frontier, then A-D)',
          'badge.tier': 'Value tier',
          'panel.title': 'AA intelligence vs cost',
          'panel.tabValue': 'Grade',
          'panel.tabIq': 'Intelligence',
          'panel.tabCost': 'Cost',
          'panel.hint':
            'Grades follow the Pareto layers of the intelligence-vs-cost chart: S is the frontier (nothing both smarter and cheaper), then A, B, C, D as each layer is peeled off.',
          'panel.frontier': 'Frontier picks',
        })
        ctx.effect(() => disposeEn)

        const disposeZh = ctx.locale.register('model-insights', 'zh', {
          'badge.intelligence': '智力指数',
          'badge.cost': '每任务成本',
          'badge.time': '每任务耗时',
          'badge.value': '每美元智力',
          'badge.grade': '性价比等级（S = 帕累托前沿）',
          'badge.tier': '性价比档位',
          'panel.title': 'AA 智力 vs 成本',
          'panel.tabValue': '等级',
          'panel.tabIq': '智力',
          'panel.tabCost': '成本',
          'panel.hint': '等级按帕累托层划分：S 是前沿（没有既更聪明又更便宜的模型），逐层剥离后依次 A、B、C、D。',
          'panel.frontier': '前沿推荐',
        })
        ctx.effect(() => disposeZh)

        const t = ctx.locale.bind('model-insights')
        const badge = makeBadge(t)
        const panel = makePanel(t)

        ctx.effect(() =>
          ctx.slots.inject('conversation.input.model.label', () =>
            ctx.slots.register({ name: 'conversation.input.model.label' }, badge),
          ),
        )

        ctx.effect(() =>
          ctx.slots.inject('conversation.input.model.options', () =>
            ctx.slots.register(
              { name: 'conversation.input.model.options', id: 'model-insights-panel', order: 20 },
              panel,
            ),
          ),
        )
      },
    }
  },
})
