import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const DOTS = [0, 1, 2];

export function TypingIndicator() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-3"
      aria-label="Agent 正在推理"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-500/25 bg-accent-500/10">
        <Bot size={16} className="text-accent-500" />
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/80 px-4 py-3">
        <span className="flex items-center gap-1">
          {DOTS.map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent-500"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </span>
        <span className="font-mono text-[11px] text-ink-400">
          AGENT 正在推理…
        </span>
      </div>
    </motion.div>
  );
}
