import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Avatar } from './Avatar';
import { TracePanel } from '../trace/TracePanel';
import type { Message } from '../../types';
import { cn } from '../../lib/cn';

const MarkdownContent = lazy(() =>
  import('./MarkdownContent').then((m) => ({ default: m.MarkdownContent })),
);

interface MessageBubbleProps {
  message: Message;
  onRetry?: (incident: string) => void;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour12: false });
}

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isError = message.kind === 'error';
  const retryPayload = message.retryPayload;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex gap-3', isUser && 'flex-row-reverse')}
      aria-label={isUser ? '用户消息' : '助手消息'}
    >
      <Avatar isUser={isUser} />

      <div className={cn('flex max-w-[85%] min-w-0 flex-col gap-1', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-xl border px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'border-accent-500/25 bg-accent-500/10 text-ink-100'
              : 'border-ink-600 bg-ink-800/80 text-ink-200',
            isError && 'border-red-500/40 bg-red-500/5 text-red-200/90',
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : isError ? (
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
              <div>
                <p>{message.content}</p>
                {retryPayload && onRetry && (
                  <button
                    type="button"
                    onClick={() => onRetry(retryPayload)}
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-red-500/40 px-2.5 py-1 font-mono text-xs text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
                  >
                    <RotateCcw size={12} />
                    重试
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="md-body">
              <Suspense fallback={<p className="whitespace-pre-wrap">{message.content}</p>}>
                <MarkdownContent content={message.content} />
              </Suspense>
              {message.trace && message.trace.length > 0 && (
                <TracePanel trace={message.trace} />
              )}
            </div>
          )}
        </div>

        <time
          dateTime={new Date(message.timestamp).toISOString()}
          className="px-1 font-mono text-[10px] text-ink-500"
        >
          {formatTime(message.timestamp)}
        </time>
      </div>
    </motion.article>
  );
}
