# Model insights — Artificial Analysis intelligence vs cost

Adds the [Artificial Analysis](https://artificialanalysis.ai/) public leaderboard next to the models
you actually pick from, so a long model list stops being a memory test.

## What you see

- **A badge on every model row** in the composer model picker, right-aligned: the AA intelligence
  index, then a **value grade from S to D**.
- The grade comes from the **Pareto layers** of the intelligence-vs-cost chart, not from raw price:
  S is the first frontier (no model is both smarter and cheaper), and each further peel down the
  remaining models is A, B, C, then D. A cheap model only earns S if nothing smarter is also cheaper;
  a model that another model beats on both axes never scores S.
- The grade letter is coloured: S green, A brand blue, B neutral, C amber, D red — the tier is legible
  without reading the letter.
- Models AA has not priced (no cost per task) carry no grade and show only their name.
- `node tools/check.mjs` asserts the property: every S model is Pareto-optimal, every dominated model
  grades below S.
- Note what the grade ranks: **the trade-off**, not raw capability. Read the `IQ` number next to it for
  capability, and the pair together for the decision.
- **`◆`** marks a model on the Pareto frontier: no other model is both smarter and cheaper.
- **A panel inside the model menu** — open *AA intelligence vs cost* to sort the whole leaderboard by
  grade, intelligence or cost, with frontier picks listed at the bottom.

Hovering a badge shows the source row: full AA model name, intelligence, cost per task, time per task,
intelligence per dollar, the Pareto layer behind the letter, and the snapshot date.

## Data and its limits

The scores ship as a **bundled snapshot** of `artificialanalysis.ai/leaderboards/models`, captured
2026-11-18 (Artificial Analysis Intelligence Index v5.0.1). Cost per task is AA's weighted average
USD cost across the index tasks, not an estimate of your own bill.

- Models the snapshot cannot match show **no badge** rather than a guess. Matching is name/id based,
  so a local rename of a model can drop it out.
- The snapshot does not update itself. Rebuild `client.js` from a fresh leaderboard capture to
  refresh it (see `data/aa.json`, which the build inlines).
- AA publishes reasoning variants separately (`Max`, `High`, `Low`). A model row maps to the most
  representative variant available — prefer *Default Fallback*, then the highest score — so the cost
  figure can differ from what your current reasoning setting would spend.
- AA's API now requires a key; this bundle reads no network at runtime and sends nothing anywhere.

## Uninstall

Removing the bundle removes both the badges and the panel; nothing else is stored.
