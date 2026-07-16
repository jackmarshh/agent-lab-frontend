import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight } from 'lucide-react';

interface TracePanelProps {
  trace: string[];
}

export const TracePanel: React.FC<TracePanelProps> = ({ trace }) => {
  return (
    <div className="mt-4 p-3 bg-[#111] border border-codex-border rounded font-mono text-[11px]">
      <div className="flex items-center gap-2 text-gray-500 mb-3 border-b border-codex-border pb-2">
        <Activity size={14} className="text-codex-cyan" />
        <span>REASONING_TRACE</span>
      </div>
      
      <div className="space-y-1">
        <AnimatePresence>
          {trace.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-start gap-2 text-gray-400"
            >
              <ChevronRight size={12} className="mt-0.5 text-codex-cyan/50" />
              <span>{step}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
