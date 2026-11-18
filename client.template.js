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

    const byKey = new Map()
    for (const row of AA.models) {
      const key = compactOf(row.n)
      if (key && !byKey.has(key)) byKey.set(key, row)
    }

    const byTokens = AA.models.map((row) => {
      const tokens = tokensOf(row.n)
      return { row, tokens, set: new Set(tokens) }
    })

    /**
     * Exact compact-name match first, then a guarded fuzzy pass: the query's
     * version numbers must all appear in the AA name, and only date-code-like
     * extras (>= 3 digits) are tolerated.
     */
    const lookup = (id, name) => {
      for (const key of [compactOf(name), compactOf(id)]) {
        if (key && byKey.has(key)) return byKey.get(key)
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
      return bestScore >= 0.8 ? best : null
    }

    const money = (value) => {
      if (value === null || value === undefined) return '—'
      if (value === 0) return '$0'
      return value < 0.01 ? '<$0.01' : '$' + value.toFixed(2)
    }

    /** Grade letters come from Pareto layers of the effort points. */
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

    const round = (value) => Math.round(value)
    const iqText = (row) =>
      row.iq[0] === row.iq[1] ? String(round(row.iq[1])) : `${round(row.iq[0])}–${round(row.iq[1])}`
    const gradeText = (row) => (row.gr[0] === row.gr[1] ? row.gr[0] : `${row.gr[0]}–${row.gr[1]}`)

    const effortLine = (point) =>
      [
        point.e || '—',
        'IQ ' + round(point.i),
        point.c === null || point.c === undefined ? null : money(point.c) + '/task',
        point.r || null,
      ]
        .filter(Boolean)
        .join(' · ')

    function makeBadge(t) {
      return function ModelInsightBadge(props) {
        const model = props && props.model
        if (!model) return null
        // This slot owns the label itself: the model name has to render here.
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
        const row = lookup(model.id, model.name)
        if (!row) return label

        // A row that names its effort (e.g. "GPT-6.2 Astra (max)") shows that
        // single point; otherwise the badge shows the whole range.
        const suffix = /\((max|xhigh|high|medium|low)\)/i.exec(name)
        const point = suffix ? row.pts.find((p) => (p.e || '').toLowerCase() === suffix[1].toLowerCase()) : null
        const view = point
          ? { ...row, iq: [point.i, point.i], gr: [point.r, point.r], p: point.y === 1 ? 1 : 0 }
          : row

        const isTrigger = props.placement === 'trigger'
        const title = [
          row.n,
          readLabel(t, 'badge.intelligence', 'Intelligence index') + ': ' + iqText(view),
          readLabel(t, 'badge.grade', 'Value grade') + ': ' + gradeText(view),
          '',
          ...row.pts.map((p) => effortLine(p)),
          '',
          AA.source + ' · ' + AA.snapshot,
        ].join('\n')

        return h(
          'span',
          {
            key: 'row',
            style: {
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              maxWidth: '100%',
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
              h('span', { key: 'iq' }, 'IQ ' + iqText(view)),
              h('span', { key: 'sep', style: { opacity: 0.45 } }, '·'),
              h(
                'span',
                {
                  key: 'grade',
                  title: readLabel(t, 'badge.grade', 'Value grade') + ': ' + gradeText(view),
                  style: {
                    fontWeight: 700,
                    color: GRADE_COLOR[view.gr[0]] || 'inherit',
                    letterSpacing: '0.02em',
                  },
                },
                gradeText(view),
              ),
              view.p
                ? h('span', { key: 'frontier', 'aria-hidden': true, style: { opacity: 0.75 } }, '◆')
                : null,
            ],
            { title, marginInlineStart: isTrigger ? 4 : 'auto' },
          ),
        )
      }
    }

    function makePanel(t) {
      const ROWS = 12
      const order = { S: 0, A: 1, B: 2, C: 3, D: 4 }
      return function ModelInsightPanel() {
        const [open, setOpen] = React.useState(false)
        const [mode, setMode] = React.useState('grade')
        const sorted = React.useMemo(() => {
          const rows = AA.models.filter((row) => row.pts && row.pts.length)
          if (mode === 'iq') return [...rows].sort((a, b) => b.iq[1] - a.iq[1])
          if (mode === 'cost') {
            const cheapest = (row) => Math.min(...row.pts.map((p) => (p.c === null ? Infinity : p.c)))
            return [...rows].sort((a, b) => cheapest(a) - cheapest(b))
          }
          return [...rows].sort((a, b) => order[a.gr[0]] - order[b.gr[0]] || b.iq[1] - a.iq[1])
        }, [mode])
        const frontier = React.useMemo(() => AA.models.filter((row) => row.p === 1), [])

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
            h(
              'span',
              { style: { marginInlineStart: 'auto', fontSize: 10, opacity: 0.7 } },
              `${AA.models.length} models · ${AA.snapshot}`,
            ),
          ),
          open
            ? h(
                'div',
                { style: { padding: '2px 8px 6px' } },
                h(
                  'div',
                  { style: { display: 'flex', gap: 4, marginBottom: 4 } },
                  tab('grade', readLabel(t, 'panel.tabGrade', 'Grade')),
                  tab('iq', readLabel(t, 'panel.tabIq', 'Intelligence')),
                  tab('cost', readLabel(t, 'panel.tabCost', 'Cost')),
                ),
                h(
                  'div',
                  { style: { fontSize: 10, opacity: 0.65, marginBottom: 5, lineHeight: 1.4 } },
                  readLabel(
                    t,
                    'panel.hint',
                    'Grades are Pareto layers over every reasoning-effort point. A range means the model crosses grades as reasoning effort changes.',
                  ),
                ),
                h(
                  'div',
                  {
                    style: {
                      maxHeight: 240,
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
                        title: [row.n, ...row.pts.map(effortLine)].join('\n'),
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 11,
                          padding: '2px 0',
                          color: 'var(--dsw-alias-label-primary)',
                        },
                      },
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
                      h(
                        'span',
                        { style: { opacity: 0.75, flex: 'none', fontVariantNumeric: 'tabular-nums' } },
                        'IQ ' + iqText(row),
                      ),
                      h(
                        'span',
                        {
                          style: {
                            flex: 'none',
                            width: 34,
                            textAlign: 'end',
                            fontWeight: 700,
                            color: GRADE_COLOR[row.gr[0]] || 'var(--dsw-alias-label-secondary)',
                          },
                        },
                        gradeText(row),
                      ),
                    ),
                  ),
                ),
                frontier.length
                  ? h(
                      'div',
                      { style: { marginTop: 6, fontSize: 10, opacity: 0.65, lineHeight: 1.4 } },
                      readLabel(t, 'panel.frontier', 'Frontier picks') +
                        ': ' +
                        frontier
                          .slice()
                          .sort((a, b) => b.iq[1] - a.iq[1])
                          .slice(0, 5)
                          .map((row) => row.n + ' (' + iqText(row) + ')')
                          .join(' · '),
                    )
                  : null,
                h(
                  'div',
                  { style: { marginTop: 5, fontSize: 10, opacity: 0.55 } },
                  `${AA.points} effort points · ${AA.source}`,
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
          'badge.grade': 'Value grade (S = Pareto frontier, then A-D)',
          'panel.title': 'AA intelligence vs cost',
          'panel.tabGrade': 'Grade',
          'panel.tabIq': 'Intelligence',
          'panel.tabCost': 'Cost',
          'panel.hint':
            'Grades are Pareto layers over every reasoning-effort point. A range means the model crosses grades as reasoning effort changes.',
          'panel.frontier': 'Frontier picks',
        })
        ctx.effect(() => disposeEn)

        const disposeZh = ctx.locale.register('model-insights', 'zh', {
          'badge.intelligence': '智力指数',
          'badge.grade': '性价比等级（S = 帕累托前沿）',
          'panel.title': 'AA 智力 vs 成本',
          'panel.tabGrade': '等级',
          'panel.tabIq': '智力',
          'panel.tabCost': '成本',
          'panel.hint': '等级按每个推理档的帕累托层计算。显示为区间说明该模型随推理强度变化会跨档。',
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
