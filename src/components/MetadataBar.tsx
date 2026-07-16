import React from 'react';
import { useStore } from '../store/useStore';
import { Cpu, DollarSign, Clock } from 'lucide-react';

export const MetadataBar: React.FC = () => {
  const { totalTokens, totalCost, messages } = useStore();
  
  const lastMessage = messages[messages.length - 1];
  const latency = lastMessage?.metadata?.latency_seconds;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-codex-card border-t border-codex-border px-4 flex items-center justify-between text-[10px] font-mono text-gray-500 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-codex-cyan" />
          <span>TOKENS: {totalTokens.prompt + totalTokens.completion} (P:{totalTokens.prompt} C:{totalTokens.completion})</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={12} className="text-codex-cyan" />
          <span>EST. COST: ¥{totalCost.toFixed(5)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {latency && (
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-codex-cyan" />
            <span>LATENCY: {latency}s</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-codex-cyan animate-pulse" />
          <span>CONNECTED: LOCALHOST:8000</span>
        </div>
      </div>
    </div>
  );
};
