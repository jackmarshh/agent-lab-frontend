# 🖥️ Agent Lab Frontend (Codex Style)

为 [Operational Agent Lab](https://github.com/jackmarshh/agent-lab) 打造的沉浸式交互界面。采用 OpenAI Codex 风格，专注于展示 AI Agent 的推理链、证据采集及实时性能指标。

## ✨ 特性

- **Codex 极简设计**: 深色模式、等宽字体、Framer Motion 动效。
- **推理追踪 (Reasoning Trace)**: 折叠式展示 Agent 的 Thought-Action-Observation 闭环。
- **证据看板 (Evidence Sidebar)**: 自动提取后端采集的原始数据源，按类型归类展示（天气/交通/知识/数据），支持一键复制。
- **性能监控 (Performance Monitor)**: 底部状态栏展示 Token 统计、RMB 成本换算及响应延迟。
- **真实后端状态**: 轮询探测后端健康状态（在线/离线），不再显示"假连接"。
- **Markdown 渲染**: 助手回复支持完整 Markdown（列表/表格/代码块），懒加载按需拆分。
- **健壮的错误处理**: 请求可取消、失败消息可一键重试，提示语中文化。
- **响应式布局**: 桌面端左右分栏，移动端证据面板抽屉式滑出。

## 🛠️ 技术选型

- **Frontend**: React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Build Tool**: Vite 8
- **State Management**: Zustand
- **Animations**: Framer Motion
- **API Client**: Axios（统一 API 层，`src/api/`）

## 🚀 快速开始

1. **安装依赖**:

   ```bash
   npm install
   ```

2. **开发模式运行**:

   ```bash
   npm run dev
   ```

3. **配置后端地址**:

   开发环境默认由 Vite 代理将 `/api/*` 转发到 `http://localhost:8000`（无跨域问题），后端无需额外配置 CORS。
   如需修改，复制 `.env.example` 为 `.env` 并调整：

   ```bash
   # .env
   VITE_API_BASE_URL=/api                    # 前端请求前缀
   VITE_API_PROXY_TARGET=http://localhost:8000  # 开发代理目标
   ```

   生产部署时把 `VITE_API_BASE_URL` 改为后端真实地址（如 `https://api.example.com`）即可。

## 🧱 目录结构

```
src/
├── api/          # API 层：axios 实例 + 接口封装
├── components/
│   ├── chat/     # 对话区（头部/消息列表/输入框/打字指示器）
│   ├── evidence/ # 证据面板与卡片
│   ├── metadata/ # 底部状态栏
│   ├── trace/    # 推理追踪
│   └── ui/       # 共享小组件（状态点等）
├── hooks/        # useChat（提交/取消/重试）、useBackendHealth（健康轮询）
├── lib/          # cn 工具、证据分类
├── store/        # Zustand 状态
└── types/        # 共享类型
```

## 📸 界面预览

- **左侧区域**: 对话流与推理追踪（可折叠）。
- **右侧区域**: 证据池 (Evidence Pool)，移动端为抽屉。
- **底部区域**: 实时元数据看板 + 真实后端连接状态。

---
> 💡 本项目是 AI Agent 系列课程的 Phase 4 产物，致力于提升 Agent 系统的可观测性与交互体验。
