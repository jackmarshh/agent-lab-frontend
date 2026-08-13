import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  '预算 3000 元的北京三日游',
  '杭州周末两日游，想看西湖和宋城',
  '带老人小孩的成都 5 日行程',
];

interface EmptyStateProps {
  onSuggestion: (text: string) => void;
}

export function EmptyState({ onSuggestion }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-500/25 bg-accent-500/10">
        <Sparkles size={26} className="text-accent-500" />
      </div>
      <h2 className="font-mono text-sm font-semibold tracking-wide text-ink-100">
        READY FOR INPUT
      </h2>
      <p className="mt-1.5 max-w-sm font-mono text-[11px] leading-relaxed text-ink-400">
        描述你的出行需求，Agent 会实时展示多步推理过程、
        证据采集与性能指标。
      </p>

      <div className="mt-8 flex max-w-md flex-col gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSuggestion(s)}
            className="group flex items-center justify-between gap-3 rounded-lg border border-ink-700 bg-ink-800/50 px-3.5 py-2.5 text-left font-mono text-xs text-ink-300 transition-colors hover:border-accent-500/40 hover:bg-ink-800 hover:text-ink-100"
          >
            <span>{s}</span>
            <span className="text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-500">
              →
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
