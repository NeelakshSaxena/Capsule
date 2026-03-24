export type AgentStatus = 'idle' | 'running' | 'error';
export type MemoryMode = 'full' | 'scoped' | 'none';

export interface AgentMetrics {
  tasks_completed: number;
  success_rate: number;
  latency: number;
}

export interface AgentExecution {
  auto_restart: boolean;
  max_concurrency: number;
}

export interface Tool {
  name: string;
  input: string;
  output: string;
}

export interface Agent {
  id: string;
  name: string;
  model: string;
  system_prompt: string;
  tools: string[]; // List of tool names
  memory: {
    mode: MemoryMode;
  };
  status: AgentStatus;
  execution: AgentExecution;
  metrics: AgentMetrics;
}
