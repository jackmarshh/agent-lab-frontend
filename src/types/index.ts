export type Evidence = {
  source: string;
  detail: string;
};

export type Metadata = {
  token_usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_calls: number;
  };
  estimated_cost_rmb?: number;
  latency_seconds?: number;
  parallel_optimized?: boolean;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  trace?: string[];
  evidence?: Evidence[];
  metadata?: Metadata;
  timestamp: number;
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
