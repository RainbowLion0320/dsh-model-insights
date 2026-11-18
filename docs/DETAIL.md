# Model insights — Artificial Analysis intelligence vs cost, per reasoning effort

Adds the [Artificial Analysis](https://artificialanalysis.ai/) public numbers next to the models you
actually pick from, so a long model list stops being a memory test.

## What you see

- **A badge on every model row** in the composer model picker, right-aligned: the AA intelligence index
  (a range when the model has several reasoning efforts), then a **grade range from S to D**.
- **Grades come from Pareto layers over effort points**, not from price alone: every
  "model × reasoning effort" pair is a point on the intelligence-vs-cost plane. The first nondominated
  front is **S**, the next peel is **A**, then **B**, **C**, and everything from the fifth layer down is
  **D**. A range such as `S–C` means the model crosses grades as you change reasoning effort.
- **`◆`** marks a model with at least one effort point on the frontier.
- **Hovering** lists every effort explicitly: `max · IQ 62 · $4.00/task · S`, and so on.
- A row whose own name carries an effort (`GPT-6.2 Astra (max)`) shows that single point instead of the
  range.
- **Collapsed composer**: the model name stays clean, and the reasoning-effort chip keeps the grade of
  the effort you are on (`Max  IQ 33 · C`). The model's IQ range only appears once the menu is open.
- **Grades inside the native reasoning menu**: opening the model menu's reasoning submenu shows each
  effort's `IQ · grade` on the right of the row (`Max  IQ 51 · B`). The menu is owner-rendered with no
  extension slot, so the rows are decorated in place; if a future DSH release changes that markup the
  decoration silently stops instead of breaking the menu.

## Data and coverage

The scores ship as a **bundled snapshot** captured from AA's model pages on 2026-11-18.

- AA lists 700+ models but **only evaluates a subset** with its intelligence index; the rest show `N/A`.
  This snapshot crawls all 530 model pages and keeps the **68 models / 136 effort points** that are
  actually scored.
- Models AA does not score get **no badge** — never a guessed number.
- AA's JSON API needs a key; this bundle reads no network at runtime and sends nothing anywhere.
- Models the snapshot cannot match by name/id show only their name; a local rename can drop a model out.

## Grading rule

1. Each scored effort point is `(cost per task, intelligence index)`.
2. Layer 1 = points no other point beats on both axes → **S**.
3. Remove that layer and repeat → **A**, **B**, **C**; layer 5 and beyond collapse into **D**.
4. Points without a cost figure are not graded.

`node tools/check.mjs` asserts the definition: every S point must be nondominated and every dominated
point must grade below S.

## Refreshing

```bash
node tools/fetch-aa-full.mjs   # crawl AA model pages -> data/aa-points.json
node tools/build.mjs           # layers + ranges -> data/aa.json, client.js
node tools/check.mjs           # verify the grading definition
```

Rebuilding `client.js` needs a DSH restart to load the new client module.

## Uninstall

Removing the bundle removes the badges and the panel; nothing else is stored.
