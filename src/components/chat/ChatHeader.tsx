import { PanelRight, Terminal, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StatusDot } from '../ui/StatusDot';
import type { BackendStatus } from '../../types';

interface ChatHeaderProps {
  backendStatus: BackendStatus;
  onToggleSidebar: () => void;
}

export function ChatHeader({ backendStatus, onToggleSidebar }: ChatHeaderProps) {
  const { conversationId, resetSession } = useStore();

  const handleReset = () => {
    if (window.confirm('确定要清空当前会话与统计数据吗？')) {
      resetSession();
    }
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-ink-700 bg-ink-900/80 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-500/25 bg-accent-500/10">
          <Terminal size={16} className="text-accent-500" />
        </div>
        <div className="min-w-0 leading-tight">
          <h1 className="truncate font-mono text-sm font-semibold tracking-tight text-ink-100">
            AGENT LAB v2
          </h1>
          <p className="truncate font-mono text-[10px] text-ink-400">{conversationId}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <div className="hidden items-center rounded-lg border border-ink-700 bg-ink-800/60 px-2.5 py-1.5 sm:flex">
          <StatusDot status={backendStatus} />
        </div>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-ink-400 transition-colors hover:bg-ink-700 hover:text-ink-100 lg:hidden"
          aria-label="切换证据面板"
          title="切换证据面板"
        >
          <PanelRight size={18} />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md p-2 text-ink-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          aria-label="清空会话"
          title="清空会话"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </header>
  );
}
