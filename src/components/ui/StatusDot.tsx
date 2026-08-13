import { Loader2 } from 'lucide-react';
import type { BackendStatus } from '../../types';
import { cn } from '../../lib/cn';

const STATUS_META: Record<
  BackendStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  online: { label: '后端在线', dotClass: 'bg-emerald-400', textClass: 'text-emerald-300' },
  offline: { label: '后端离线', dotClass: 'bg-red-500', textClass: 'text-red-300' },
  unknown: { label: '连接中…', dotClass: 'bg-amber-400 animate-pulse', textClass: 'text-amber-300' },
};

export function StatusDot({ status }: { status: BackendStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 font-mono text-[10px]', meta.textClass)}
      role="status"
      aria-label={meta.label}
    >
      {status === 'unknown' ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClass)} />
      )}
      <span>{meta.label}</span>
    </span>
  );
}
