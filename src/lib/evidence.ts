import { Cloud, Plane, BookOpen, Database, FolderSearch, type LucideIcon } from 'lucide-react';
import type { Evidence, EvidenceCategory } from '../types';

const CATEGORY_META: Record<
  EvidenceCategory,
  { label: string; icon: LucideIcon; className: string }
> = {
  weather: { label: '天气', icon: Cloud, className: 'text-sky-400' },
  flight: { label: '交通', icon: Plane, className: 'text-violet-400' },
  knowledge: { label: '知识', icon: BookOpen, className: 'text-amber-400' },
  database: { label: '数据', icon: Database, className: 'text-emerald-400' },
  other: { label: '其他', icon: FolderSearch, className: 'text-ink-300' },
};

/** 依据证据来源关键字归类，映射到稳定图标/颜色（不再直接依赖后端文案）。 */
export function classifyEvidence(source: string): EvidenceCategory {
  if (/天气|气象|weather/i.test(source)) return 'weather';
  if (/机票|航班|去哪儿|携程|交通|flight|air/i.test(source)) return 'flight';
  if (/知识|向量|检索|知识库|docs|knowledge/i.test(source)) return 'knowledge';
  if (/数据库|db|mysql|mongo|redis/i.test(source)) return 'database';
  return 'other';
}

export function getEvidenceMeta(source: string) {
  return CATEGORY_META[classifyEvidence(source)];
}

export type { Evidence };
