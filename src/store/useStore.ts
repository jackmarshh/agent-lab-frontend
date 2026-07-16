import { create } from 'zustand';
import type { Message, Metadata } from '../types';

interface AgentState {
  messages: Message[];
  isPending: boolean;
  conversationId: string;
  totalCost: number;
  totalTokens: {
    prompt: number;
    completion: number;
  };
  addMessage: (message: Message) => void;
  setPending: (pending: boolean) => void;
  updateUsage: (metadata: Metadata) => void;
  resetSession: () => void;
}

export const useStore = create<AgentState>((set) => ({
  messages: [],
  isPending: false,
  conversationId: `session-${Math.random().toString(36).slice(2, 11)}`,
  totalCost: 0,
  totalTokens: {
    prompt: 0,
    completion: 0,
  },
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setPending: (pending) => set({ isPending: pending }),
  updateUsage: (metadata) => set((state) => {
    if (!metadata.token_usage) return state;
    return {
      totalCost: state.totalCost + (metadata.estimated_cost_rmb || 0),
      totalTokens: {
        prompt: state.totalTokens.prompt + metadata.token_usage.prompt_tokens,
        completion: state.totalTokens.completion + metadata.token_usage.completion_tokens,
      }
    };
  }),
  resetSession: () => set({
    messages: [],
    isPending: false,
    conversationId: `session-${Math.random().toString(36).slice(2, 11)}`,
    totalCost: 0,
    totalTokens: { prompt: 0, completion: 0 }
  }),
}));
