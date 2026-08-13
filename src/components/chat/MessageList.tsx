import { useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { EmptyState } from './EmptyState';

const STICKY_THRESHOLD_PX = 80;

interface MessageListProps {
  isPending: boolean;
  onRetry: (incident: string) => void;
  onSuggestion: (text: string) => void;
}

export function MessageList({ isPending, onRetry, onSuggestion }: MessageListProps) {
  const messages = useStore((s) => s.messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  // 用户回看历史（滚离底部）时不打扰自动滚动
  const stickToBottomRef = useRef(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < STICKY_THRESHOLD_PX;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottomRef.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages.length, isPending]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      aria-live="polite"
      aria-relevant="additions"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        {messages.length === 0 ? (
          <EmptyState onSuggestion={onSuggestion} />
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} onRetry={onRetry} />
            ))}
            {isPending && <TypingIndicator />}
          </>
        )}
      </div>
    </div>
  );
}
