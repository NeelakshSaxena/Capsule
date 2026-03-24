import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Agent } from '../types/agent';

interface AgentContextType {
  agents: Agent[];
  getAgent: (id: string) => Agent | undefined;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  startAgent: (id: string) => void;
  stopAgent: (id: string) => void;
  metrics: {
    totalExecutions: number;
    avgResponseMs: number;
  };
}

const mockAgents: Agent[] = [
  {
    id: 'agent-01',
    name: 'Data Weaver',
    model: 'GPT-4O-ULTRA',
    system_prompt: 'YOU ARE Data Weaver. MISSION: Extract and synthesize data streams with high precision.',
    tools: ['database', 'terminal', 'language'],
    memory: { mode: 'scoped' },
    status: 'running',
    execution: { auto_restart: true, max_concurrency: 2 },
    metrics: { tasks_completed: 1429, success_rate: 99.1, latency: 120 },
  },
  {
    id: 'agent-02',
    name: 'Strategy Core',
    model: 'CLAUDE-3-OPUS',
    system_prompt: 'YOU ARE Strategy Core. MISSION: Analyze market trends and formulate operational tactics.',
    tools: ['monitoring', 'calendar_today'],
    memory: { mode: 'full' },
    status: 'idle',
    execution: { auto_restart: false, max_concurrency: 1 },
    metrics: { tasks_completed: 452, success_rate: 96.5, latency: 210 },
  },
  {
    id: 'agent-03',
    name: 'Log Sentinel',
    model: 'LLAMA-3-70B',
    system_prompt: 'YOU ARE Log Sentinel. MISSION: Monitor system logs and alert on anomalies.',
    tools: ['visibility', 'security'],
    memory: { mode: 'none' },
    status: 'running',
    execution: { auto_restart: true, max_concurrency: 5 },
    metrics: { tasks_completed: 12800, success_rate: 99.8, latency: 45 },
  },
  {
    id: 'agent-04',
    name: 'Price Scout',
    model: 'GPT-3.5-TURBO',
    system_prompt: 'YOU ARE Price Scout. MISSION: Track competitor pricing across retail platforms.',
    tools: ['shopping_cart'],
    memory: { mode: 'scoped' },
    status: 'error',
    execution: { auto_restart: false, max_concurrency: 1 },
    metrics: { tasks_completed: 12, success_rate: 45.0, latency: 400 },
  },
];

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const getAgent = (id: string) => agents.find((a) => a.id === id);

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === id ? { ...agent, ...updates } : agent))
    );
  };

  const startAgent = (id: string) => {
    updateAgent(id, { status: 'running' });
  };

  const stopAgent = (id: string) => {
    updateAgent(id, { status: 'idle' });
  };

  const totalExecutions = agents.reduce((acc, a) => acc + a.metrics.tasks_completed, 0);
  const avgResponseMs = Math.round(
    agents.reduce((acc, a) => acc + a.metrics.latency, 0) / agents.length
  );

  return (
    <AgentContext.Provider
      value={{
        agents,
        getAgent,
        updateAgent,
        startAgent,
        stopAgent,
        metrics: { totalExecutions, avgResponseMs },
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentStore = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgentStore must be used within an AgentProvider');
  }
  return context;
};
