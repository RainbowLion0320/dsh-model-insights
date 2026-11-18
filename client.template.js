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


    /** The last model the owner marked as selected; the menu panel reads this. */
    const selection = { row: null, listeners: new Set() }
    const publishSelection = (row) => {
      if (selection.row === row) return
      selection.row = row
      for (const listener of [...selection.listeners]) listener()
    }
    const subscribeSelection = (listener) => {
      selection.listeners.add(listener)
      return () => selection.listeners.delete(listener)
    }

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
        if (props.selected) publishSelection(row)

        // A row that names its effort (e.g. "GPT-6.2 Astra (max)") shows that
        // single point; otherwise the badge shows the whole range.
        const suffix = /\((max|xhigh|high|medium|low)\)/i.exec(name)
        const point = suffix ? row.pts.find((p) => (p.e || '').toLowerCase() === suffix[1].toLowerCase()) : null
        const view = point
          ? { ...row, iq: [point.i, point.i], gr: [point.r, point.r], p: point.y === 1 ? 1 : 0 }
          : row

        const isTrigger = props.placement === 'trigger'
        // Collapsed composer stays clean: the numbers belong to the open menu.
        if (isTrigger) return label
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

    /**
     * The native reasoning menu is owner-rendered with no extension slot, so its
     * rows are decorated in place: every effort row shows that model's AA IQ and
     * Pareto grade. Deliberately defensive — if the markup changes nothing is
     * decorated, and the model-menu panel still carries the same numbers.
     */
    const EFFORT_LABELS = new Set(['default', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'])
    const BADGE_ATTR = 'data-dsh-model-insights'

    const installEffortBadges = () => {
      if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return () => {}
      let frame = 0

      const POS_ATTR = 'data-dsh-model-insights-anchor'
      const strip = () => {
        for (const node of document.querySelectorAll('[' + BADGE_ATTR + ']')) node.remove()
        for (const node of document.querySelectorAll('[' + POS_ATTR + ']')) {
          node.style.position = ''
          node.removeAttribute(POS_ATTR)
        }
      }

      const decorate = () => {
        frame = 0
        strip()
        const row = selection.row
        if (!row) return
        const points = new Map(row.pts.map((p) => [(p.e || 'default').toLowerCase(), p]))
        const menuSelector =
          '[role="menu"], [role="listbox"], [data-radix-popper-content-wrapper], [data-state="open"]'
        const found = document.querySelectorAll(menuSelector)
        if (!found.length) return
        const roots = Array.from(found)
        const norm = (value) =>
          String(value || '')
            .replace(/[\s\u2713\u2714]/g, '')
            .toLowerCase()

        const LABELS = Array.from(EFFORT_LABELS)

        for (const root of roots) {
          // Collect every element whose whole text is one effort label.
          const candidates = new Map()
          for (const node of root.querySelectorAll('*')) {
            const text = node.textContent || ''
            if (!text || text.length > 28) continue
            const label = norm(text)
            const key = LABELS.find((value) => label.startsWith(value) && label.length <= value.length + 4)
            if (key) candidates.set(node, key)
          }

          const decorated = new Set()
          for (const [node, key] of candidates) {
            // Climb to the outermost matching element: that is the menu row.
            let top = node
            while (
              top.parentElement &&
              top.parentElement !== root &&
              candidates.has(top.parentElement)
            ) {
              top = top.parentElement
            }
            if (top === root || decorated.has(top)) continue
            decorated.add(top)
            if (top.querySelector && top.querySelector('[' + BADGE_ATTR + ']')) continue
            const point = points.get(key)
            if (!point) continue
            const badge = document.createElement('span')
            badge.setAttribute(BADGE_ATTR, '')
            badge.textContent = 'IQ ' + round(point.i) + ' · ' + (point.r || '—')
            badge.style.cssText = [
              'margin-inline-start:auto',
              'padding:0 5px',
              'height:16px',
              'display:inline-flex',
              'align-items:center',
              'border-radius:8px',
              'background:var(--dsw-alias-bg-layer-2)',
              'color:var(--dsw-alias-label-secondary)',
              'font-size:10px',
              'line-height:14px',
              'font-weight:600',
              'font-variant-numeric:tabular-nums',
              'white-space:nowrap',
              'flex:none',
              'pointer-events:none',
            ].join(';')
            let rowIsFlex = true
            try {
              rowIsFlex = /flex|grid/.test(window.getComputedStyle(top).display)
            } catch {
              rowIsFlex = true
            }
            if (!rowIsFlex) {
              if (!top.style.position) {
                top.style.position = 'relative'
                top.setAttribute(POS_ATTR, '')
              }
              badge.style.position = 'absolute'
              badge.style.right = '8px'
              badge.style.top = '50%'
              badge.style.transform = 'translateY(-50%)'
            }

            // Keep any trailing check/icon in its place: the badge goes before it.
            const last = top.lastElementChild
            const trailingIcon =
              last && last !== badge && !(last.textContent || '').trim() && last.tagName !== 'BR'
            if (trailingIcon) top.insertBefore(badge, last)
            else top.appendChild(badge)
          }
        }
      }

      const schedule = () => {
        if (frame) return
        frame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(decorate) : setTimeout(decorate, 16)
      }

      const observer = new MutationObserver(schedule)
      observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      schedule()

      return () => {
        observer.disconnect()
        if (frame && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(frame)
        strip()
      }
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const disposeEn = ctx.locale.register('model-insights', 'en', {
          'badge.intelligence': 'Intelligence index',
          'badge.grade': 'Value grade (S = Pareto frontier, then A-D)',
          'panel.title': 'Reasoning grades',
          'panel.tabGrade': 'Grade',
          'panel.tabIq': 'Intelligence',
          'panel.tabCost': 'Cost',
          'panel.hint':
            'Grades are Pareto layers over every reasoning-effort point. A range means the model crosses grades as reasoning effort changes.',
          'panel.empty': 'Pick a model above to see its reasoning grades.',
        })
        ctx.effect(() => disposeEn)

        const disposeZh = ctx.locale.register('model-insights', 'zh', {
          'badge.intelligence': '智力指数',
          'badge.grade': '性价比等级（S = 帕累托前沿）',
          'panel.title': '推理档评分',
          'panel.tabGrade': '等级',
          'panel.tabIq': '智力',
          'panel.tabCost': '成本',
          'panel.hint': '等级按每个推理档的帕累托层计算。显示为区间说明该模型随推理强度变化会跨档。',
          'panel.empty': '先在上面选一个模型，这里显示它的推理档评分。',
        })
        ctx.effect(() => disposeZh)

        const t = ctx.locale.bind('model-insights')
        const badge = makeBadge(t)

        ctx.effect(() => installEffortBadges())

        ctx.effect(() =>
          ctx.slots.inject('conversation.input.model.label', () =>
            ctx.slots.register({ name: 'conversation.input.model.label' }, badge),
          ),
        )
      },
    }
  },
})
