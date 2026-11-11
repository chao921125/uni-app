# CCNET 小程序 → 热门 AI 助手小程序 改造方案

> 生成时间：2026-09-25
> 项目：/Users/huangchao/Work/GitHub/uni-app（uni-app + Vue3 + uview-plus，仅支持微信小程序）

---

## 一、全网调研：当前头部 AI 小程序盘点（2026）

### 1.1 第一梯队（MAU > 500 万）

| 产品 | 机构 | 核心卖点 | 对本项目的可借鉴点 |
|---|---|---|---|
| DeepSeek 小程序 | 深度求索 | 硬核推理、代码/数学，R1 深度思考模式 | 「深度思考」开关、极简对话界面、免费策略 |
| 腾讯元宝 | 腾讯 | 微信生态原生、混元 + DeepSeek 双模型、文件解析 | 微信登录零门槛、模型切换、读文件（微信公众号文章/PDF） |
| Kimi 智能助手 | 月之暗面 | 超长上下文、文档/合同解读 | 文件上传解读、长文本摘要场景化引导 |
| 讯飞星火 | 科大讯飞 | 语音强、多模态 | 语音输入转写 |

### 1.2 第二梯队（MAU 100~500 万，增速 > 80%/季）

- **豆包**：字节的 AI 全家桶，语音+绘图+视频，文案接地气
- **通义千问 / 千问**：多模态全能，API 价格亲民
- **文心一言**、**可灵**（视频生成）

### 1.3 长尾玩法（垂直场景，验证过的增长点）

- **AI 绘画岛**（工具+社区）：图像生成 + 作品展示/点赞/打赏 → 单次使用 3 分钟拉长到日均 22 分钟，留存 68%
- **法律文书助手 / 论文润色器 / 小红书文案生成器**：精准垂直场景站稳脚跟
- **微信 AI 小微**：群聊总结、跨小程序调度（智能体入口）

### 1.4 头部产品的共性能力清单（改造对标项）

1. **流式输出（打字机效果）**——无一例外，全部逐字输出
2. **免注册即用**——微信授权登录，首屏 < 1.2s
3. **深度思考模式**——普通/推理双模式切换
4. **多模型切换**——至少 2 个模型可选
5. **历史会话管理**——列表、重命名、删除、继续对话
6. **多模态输入**——拍照识图、文件解读（PDF/Word）、语音
7. **智能体/应用广场**——预设角色（写作、编程、学习…）
8. **AI 绘画**（图生图、文生图、风格迁移）
9. **额度/会员体系**——免费额度 + 付费充值（订阅或按量）
10. **内容合规**——输入输出双向安全检测、AI 生成内容标识（监管要求）

---

## 二、现状分析与差距

### 2.1 项目现状

- **架构**：uni-app + Vue3 `<script setup>` + uview-plus，自定义 TabBar（首页 / AI / 课程 / 我）
- **AI Tab（components/tab-ai.vue）**：纯前端 mock——`aiResponses` 字典 + `setTimeout` 800ms 假回复，无后端、无流式
- **首页**：教育课程/商品展示（静态数据）
- **我的**：AI 币余额（写死 1280）、静态菜单
- **API 层（api/）**：只有骨架，无请求封装、无 AI 接口
- **登录**：已有 pages-auth/login 分包 + uniIdRouter

### 2.2 核心差距（对照 1.4 清单）

| 能力 | 现状 | 差距等级 |
|---|---|---|
| 流式对话 | 无（假回复） | 🔴 P0 |
| 真实大模型接入 | 无 | 🔴 P0 |
| 历史会话 | 无 | 🔴 P0 |
| 深度思考/模型切换 | 无 | 🟡 P1 |
| 智能体广场 | 无 | 🟡 P1 |
| 多模态（识图/文件/语音） | 无 | 🟡 P1 |
| AI 绘画 | 无 | 🟢 P2 |
| 额度计费体系 | 只有假余额 | 🟡 P1 |
| 内容安全 | 无 | 🔴 P0（合规必需） |

---

## 三、改造总体架构

```
┌─────────────── 微信小程序（uni-app）───────────────┐
│  Tab1 首页(AI能力导航)  Tab2 AI对话(核心)           │
│  Tab3 智能体广场      Tab4 我的(额度/订单)          │
│                                                    │
│  request 封装: enableChunked:true + onChunkReceived│
│  (wx.request 分块流式，基础库 ≥2.20.1，免自建WS)     │
└──────────────────┬─────────────────────────────────┘
                   │ HTTPS (wss 可选备用)
┌──────────────────▼─────────────────────────────────┐
│  AI 网关（Java，挂到现有 Server 工程新模块 ai-gateway）│
│  ├─ 统一对话接口 /ai/chat/stream (SSE 转发)          │
│  ├─ 会话/消息 CRUD、上下文裁剪                       │
│  ├─ 多模型适配层(策略模式): DeepSeek / 混元 / GLM     │
│  ├─ 额度扣减、限流、Token 统计                        │
│  └─ 内容安全: wx.msgSecCheck 输入 + 输出审核          │
└──────────────────┬─────────────────────────────────┘
                   │
        ┌──────────▼──────────┐        ┌───────────────┐
        │ SQLite (现有)        │        │ 大模型 API      │
        │ 新增 ai_ 相关表       │        │ (DeepSeek/GLM…)│
        └─────────────────────┘        └───────────────┘
```

