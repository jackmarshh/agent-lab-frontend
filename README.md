# 🖥️ Agent Lab Frontend (Codex Style)

为 [Operational Agent Lab](https://github.com/jackmarshh/agent-lab) 打造的沉浸式交互界面。采用 OpenAI Codex 风格，专注于展示 AI Agent 的推理链、证据采集及实时性能指标。

## ✨ 特性

- **Codex 极简设计**: 极致的深色模式，等宽字体，流畅的 Framer Motion 动效。
- **推理追踪 (Reasoning Trace)**: 实时展示 Agent 的 Thought-Action-Observation 闭环。
- **证据看板 (Evidence Sidebar)**: 自动提取并卡片化展示后端采集的原始数据源。
- **性能监控 (Performance Monitor)**: 底部状态栏展示实时 Token 统计、RMB 成本换算及响应延迟。
- **响应式布局**: 针对开发者宽屏优化，完美适配多任务并行。

## 🛠️ 技术选型

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Build Tool**: Vite
- **State Management**: Zustand
- **Animations**: Framer Motion
- **API Client**: Axios

## 🚀 快速开始

1. **安装依赖**:
   ```bash
   pnpm install
   ```

2. **开发模式运行**:
   ```bash
   pnpm dev
   ```

3. **配置后端地址**:
   默认指向 `http://localhost:8000`。请确保后端服务已启动并配置了 CORS 权限。

## 📸 界面预览

- **左侧区域**: 对话流与推理追踪。
- **右侧区域**: 证据池 (Evidence Pool)。
- **底部区域**: 实时元数据看板。

---
> 💡 本项目是 AI Agent 系列课程的 Phase 4 产物，致力于提升 Agent 系统的可观测性与交互体验。
