import React from 'react';
import { useStore } from '../store/useStore';
import { Database, Cloud, Plane, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (source: string) => {
  if (source.includes('天气')) return <Cloud size={14} />;
  if (source.includes('机票') || source.includes('去哪儿')) return <Plane size={14} />;
  if (source.includes('知识') || source.includes('向量')) return <Search size={14} />;
  return <Database size={14} />;
};

export const EvidenceSidebar: React.FC = () => {
  const { messages } = useStore();
  
  // 获取当前最后一条消息的所有证据
  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');
  const evidences = lastAssistantMessage?.evidence || [];

  return (
    <div className="w-80 border-l border-codex-border h-full bg-codex-bg overflow-y-auto p-4 hidden lg:block">
      <div className="flex items-center gap-2 mb-6 text-codex-cyan font-mono text-sm border-b border-codex-border pb-2">
        <Database size={16} />
        <span>EVIDENCE_POOL</span>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {evidences.length === 0 ? (
            <div className="text-gray-600 text-xs font-mono italic">No evidence collected yet...</div>
          ) : (
            evidences.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 rounded bg-codex-card border border-codex-border hover:border-codex-cyan transition-colors group"
              >
                <div className="flex items-center gap-2 text-codex-cyan text-[10px] font-mono mb-2">
                  {getIcon(ev.source)}
                  <span className="opacity-70 group-hover:opacity-100 uppercase">{ev.source}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  {ev.detail}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
