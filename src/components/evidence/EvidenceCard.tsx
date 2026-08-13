import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { getEvidenceMeta } from '../../lib/evidence';
import type { Evidence } from '../../types';

export function EvidenceCard({ evidence }: { evidence: Evidence }) {
  const meta = getEvidenceMeta(evidence.source);
  const Icon = meta.icon;
  const [copied, setCopied] = useState(false);

  const copyDetail = async () => {
    try {
      await navigator.clipboard.writeText(evidence.detail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用时静默失败，不影响主流程
    }
  };

  return (
    <div className="group rounded-lg border border-ink-700 bg-ink-800/60 p-3 transition-colors hover:border-ink-500">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-ink-300">
          <Icon size={13} className={`shrink-0 ${meta.className}`} />
          <span className="truncate">{evidence.source}</span>
        </span>
        <button
          type="button"
          onClick={copyDetail}
          className="shrink-0 rounded p-1 text-ink-500 opacity-0 transition-all hover:bg-ink-700 hover:text-ink-200 group-hover:opacity-100 focus-visible:opacity-100"
          aria-label={`复制 ${evidence.source} 的内容`}
          title="复制内容"
        >
          {copied ? (
            <Check size={12} className="text-accent-500" />
          ) : (
            <Copy size={12} />
          )}
        </button>
      </div>
      <p className="line-clamp-3 font-mono text-[11.5px] leading-relaxed text-ink-400">
        {evidence.detail}
      </p>
    </div>
  );
}