**技术选型决策（关键点）**

1. **流式方案**：首选 `wx.request` + `enableChunked: true` + `onChunkReceived`（小程序原生支持 SSE 分块，不需要自建 WebSocket）；WebSocket 仅当后续需要服务端主动推送（任务进度、绘画结果）时再上。
2. **大模型接入**：通过自建 Java 网关中转，**API Key 永不下发到小程序端**。首选 DeepSeek（便宜、推理强）+ 智谱 GLM-4-Flash（有免费额度）双模型。
3. **Markdown 渲染**：对话气泡引入 `mp-html`（uni_modules 已可安装）渲染 AI 返回的 Markdown/代码块。
4. **复用现有 Java Server**：AI 网关做成现有工程的独立 Module（`ai-gateway`），权限体系复用现有 admin/permission 模块，SQLite 增表即可，不引入新数据库。

---

## 四、功能改造明细

### 4.1 P0 — 核心对话（第一批落地）

**A. 真流式对话**
- 前端：封装 `common/utils/ai-stream.js`：
  - `uni.request({ enableChunked: true, ... })` + `requestTask.onChunkReceived`
  - 缓冲区按 `\n\n` 切 SSE 帧（防止 TCP 拆包截断 JSON）
  - **节流渲染**：累积 80~100ms 或每 10 字符再更新一次视图，避免 setData 卡顿
  - 断线重连 + 超时中止 + 「停止生成」按钮（`requestTask.abort()`）
- 改造 `components/tab-ai.vue`：气泡支持 Markdown、代码块复制、生成中光标动画、重新生成/复制/继续

**B. 历史会话**
- 新页面 `pages-ai/chat`（对话独立成页，Tab 保留入口）+ `pages-ai/history`（会话列表）
- 左滑重命名/删除/置顶；进入会话自动加载历史 messages

**C. 内容安全（合规硬要求）**
- 用户输入：后端调 `security.msgSecCheck`（微信内容安全 API）
- AI 输出：流式完成后整体再过一次检测，命中则替换提示文案
- 界面底部标注「内容由 AI 生成，仅供参考」

### 4.2 P1 — 体验与商业化

**A. 深度思考模式**（对标 DeepSeek R1）
- 输入栏上方「深度思考」开关；开启后网关路由到推理模型
- 推理过程折叠展示（`reasoning_content` 字段，可展开/收起「思考过程」）

**B. 多模型切换**
- 对话页顶部模型选择器：`DeepSeek-V3` / `DeepSeek-R1` / `GLM-4-Flash`
- 网关策略模式适配层，统一入参出参

**C. 智能体广场**（Tab3 由「课程」改造）
- 预置智能体：学习助手 / 小红书文案 / 编程搭子 / 简历优化 / 英语陪练 / 周报生成器…
- 每个 = systemPrompt + 引导开场白 + 推荐问题；点进去直接进入对话

**D. 额度体系**（Tab4 改造）
- 真实 AI 币：按 Token 用量折算扣减；每日签到送额度
- 用量明细页、充值页（微信支付，挂现有订单能力）

**E. 多模态输入**
- 拍照/相册识图（vision 模型，`chooseMedia` → 上传 OSS/本地 → base64 传网关）
- 文件解读：PDF/Word 上传后摘要问答（走文件解析服务）
- 语音输入：`wx.getRecorderManager` → ASR 转文字

### 4.3 P2 — 增长玩法

- **AI 绘画**：文生图 + 图生图 + 风格迁移；作品社区（展示/点赞）——参考「AI 绘画岛」留存数据
- **微信智能体技能包适配**：优化高频场景（学习问答、文案生成）的意图响应速度，争取成为微信 AI 智能体的被调小程序
- **分享裂变**：AI 回答卡片分享（分享图带问题+答案摘要+码）

---

## 五、数据库设计（SQLite 新增表）

