export type EvidenceCategory =
  | 'weather'
  | 'flight'
  | 'knowledge'
  | 'database'
  | 'other';

export type Evidence = {
  source: string;
  detail: string;
};

export type TokenUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_calls: number;
};

export type Metadata = {
  token_usage?: TokenUsage;
  estimated_cost_rmb?: number;
  latency_seconds?: number;
  parallel_optimized?: boolean;
};

export type MessageKind = 'normal' | 'error';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  trace?: string[];
  evidence?: Evidence[];
  metadata?: Metadata;
  kind?: MessageKind;
  /** 出错时保留原始输入，用于一键重试 */
  retryPayload?: string;
};

export type DiagnoseRequest = {
  incident: string;
  service: string;
  conversation_id: string;
};

export type DiagnoseResponse = {
  status: 'completed' | 'needs_attention';
  summary: string;
  recommended_action: string;
  evidence: Evidence[];
  trace: string[];
  metadata: Metadata;
};

export type BackendStatus = 'online' | 'offline' | 'unknown';
