import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { TracePanel } from './TracePanel';
import { Send, User, Bot, Loader2, Trash2 } from 'lucide-react';
import axios from 'axios';
import type { Message, DiagnoseResponse } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, addMessage, isPending, setPending, conversationId, updateUsage, resetSession } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    addMessage(userMsg);
    setInput('');
    setPending(true);

    try {
      const response = await axios.post<DiagnoseResponse>('http://localhost:8000/diagnose', {
        incident: input,
        service: 'tourism-agent',
        conversation_id: conversationId,
      });

      const data = response.data;
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `${data.summary}\n\n**建议行动：**\n${data.recommended_action}`,
        trace: data.trace,
        evidence: data.evidence,
        metadata: data.metadata,
        timestamp: Date.now(),
      };

      addMessage(assistantMsg);
      updateUsage(data.metadata);
    } catch (error) {
      console.error('API Error:', error);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ API 调用失败，请确保后端服务已启动（localhost:8000）。',
        timestamp: Date.now(),
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Header */}
      <div className="h-12 border-b border-codex-border flex items-center justify-between px-6 bg-codex-bg/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-codex-cyan" />
          <h1 className="font-mono text-sm tracking-tighter text-gray-200">AGENT-LAB_v0.1.0</h1>
        </div>
        <button 
          onClick={resetSession}
          className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400/10"
          title="Reset Session"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth pb-32">
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <Bot size={48} className="text-codex-cyan/20" />
              <div className="space-y-2">
                <p className="text-gray-400 font-mono text-sm tracking-wide">READY FOR INPUT</p>
                <p className="text-gray-600 text-xs font-mono">TYPE YOUR TOURISM REQUEST TO START REASONING</p>
              </div>
            </motion.div>
          )}
          
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded bg-codex-cyan/10 flex items-center justify-center shrink-0 border border-codex-cyan/20">
                  <Bot size={18} className="text-codex-cyan" />
                </div>
              )}
              
              <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`p-4 rounded-lg font-mono text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-codex-cyan/5 border border-codex-cyan/20 text-codex-cyan' 
                    : 'bg-codex-card border border-codex-border text-gray-300'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.trace && <TracePanel trace={msg.trace} />}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                  <User size={18} className="text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}

          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded bg-codex-cyan/10 flex items-center justify-center shrink-0 border border-codex-cyan/20">
                <Loader2 size={18} className="text-codex-cyan animate-spin" />
              </div>
              <div className="p-4 rounded-lg bg-codex-card border border-codex-border font-mono text-xs text-codex-cyan animate-pulse">
                AGENT IS THINKING... EXECUTING MULTI-STEP REASONING...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-codex-card border border-codex-border rounded-lg shadow-2xl overflow-hidden focus-within:border-codex-cyan transition-colors"
        >
          <div className="flex items-center px-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ASK ME ABOUT YOUR NEXT TRIP (E.G. 'BUDGET TRIP TO BEIJING')..."
              className="flex-1 bg-transparent py-4 text-sm font-mono focus:outline-none text-gray-200"
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={!input.trim() || isPending}
              className="p-2 text-codex-cyan disabled:opacity-30 hover:bg-codex-cyan/10 rounded transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
