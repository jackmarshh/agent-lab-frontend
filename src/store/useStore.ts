import { create } from 'zustand';
import type { Message, Metadata } from '../types';

function newConversationId(): string {
  return `session-${crypto.randomUUID().slice(0, 8)}`;
}

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
  conversationId: newConversationId(),
  totalCost: 0,
  totalTokens: { prompt: 0, completion: 0 },

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setPending: (isPending) => set({ isPending }),

  updateUsage: (metadata) =>
    set((state) => {
      const usage = metadata.token_usage;
      if (!usage) return state;
      return {
        totalCost: state.totalCost + (metadata.estimated_cost_rmb ?? 0),
        totalTokens: {
          prompt: state.totalTokens.prompt + usage.prompt_tokens,
          completion: state.totalTokens.completion + usage.completion_tokens,
        },
      };
    }),

  resetSession: () =>
    set({
      messages: [],
      isPending: false,
      conversationId: newConversationId(),
      totalCost: 0,
      totalTokens: { prompt: 0, completion: 0 },
    }),
}));

/** 取最后一条助手消息（倒序查找，避免每次 `[...].reverse()` 拷贝数组）。 */
export function selectLastAssistantMessage(messages: Message[]): Message | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === 'assistant') return m;
  }
  return undefined;
}
