# dsh-model-insights

> 在 DeepSeek Harness 的模型选择器里，直接看到每个模型的 **Artificial Analysis 智力指数** 和 **性价比等级（S/A/B/C/D）**。

模型配多了以后，下拉列表里全是名字，选谁全靠记忆。这个插件把 [Artificial Analysis](https://artificialanalysis.ai/) 公开榜单的两件事搬到每一行：

```
kimi-k3.1-pro              ● IQ 46 · B
mimo-v2.6-flash            ● IQ 27 · S ◆
mimo-v2.6-pro              ● IQ 30 · A
gpt-6-astra                ● IQ 57 · C
```

- **IQ**：AA 官方智力指数（Intelligence Index），代表模型有多强
- **S / A / B / C / D**：性价比等级，把「智力 ÷ 单任务成本」在全榜五等分，S 最划算、D 最贵
- **颜色**：S 绿、A 品牌蓝、B 中性、C 琥珀、D 红，不读字母也能看出档位
- **◆**：帕累托前沿，没有被任何模型「又更聪明又更便宜」地压制
- **悬停**：AA 原始模型名、智力、单任务成本、单任务耗时、每美元智力、快照日期

菜单底部还有一项可展开的 **AA 智力 vs 成本** 面板，能按性价比 / 智力 / 成本三种顺序浏览全榜，并列出前沿推荐。

## 安装

```bash
# 从 GitHub 装
dsh plugin add github:RainbowLion0320/dsh-model-insights

# 或者本地目录装
dsh plugin add file:/path/to/dsh-model-insights
```

桌面版在「设置 → 插件」里填包名或目录安装即可。装完**重启宿主**：客户端模块在宿主启动时加载。

## 等级怎么算的

1. 取快照里所有**有成本数据**的模型（本快照 59 个）
2. 每个算 `智力 ÷ 单任务成本`（AA 的 weighted average cost per Intelligence Index task）
3. 按这个比值排序后五等分：前 20% 是 S，接着 A / B / C，最后 20% 是 D

**注意它排的是性价比，不是强弱。** `IQ 28 · S` 说的是「便宜但不聪明」，`IQ 57 · C` 说的是「很强但很贵」。IQ 和字母一起看，才是 AA 那张 *Intelligence Index vs. Cost per Task* 散点图想表达的东西。

## 数据从哪来

- AA 的 JSON API 需要 API key，这个插件**不碰网络、不要 key**，把抓下来的快照直接内联进 `client.js`
- 默认榜单只列「Current」模型，所以仓库里还有 `data/extra-models.json`，补录榜单外但仍需展示的模型（同样来自 AA 的单模型页）
- 快照日期写在徽标的悬停提示里；**匹配不到的模型只显示名字，不猜分数**。AA 自己没测的模型（页面上标 `N/A`）就是这个结果

### 刷新数据

```bash
node tools/fetch-aa.mjs      # 抓榜单 -> data/leaderboard.json
node tools/enrich.mjs kimi-k3 claude-opus-4-6   # 可选：补录单模型页
node tools/build.mjs         # 派生指标 + 内联 -> data/aa.json, client.js
```

改完 `client.js` 同样要重启 DSH 才会加载新模块。

## 目录结构

```
client.template.js   客户端源码（数据占位符 /*__AA_DATA__*/null）
client.js            构建产物（内联了数据，别手改）
index.js             Host 半，空实现
cordis.patch.yml     bundle patch
data/leaderboard.json  榜单原始快照
data/extra-models.json 补录模型
data/aa.json         合并 + 派生指标后的快照
tools/               抓取与构建脚本
locale/              插件元数据（中/英）
docs/DETAIL.md       插件详情页
```

## 已知限制

- 数据是**快照**，不联网自动更新；AA 出新模型后要重跑上面的脚本
- 名字匹配是归一化后的字符串匹配，模型被本地改名可能掉出匹配
- AA 对同一模型分 `Max / High / Low` 推理档，插件取最有代表性的一档（优先 Default Fallback，其次最高分），所以成本数字和你当前的 reasoning 档位可能不同
- 只覆盖 AA 有评测的模型；小众模型、私有部署模型没有分数

## License

[MIT](LICENSE)。榜单数据版权归 Artificial Analysis 所有，仓库仅保存公开数字的带日期快照。