```sql
-- 会话表
CREATE TABLE ai_conversation (
  id          TEXT PRIMARY KEY,              -- 雪花ID
  user_id     TEXT NOT NULL,                 -- 用户
  title       TEXT DEFAULT '新对话',          -- 会话标题(首轮后AI自动生成)
  agent_id    TEXT,                          -- 关联智能体, 普通对话为空
  model       TEXT DEFAULT 'deepseek-v3',    -- 当前模型
  pinned      INTEGER DEFAULT 0,             -- 置顶 0/1
  msg_count   INTEGER DEFAULT 0,             -- 消息数(冗余)
  last_msg_at TEXT,                          -- 最后消息时间(列表排序)
  status      INTEGER DEFAULT 1,             -- 1正常 0删除
  created_at  TEXT, updated_at  TEXT
);

-- 消息表
CREATE TABLE ai_message (
  id             TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  role           TEXT NOT NULL,              -- user / assistant / system
  content        TEXT,                       -- 正文(Markdown)
  reasoning      TEXT,                       -- 深度思考过程(可空)
  model          TEXT,                       -- 生成所用模型
  prompt_tokens  INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  coins_cost     REAL DEFAULT 0,             -- 扣减AI币
  safe_status    INTEGER DEFAULT 1,          -- 安检结果 1通过 0拦截
  created_at     TEXT
);
CREATE INDEX idx_msg_conv ON ai_message(conversation_id, created_at);

-- 智能体表
CREATE TABLE ai_agent (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,                 -- 智能体名称
  icon        TEXT,                          -- 图标
  category    TEXT,                          -- 分类: 学习/办公/文案/编程
  system_prompt TEXT NOT NULL,               -- 角色系统提示词
  opening     TEXT,                          -- 开场白
  suggestions TEXT,                          -- 推荐问题 JSON数组
  sort        INTEGER DEFAULT 0,
  status      INTEGER DEFAULT 1,
  created_at  TEXT
);

-- 用户额度/流水表
CREATE TABLE ai_coin_log (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  change     REAL NOT NULL,                  -- 正=充值/赠送 负=消耗
  type       TEXT NOT NULL,                  -- recharge/sign/deduct/refund
  remark     TEXT,
  balance    REAL,                           -- 变动后余额(冗余,便于对账)
  created_at TEXT
);

-- 模型配置表(运营可调)
CREATE TABLE ai_model (
  id           TEXT PRIMARY KEY,             -- deepseek-v3 / deepseek-r1 / glm-4-flash
  display_name TEXT,
  provider     TEXT,                         -- deepseek/zhipu/hunyuan
  api_model    TEXT,                         -- 厂商侧模型名
  price_per_1k_input  REAL,                  -- 计费单价(AI币/千token)
  price_per_1k_output REAL,
  daily_free_tokens INTEGER DEFAULT 0,       -- 每日免费额度
  status       INTEGER DEFAULT 1
);
```

---

## 六、接口设计（ai-gateway 模块）

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/ai/chat/stream` | 流式对话（SSE），入参 conversationId、content、model、agentId |
| POST | `/ai/chat/stop` | 中止生成（幂等） |
| GET | `/ai/conversations` | 会话列表（分页） |
| PUT/DELETE | `/ai/conversations/{id}` | 重命名 / 删除 / 置顶 |
| GET | `/ai/conversations/{id}/messages` | 历史消息 |
| GET | `/ai/agents` | 智能体广场列表 |
| GET | `/ai/coins/balance` | 余额 |
| POST | `/ai/coins/recharge` | 充值下单（微信支付） |
| POST | `/ai/media/upload` | 图片/文件上传（识图、文件解读用） |

SSE 帧格式（网关统一）：
```
data: {"type":"delta","content":"你"}          // 增量正文
data: {"type":"reasoning","content":"..."}     // 思考过程增量
data: {"type":"done","usage":{"prompt_tokens":123,"completion_tokens":456,"coins_cost":0.02}}
data: {"type":"error","message":"..."}
```

---

## 七、实施路线图

| 阶段 | 内容 | 涉及改动 |
|---|---|---|
| **P0-1 流式对话 MVP** | request 封装、Java 网关 `/ai/chat/stream`、DeepSeek 接入、tab-ai.vue 重写、msgSecCheck、内容标识 | 前端 3 个文件 + 后端 1 个新模块 |
| **P0-2 会话管理** | pages-ai 分包（chat/history）、会话 CRUD、上下文裁剪（最近 20 条）、首页改版为 AI 功能导航 | 新分包 + SQLite 2 张表 |
| **P1-1 模型能力** | 深度思考开关、多模型切换、GLM 双模型、额度扣减与签到 | 网关策略层 + 2 张表 |
| **P1-2 智能体与商业化** | Tab3 改智能体广场、Tab4 真实额度/用量/充值、Markdown+代码高亮完善 | 2 个 Tab 重写 |
| **P1-3 多模态** | 拍照识图、语音输入、文件解读 | 媒体上传链路 |
| **P2 增长** | AI 绘画 + 作品社区、分享卡片、微信智能体适配 | 新分包 |

**建议先做 P0-1**：一个真实可用的流式 AI 对话是所有后续功能的基座，且改造量最小（动 tab-ai.vue + api/ 封装 + 后端一个接口），1 次迭代即可见效。

---

## 八、风险与注意事项

1. **合规**：生成式 AI 需在微信后台完成「小程序生成式 AI 场景」类目报备（需算法备案号或接入已备案大模型服务）；所有 AI 内容须带「AI 生成」标识。
2. **域名**：模型代理域名必须 HTTPS + 在小程序后台配置 request 合法域名；不能直连 IP。
3. **成本**：DeepSeek 便宜但建议仍做每日免费额度封顶 + 网关层用户级限流（如 10 次/分钟），防刷。
4. **基础库兼容**：`onChunkReceived` 需基础库 ≥ 2.20.1，低版本回退 WebSocket 或非流式一次性返回。
5. **上下文成本**：长对话按「最近 N 条 + 超长摘要」裁剪，控制 Token 成本。
