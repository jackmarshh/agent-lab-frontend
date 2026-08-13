import { motion, AnimatePresence } from 'framer-motion';
import { Database, X } from 'lucide-react';
import { useStore, selectLastAssistantMessage } from '../../store/useStore';
import { EvidenceCard } from './EvidenceCard';
import { cn } from '../../lib/cn';

interface EvidenceSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function EvidenceSidebar({ open, onClose }: EvidenceSidebarProps) {
  const messages = useStore((s) => s.messages);
  const lastAssistant = selectLastAssistantMessage(messages);
  const evidences = lastAssistant?.evidence ?? [];

  return (
    <>
      {/* 移动端遮罩 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <aside
        aria-label="证据面板"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-ink-700 bg-ink-900 shadow-2xl transition-transform duration-200',
          'lg:static lg:z-auto lg:translate-x-0 lg:bg-transparent lg:shadow-none',
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-ink-700 px-4">
          <h2 className="flex items-center gap-2 font-mono text-xs font-semibold text-accent-500">
            <Database size={15} />
            EVIDENCE_POOL
            <span className="rounded bg-ink-700 px-1.5 py-0.5 text-[10px] text-ink-300">
              {evidences.length}
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-ink-700 hover:text-ink-100 lg:hidden"
            aria-label="关闭证据面板"
          >
            <X size={17} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {evidences.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
              <Database size={28} className="text-ink-600" />
              <p className="font-mono text-[11px] leading-relaxed text-ink-500">
                NO EVIDENCE YET
                <br />
                发送请求后，Agent 采集到的
                <br />
                数据源会展示在这里
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {evidences.map((ev, idx) => (
                  <motion.div
                    key={`${ev.source}-${idx}`}
                    layout
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(idx * 0.06, 0.5) }}
                  >
                    <EvidenceCard evidence={ev} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
