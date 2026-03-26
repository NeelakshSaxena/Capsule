import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Agent } from '../types/agent';

interface AgentContextType {
  agents: Agent[];
  getAgent: (id: string) => Agent | undefined;
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  startAgent: (id: string) => Promise<void>;
  stopAgent: (id: string) => Promise<void>;
  metrics: {
    totalExecutions: number;
    avgResponseMs: number;
  };
  isLoading: boolean;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch agents from backend
  const fetchAgents = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/agents');
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (err) {
      console.error('Failed to fetch agents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load & Polling for status sync
  useEffect(() => {
    fetchAgents();
    const interval = setInterval(fetchAgents, 3000); // Poll every 3 seconds for status changes
    return () => clearInterval(interval);
  }, []);

  const getAgent = (id: string) => agents.find((a) => a.id === id);

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    // Optimistic UI update
    setAgents((prev) =>
      prev.map((agent) => (agent.id === id ? { ...agent, ...updates } : agent))
    );
    
    // Persist to backend Redis DB
    try {
      await fetch(`http://localhost:8000/api/agents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.error('Failed to persist agent config', err);
    }
  };

  const startAgent = async (id: string) => {
    // Optimistic UI update
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'running' } : a)));
    
    try {
      const agent = getAgent(id);
      await fetch(`http://localhost:8000/api/agents/${id}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tools: agent?.tools || [],
          memory_mode: agent?.memory?.mode || 'scoped',
          system_prompt: agent?.system_prompt || '',
        })
      });
      fetchAgents(); // Force sync
    } catch (err) {
      console.error('Failed to start agent remotely', err);
      setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'error' } : a)));
    }
  };

  const stopAgent = async (id: string) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'idle' } : a)));
    try {
      await fetch(`http://localhost:8000/api/agents/${id}/stop`, {
        method: 'POST',
      });
      fetchAgents(); // Force sync
    } catch (err) {
      console.error('Failed to stop agent', err);
    }
  };

  const totalExecutions = agents.reduce((acc, a) => acc + (a.metrics?.tasks_completed || 0), 0);
  const avgResponseMs = agents.length > 0
    ? Math.round(agents.reduce((acc, a) => acc + (a.metrics?.latency || 0), 0) / agents.length)
    : 0;

  return (
    <AgentContext.Provider
      value={{
        agents,
        getAgent,
        updateAgent,
        startAgent,
        stopAgent,
        metrics: { totalExecutions, avgResponseMs },
        isLoading
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
