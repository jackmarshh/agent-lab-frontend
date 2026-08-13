import { useCallback, useRef } from 'react';
import axios from 'axios';
import { useStore } from '../store/useStore';
import { diagnose } from '../api/diagnose';
import type { Message } from '../types';

const SERVICE_NAME = 'tourism-agent';

function isAbortError(err: unknown): boolean {
  if (axios.isCancel(err)) return true;
  const name = (err as { name?: string } | null)?.name;
  return name === 'CanceledError' || name === 'AbortError';
}

/**
 * 对话提交逻辑：发送请求、取消、失败重试。
 * 错误消息会作为一条带 retryPayload 的 error 消息进入列表，可一键重试。
 */
export function useChat() {
  const { isPending, setPending, conversationId, addMessage, updateUsage } =
    useStore();
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (raw: string) => {
      const incident = raw.trim();
      if (!incident || isPending) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: incident,
        timestamp: Date.now(),
      };
      addMessage(userMsg);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const data = await diagnose(
          { incident, service: SERVICE_NAME, conversation_id: conversationId },
          controller.signal,
        );

        const summaryParts = [data.summary];
        if (data.recommended_action) {
          summaryParts.push(`**建议行动：**\n${data.recommended_action}`);
        }

        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: summaryParts.join('\n\n'),
          trace: data.trace,
          evidence: data.evidence,
          metadata: data.metadata,
          timestamp: Date.now(),
        };
        addMessage(assistantMsg);
        updateUsage(data.metadata);
      } catch (err) {
        if (isAbortError(err)) return; // 用户主动取消，不当作错误
        console.error('[useChat] diagnose failed:', err);
        addMessage({
          id: crypto.randomUUID(),
          role: 'assistant',
          kind: 'error',
          content:
            '❌ 请求失败：无法连接后端服务，或服务处理出错。请确认后端已启动后重试。',
          retryPayload: incident,
          timestamp: Date.now(),
        });
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [addMessage, conversationId, isPending, setPending, updateUsage],
  );

  const retry = useCallback(
    (incident: string) => {
      void send(incident);
    },
    [send],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { send, retry, cancel, isPending };
}
