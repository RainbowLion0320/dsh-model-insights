window.__ModuleLoader__.load({
  id: 'dsh-model-insights',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /** Artificial Analysis snapshot, embedded at build time. */
    const AA = {"source":"https://artificialanalysis.ai/leaderboards/models","index":"Intelligence Index v5.0.1","snapshot":"2026-11-18","builtAt":"2026-11-18T02:24:19.821Z","count":67,"models":[{"s":"claude-fable-5-2","n":"Claude Fable 5.2 Max, Default Fallback","i":65,"c":26.54,"t":40.7,"l":214.95,"w":1000000,"v":2.45,"g":1,"r":"S","y":1,"p":1},{"s":"gpt-6-2-astra","n":"GPT-6.2 Astra Max","i":62,"c":4,"t":10.7,"l":147.65,"w":1000000,"v":15.5,"g":2,"r":"S","y":1,"p":1},{"s":"gemini-4-carbon","n":"Gemini 4 Carbon High","i":60,"c":5.48,"t":33.2,"l":73.37,"w":1000000,"v":10.95,"g":1,"r":"A","y":2,"p":0},{"s":"claude-opus-5-5","n":"Claude Opus 5.5 Max, Default Fallback","i":59,"c":10.04,"t":24.5,"l":355.12,"w":1000000,"v":5.88,"g":1,"r":"B","y":3,"p":0},{"s":"gpt-6-2-sol","n":"GPT-6.2 Sol Max","i":57,"c":1.01,"t":7.9,"l":61.56,"w":1000000,"v":56.44,"g":3,"r":"S","y":1,"p":1},{"s":"claude-sonnet-5-5","n":"Claude Sonnet 5.5 Max, Default Fallback","i":55,"c":10.02,"t":32.3,"l":290.29,"w":1000000,"v":5.49,"g":1,"r":"C","y":4,"p":0},{"s":"gemini-4-hydrogen","n":"Gemini 4 Hydrogen Xhigh","i":54,"c":3.16,"t":14.8,"l":42.69,"w":1000000,"v":17.09,"g":2,"r":"B","y":3,"p":0},{"s":"gpt-6-1-terra","n":"GPT-6.1 Terra Max","i":51,"c":0.96,"t":14.2,"l":144.41,"w":1000000,"v":53.13,"g":2,"r":"S","y":1,"p":1},{"s":"gemini-4-argon","n":"Gemini 4 Argon High","i":50,"c":4.97,"t":29.1,"l":47,"w":1000000,"v":10.06,"g":1,"r":"C","y":4,"p":0},{"s":"muse-wonder-full","n":"Muse Wonder Full Max","i":50,"c":null,"t":null,"l":null,"w":1000000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"kimi-k3-1-pro","n":"Kimi K3.1 Pro","i":46,"c":3.68,"t":38.3,"l":155.21,"w":1000000,"v":12.5,"g":1,"r":"C","y":4,"p":0},{"s":"muse-wonder","n":"Muse Wonder Max","i":44,"c":6.95,"t":13.4,"l":19.58,"w":1000000,"v":6.33,"g":1,"r":"D","y":5,"p":0},{"s":"qwen4-max","n":"Qwen4 Max","i":43,"c":3.27,"t":33.1,"l":143.51,"w":984000,"v":13.15,"g":2,"r":"C","y":4,"p":0},{"s":"claude-haiku-5-5","n":"Claude Haiku 5.5 Max","i":36,"c":0.41,"t":14.7,"l":190.13,"w":1000000,"v":87.8,"g":3,"r":"A","y":2,"p":0},{"s":"muse-ember","n":"Muse Ember Max","i":36,"c":0.14,"t":3.1,"l":4.85,"w":1000000,"v":257.14,"g":3,"r":"S","y":1,"p":1},{"s":"grok-4-7","n":"Grok 4.7 Xhigh","i":35,"c":7.77,"t":24.2,"l":47.29,"w":500000,"v":4.5,"g":1,"r":"D","y":6,"p":0},{"s":"tencent-hy4","n":"Tencent Hy4","i":35,"c":1.03,"t":13.6,"l":111.73,"w":1000000,"v":33.98,"g":2,"r":"B","y":3,"p":0},{"s":"deepseek-v4-1-flash-1017","n":"DeepSeek V4.1 Flash 1017 Max","i":33,"c":0.6,"t":13,"l":37.93,"w":1000000,"v":55,"g":2,"r":"B","y":3,"p":0},{"s":"glm-5-3","n":"GLM-5.3 Max","i":32,"c":5.01,"t":21.7,"l":69.29,"w":1000000,"v":6.39,"g":1,"r":"D","y":6,"p":0},{"s":"inkling-2-small","n":"Inkling 2 Small","i":31,"c":1.18,"t":20.9,"l":39.18,"w":1000000,"v":26.27,"g":2,"r":"C","y":4,"p":0},{"s":"mimo-v2-6-pro","n":"MiMo-V2.6-Pro","i":30,"c":0.26,"t":34.8,"l":25.73,"w":1000000,"v":115.38,"g":3,"r":"A","y":2,"p":0},{"s":"ling-3-1-flash","n":"Ling 3.1 Flash 1019","i":30,"c":3.19,"t":null,"l":null,"w":1000000,"v":9.4,"g":1,"r":"D","y":5,"p":0},{"s":"minimax-m3-1-flash","n":"MiniMax-M3.1-Flash","i":29,"c":0.49,"t":17.6,"l":48.55,"w":1000000,"v":59.18,"g":3,"r":"B","y":3,"p":0},{"s":"qwen3-8-flash-next","n":"Qwen3.8-Flash-Next","i":29,"c":0.57,"t":29.4,"l":62.69,"w":256000,"v":50.88,"g":2,"r":"C","y":4,"p":0},{"s":"step-5-preview","n":"Step 5 Preview","i":29,"c":2.35,"t":13.2,"l":21.77,"w":1000000,"v":12.34,"g":1,"r":"D","y":5,"p":0},{"s":"gpt-6-luna","n":"GPT-6 Luna Max","i":28,"c":0.15,"t":12.1,"l":64.04,"w":1000000,"v":186.67,"g":3,"r":"A","y":2,"p":0},{"s":"glm-5-3-flash","n":"GLM-5.3-Flash","i":28,"c":0.58,"t":38.3,"l":84.58,"w":1000000,"v":48.28,"g":2,"r":"D","y":5,"p":0},{"s":"mimo-v2-6-flash","n":"MiMo-V2.6-Flash","i":27,"c":0.13,"t":54.7,"l":33.03,"w":1000000,"v":207.69,"g":3,"r":"S","y":1,"p":1},{"s":"mistral-large-4","n":"Mistral Large 4 High","i":26,"c":2.06,"t":18.8,"l":64.46,"w":1000000,"v":12.62,"g":1,"r":"D","y":6,"p":0},{"s":"muse-spark-open","n":"Muse Spark Open Xhigh","i":25,"c":2.02,"t":5.8,"l":10.44,"w":1000000,"v":12.38,"g":1,"r":"D","y":6,"p":0},{"s":"agnes-2-5-pro-theta","n":"Agnes 2.5 Pro Theta","i":24,"c":0.57,"t":22.9,"l":8.1,"w":1000000,"v":42.11,"g":2,"r":"D","y":5,"p":0},{"s":"deepseek-v4-pro","n":"DeepSeek V4 Pro 0813 Max","i":23,"c":1.77,"t":16.9,"l":54.34,"w":1000000,"v":12.99,"g":2,"r":"D","y":6,"p":0},{"s":"nanbeige4-3-33b","n":"Nanbeige4.3-33B","i":20,"c":null,"t":null,"l":null,"w":524000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"qwen3-8-27b","n":"Qwen3.8 27B Xhigh","i":20,"c":3.53,"t":38.1,"l":121.79,"w":256000,"v":5.67,"g":1,"r":"D","y":7,"p":0},{"s":"jt-4-1-flash-236b-a21b","n":"JT-4.1 Flash 236B A21B","i":19,"c":null,"t":null,"l":null,"w":262000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"minimax-m3","n":"MiniMax-M3","i":19,"c":1.29,"t":14.1,"l":69.98,"w":1000000,"v":14.73,"g":2,"r":"D","y":6,"p":0},{"s":"k2-horizon-375b-a23b","n":"K2 Horizon 375B A23B","i":18,"c":0,"t":4.8,"l":19.59,"w":524000,"v":null,"g":0,"r":"S","y":1,"p":1},{"s":"reflection-beam","n":"Beam 1.0","i":18,"c":0.28,"t":2.2,"l":7.3,"w":1000000,"v":64.29,"g":3,"r":"B","y":3,"p":0},{"s":"solar-pro-4","n":"Solar Pro 4","i":14,"c":0.96,"t":72,"l":31.47,"w":512000,"v":14.58,"g":2,"r":"D","y":7,"p":0},{"s":"apodex-1-1","n":"Apodex 1.1","i":14,"c":0.76,"t":null,"l":null,"w":256000,"v":18.42,"g":2,"r":"D","y":6,"p":0},{"s":"nemotron-3-5-super-vl","n":"Nemotron 3.5 Super VL","i":14,"c":0.48,"t":5.3,"l":13.69,"w":1000000,"v":29.17,"g":2,"r":"C","y":4,"p":0},{"s":"inkling","n":"Inkling Xhigh","i":12,"c":1.35,"t":8.1,"l":14.63,"w":1000000,"v":8.89,"g":1,"r":"D","y":8,"p":0},{"s":"nemotron-3-ultra-550b-a55b","n":"Nemotron 3 Ultra 550B A55B Reasoning","i":12,"c":2.21,"t":4.4,"l":3.67,"w":262000,"v":5.43,"g":1,"r":"D","y":9,"p":0},{"s":"gemini-3-5-flash-lite","n":"Gemini 3.5 Flash-Lite","i":12,"c":0.69,"t":1.5,"l":4.82,"w":1000000,"v":17.39,"g":2,"r":"D","y":6,"p":0},{"s":"a-x-k2","n":"A.X-K2","i":9,"c":null,"t":null,"l":null,"w":262000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"k-exaone-2-0","n":"K-EXAONE 2.0","i":8,"c":null,"t":null,"l":null,"w":262000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"muse-glimmer","n":"Muse Glimmer High","i":6,"c":0.18,"t":4.7,"l":19.29,"w":131000,"v":33.33,"g":2,"r":"C","y":4,"p":0},{"s":"command-a-plus","n":"Command A+","i":6,"c":0,"t":3.6,"l":29.84,"w":192000,"v":null,"g":0,"r":"A","y":2,"p":0},{"s":"lfm3-1-7b","n":"LFM3-1.7B","i":6,"c":0.17,"t":null,"l":null,"w":262000,"v":35.29,"g":2,"r":"B","y":3,"p":0},{"s":"nemotron-3-5-lightning","n":"Nemotron 3.5 Lightning","i":6,"c":0.31,"t":3.9,"l":13.95,"w":1000000,"v":19.35,"g":2,"r":"D","y":5,"p":0},{"s":"granite-4-2-8b","n":"Granite 4.2 8B","i":5,"c":0.0405,"t":11,"l":46.58,"w":131000,"v":123.46,"g":3,"r":"C","y":4,"p":0},{"s":"gemma-4-e4b","n":"Gemma 4 E4B Reasoning","i":5,"c":0.0083,"t":4.1,"l":40.61,"w":128000,"v":602.41,"g":3,"r":"B","y":3,"p":0},{"s":"granite-4-2-3b","n":"Granite 4.2 3B","i":5,"c":null,"t":null,"l":null,"w":131000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"mistral-medium-3-5","n":"Mistral Medium 3.5","i":5,"c":1.04,"t":4.5,"l":25.19,"w":256000,"v":4.81,"g":1,"r":"D","y":8,"p":0},{"s":"gemma-4-31b","n":"Gemma 4 31B Reasoning","i":4,"c":null,"t":null,"l":78.99,"w":256000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"mistral-small-4","n":"Mistral Small 4 Reasoning","i":4,"c":0.0399,"t":1.7,"l":14.37,"w":256000,"v":100.25,"g":3,"r":"C","y":4,"p":0},{"s":"gpt-oss-120b","n":"gpt-oss-120b High","i":4,"c":0.35,"t":6.9,"l":12.53,"w":131000,"v":11.43,"g":1,"r":"D","y":6,"p":0},{"s":"north-mini-code","n":"North Mini Code","i":3,"c":0,"t":2.9,"l":4.76,"w":256000,"v":null,"g":0,"r":"B","y":3,"p":0},{"s":"nvidia-nemotron-3-nano-4b","n":"NVIDIA Nemotron 3 Nano 4B","i":2,"c":null,"t":null,"l":null,"w":262000,"v":null,"g":0,"r":null,"y":null,"p":0},{"s":"lfm3-vl-2b","n":"LFM3-VL-2B","i":2,"c":0.12,"t":null,"l":null,"w":128000,"v":16.67,"g":2,"r":"D","y":5,"p":0},{"s":"gpt-6-astra","n":"GPT-6 Astra","i":57,"c":6.24,"t":19.9,"l":null,"w":null,"v":9.13,"g":1,"r":"B","y":3,"p":0},{"s":"gpt-6-1-sol","n":"GPT-6.1 Sol","i":55,"c":1.27,"t":23.3,"l":null,"w":null,"v":43.31,"g":2,"r":"A","y":2,"p":0},{"s":"gpt-6-sol","n":"GPT-6 Sol","i":44,"c":2.47,"t":7.5,"l":null,"w":null,"v":17.81,"g":2,"r":"B","y":3,"p":0},{"s":"claude-opus-5","n":"Claude Opus 5","i":44,"c":11.82,"t":24.6,"l":null,"w":null,"v":3.72,"g":1,"r":"D","y":6,"p":0},{"s":"gpt-5-6-terra","n":"GPT-5.6 Terra","i":32,"c":3.73,"t":12.3,"l":null,"w":null,"v":8.58,"g":1,"r":"D","y":5,"p":0},{"s":"gemini-3-8-flash","n":"Gemini 3.8 Flash","i":31,"c":7.77,"t":14.2,"l":null,"w":null,"v":3.99,"g":1,"r":"D","y":7,"p":0},{"s":"gpt-5-6-luna","n":"GPT-5.6 Luna","i":24,"c":0.33,"t":9.8,"l":null,"w":null,"v":72.73,"g":3,"r":"B","y":3,"p":0}]}

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
