import { Clock3, Coins, Cpu } from 'lucide-react';
import { useStore, selectLastAssistantMessage } from '../../store/useStore';
import { StatusDot } from '../ui/StatusDot';
import type { BackendStatus } from '../../types';

interface MetadataBarProps {
  backendStatus: BackendStatus;
}

export function MetadataBar({ backendStatus }: MetadataBarProps) {
  const { totalTokens, totalCost, messages } = useStore();
  const lastAssistant = selectLastAssistantMessage(messages);
  const latency = lastAssistant?.metadata?.latency_seconds;

  const total = totalTokens.prompt + totalTokens.completion;

  return (
    <footer className="flex h-9 shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-ink-700 bg-ink-900/90 px-4 font-mono text-[10px] text-ink-400 sm:px-6">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1.5" title="Token 用量">
          <Cpu size={12} className="text-accent-500" />
          <span>
            TOKENS {total}
            <span className="text-ink-500"> (P:{totalTokens.prompt} C:{totalTokens.completion})</span>
          </span>
        </span>
        <span className="flex items-center gap-1.5" title="预估成本">
          <Coins size={12} className="text-accent-500" />
          <span>EST. COST ¥{totalCost.toFixed(5)}</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        {latency !== undefined && (
          <span className="flex items-center gap-1.5" title="最近一次响应延迟">
            <Clock3 size={12} className="text-accent-500" />
            <span>LATENCY {latency}s</span>
          </span>
        )}
        <StatusDot status={backendStatus} />
      </div>
    </footer>
  );
}
