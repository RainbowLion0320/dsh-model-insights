# dsh-model-insights

> 在 DeepSeek Harness 的模型选择器里，直接看到每个模型的 **Artificial Analysis 智力指数** 与 **帕累托性价比等级（S/A/B/C/D）**，并且按**推理强度**分别计价、分别评级。

模型配多了，下拉列表里全是名字，选谁全靠记忆。这个插件把 [Artificial Analysis](https://artificialanalysis.ai/) 的公开数据搬进每一行：

```
kimi-k3.1-pro        ▮▮▯▯▯  IQ 46        · B
gpt-6.2-astra        ▮▮▯▯▯  IQ 46–62     · S–B ◆
claude-opus-5-5      ▮▮▮▮▮  IQ 35–59     · B–D ◆
```

模型行只放电量格、不写价格数字；刻度是**全榜成本五分位**（每格约 20% 的价位），格子颜色表示贵贱：**绿（便宜）→ 琥珀（中等）→ 红（贵）**。推理档菜单和收起状态里的价格数字也用同一套颜色。

- **IQ 区间**：同一模型在 `low → max` 各推理档的智力指数范围；只有一个档位时显示单值
- **等级区间**：S/A/B/C/D，按**每个推理档的点**在「智力 vs 单任务成本」平面上的帕累托层计算；跨档就显示成 `S–B`
- **◆** 帕累托前沿：该模型至少有一个推理档，没有任何模型能同时更聪明又更便宜
- **悬停**：逐档明细（`max · IQ 62 · $4.00/task · S`），以及数据来源与快照日期
- 如果某一行模型名自带档位（如 `GPT-6.2 Astra (max)`），该行直接显示这一档的精确分数与等级

**推理档位直接带分数**：展开模型菜单里的「推理等级」子菜单时，每个档位（Default / Low / Medium / High / Xhigh / Max）右侧会显示该模型在这一档的 `IQ · 等级`：

```
Default   ▮▯▯▯▯ $0.43 · IQ 19 D
Low       ▮▮▯▯▯ $0.42 · IQ 19 D
Medium    ▮▮▯▯▯ $0.53 · IQ 24 D
High      ▮▮▯▯▯ $0.46 · IQ 29 D
Max       ▮▮▮▯▯ $0.60 · IQ 33 C
```

左边五格是成本刻度（像手机电量）：按**全榜成本五分位**划分，每格大约覆盖 20% 的价位（当前分界约为 $0.25 / $0.69 / $2.06 / $4.32），所以中间价位不会被挤成一格；数字是 AA 的单任务成本。颜色：1–2 格绿、3 格琥珀、4–5 格红。

**收起状态**也在推理档芯片上带成本与评分，模型名本身仍不带区间：

```
deepseek-v4.1-flash   Max ▮▮▮▯▯ $0.60 · IQ 33 C
```

菜单展开后才有模型区间（`IQ 19–33 · C–D`）和推理档子菜单的逐档角标。

> 「推理等级」子菜单由 DSH 自己渲染、没有开放扩展槽位，所以插件是在菜单渲染后原地给它加角标（MutationObserver + 精确文本匹配）。DSH 升级如果改了这段标记结构，角标会静默失效（不会崩），届时需要跟着适配。

## 安装

```bash
dsh plugin add github:RainbowLion0320/dsh-model-insights
# 或本地目录
dsh plugin add file:/path/to/dsh-model-insights
```

装完**重启宿主**（客户端模块在宿主启动时加载）。

## 评级规则

1. 把 AA 每一个「模型 × 推理档」当成平面上的一个点：X = 单任务成本，Y = 智力指数
2. **第一层帕累托前沿** = S：不存在任何点比它「又更聪明、又更便宜」
3. 剥掉 S 层后重复：第二层 = A，第三层 = B，第四层 = C，第五层及以后统一记 **D**
4. 没有成本数据的点不参与评级

所以 S 不等于「最便宜」，也不等于「最强」，而是**同等成本里最聪明、同等智力里最便宜**的那些点 —— 与 AA 页面上那条 Intelligence Index vs. Cost per Task 的帕累托线一致。

`node tools/check.mjs` 会验证：每个 S 点都不可被支配，每个被支配的点都不许是 S，模型的区间等于其各档的最大/最小等级。

## 数据覆盖（重要，别指望它认识所有模型）

- AA 站点声称收录 700+ 模型，但**其中只有一部分被 v5 智力指数评测**；大量模型页显示 `N/A`
- 本仓库抓取了 AA sitemap 里全部 **530 个模型页**，最终得到 **68 个有评分模型 / 136 个推理档点**（快照日期写在插件里）
- 没被 AA 评分的模型（`claude-opus-4-6`、`deepseek-v4-flash`、`gpt-5.4` 等）在列表里**只显示名字，不给等级** —— 不猜、不插值
- AA 的 JSON API 需要 key；本插件运行时不联网、不要 key，全部数据在构建期抓取并内联

## 刷新数据

```bash
node tools/fetch-aa-full.mjs   # 爬 530 个模型页 -> data/aa-points.json
node tools/build.mjs           # 帕累托分层 + 区间 -> data/aa.json, client.js
node tools/check.mjs           # 校验等级定义
```

改完 `client.js` 要重启 DSH 才会加载新模块。

## 目录结构

```
client.template.js      客户端源码（数据占位符 /*__AA_DATA__*/null）
client.js               构建产物（已内联数据，别手改）
index.js                Host 半，空实现
cordis.patch.yml        bundle patch
data/aa-points.json     每个「模型 × 推理档」的原始点
data/aa.json            聚合后的模型区间与等级
tools/                  抓取、构建、校验脚本
locale/                 插件元数据（中/英）
docs/DETAIL.md          插件详情页
```

## 已知限制

- 数据是**快照**，不自动更新
- DSH 的模型标签槽位只给到模型、不给当前选中的推理档，所以徽标显示区间；具体档位的评级在悬停明细里
- 名字匹配是归一化字符串匹配，本地改名可能掉出匹配
- 榜单里同一模型的不同 provider 变体可能合并或拆分，成本取 AA 的加权单任务成本

## License

[MIT](LICENSE)。榜单数据版权归 Artificial Analysis 所有，仓库仅保存公开数字的带日期快照。
