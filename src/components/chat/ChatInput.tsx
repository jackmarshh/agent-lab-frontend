import { useEffect, useRef, useState } from 'react';
import { CornerDownLeft, Send, Square } from 'lucide-react';
import { cn } from '../../lib/cn';

interface ChatInputProps {
  disabled: boolean;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export function ChatInput({ disabled, onSubmit, onCancel }: ChatInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const canSubmit = value.trim().length > 0 && !disabled;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(value);
    setValue('');
  };

  // 请求结束后把焦点还给输入框
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  return (
    <div className="shrink-0 px-4 pb-4 pt-2 sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl" aria-label="发送消息">
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl border bg-ink-800/90 px-3 transition-colors',
            'focus-within:border-accent-500/60 focus-within:ring-2 focus-within:ring-accent-500/15',
            disabled ? 'border-ink-600' : 'border-ink-600 hover:border-ink-500',
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            placeholder="描述你的出行需求，例如「预算 3000 元的北京三日游」…"
            aria-label="输入消息"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent py-3.5 font-mono text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none disabled:cursor-not-allowed"
          />

          {disabled ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md p-2 text-ink-300 transition-colors hover:bg-ink-700 hover:text-red-400"
              aria-label="取消请求"
              title="取消请求"
            >
              <Square size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-md p-2 text-accent-500 transition-colors hover:bg-accent-500/10 disabled:cursor-not-allowed disabled:text-ink-500 disabled:hover:bg-transparent"
              aria-label="发送"
              title="发送 (Enter)"
            >
              <Send size={18} />
            </button>
          )}

          <kbd className="hidden items-center gap-1 rounded border border-ink-600 bg-ink-700 px-1.5 py-0.5 font-mono text-[10px] text-ink-400 sm:flex">
            <CornerDownLeft size={10} />
            发送
          </kbd>
        </div>
      </form>
    </div>
  );
}
