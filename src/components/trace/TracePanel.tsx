import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

interface TracePanelProps {
  trace: string[];
}

export function TracePanel({ trace }: TracePanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-ink-700 bg-ink-950/70">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors hover:bg-ink-800/60"
        aria-expanded={expanded}
        aria-controls="reasoning-trace-body"
      >
        <span className="flex items-center gap-2 font-mono text-[11px] text-ink-300">
          <Activity size={13} className="text-accent-500" />
          REASONING_TRACE
          <span className="rounded bg-ink-700 px-1.5 py-0.5 text-[10px] text-ink-300">
            {trace.length}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={cn('text-ink-400 transition-transform', expanded && 'rotate-180')}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ol
            id="reasoning-trace-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink-700 px-3 py-2"
          >
            {trace.map((step, idx) => (
              <motion.li
                key={`${idx}-${step}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                className="flex items-start gap-2 py-1 font-mono text-[11px] leading-relaxed text-ink-300"
              >
                <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded bg-ink-700 text-[9px] text-ink-400">
                  {idx + 1}
                </span>
                <span className="min-w-0">{step}</span>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}
