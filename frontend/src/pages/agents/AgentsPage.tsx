import React from 'react';
import { useAgentStore } from '../../lib/AgentContext';
import { AgentCard } from '../../components/agent/AgentCard';

export const AgentsPage: React.FC = () => {
  const { agents } = useAgentStore();

  const activecount = agents.filter((a) => a.status === 'running').length;
  const idleCount = agents.filter((a) => a.status === 'idle').length;
  const errorCount = agents.filter((a) => a.status === 'error').length;
  const totalExecutions = agents.reduce((acc, a) => acc + a.metrics.tasks_completed, 0);
  const avgResponse = Math.round(agents.reduce((acc, a) => acc + a.metrics.latency, 0) / agents.length);

  return (
    <div className="pt-24 pb-12 px-8 max-w-[1920px] mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-background mb-2">
            Agents Control Center
          </h1>
          <p className="text-on-surface-variant font-medium text-lg">
            Manage, monitor, and orchestrate all active AI agents.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 glass-card rounded-full font-bold text-on-surface hover:bg-white/80 transition-all duration-300 active:scale-95">
            Import Agent
          </button>
          <button className="px-6 py-3 bg-primary text-on-primary-container rounded-full font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 700" }}>
              plus_one
            </span>
            Create Agent
          </button>
        </div>
      </header>

      {/* Status Summary Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {/* Active Agents */}
        <div className="glass-card p-6 rounded-lg relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
              Active Agents
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-4xl font-black text-on-surface">
            {activecount < 10 ? `0${activecount}` : activecount}
          </div>
          <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">trending_up</span> +12% vs last hour
          </div>
        </div>

        {/* Idle Agents */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
              Idle Agents
            </span>
            <span className="flex h-2 w-2 rounded-full bg-zinc-400"></span>
          </div>
          <div className="text-4xl font-black text-on-surface">
            {idleCount < 10 ? `0${idleCount}` : idleCount}
          </div>
          <div className="mt-2 text-xs font-bold text-zinc-500 italic">Standby mode</div>
        </div>

        {/* Failed Agents */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
              Failed Agents
            </span>
            <span className="flex h-2 w-2 rounded-full bg-error"></span>
          </div>
          <div className="text-4xl font-black text-error">
            {errorCount < 10 ? `0${errorCount}` : errorCount}
          </div>
          <div className="mt-2 text-xs font-bold text-error flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">warning</span> Action required
          </div>
        </div>

        {/* Total Executions */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
              Total Executions
            </span>
          </div>
          <div className="text-4xl font-black text-on-surface">
            {totalExecutions >= 1000 ? `${(totalExecutions / 1000).toFixed(1)}k` : totalExecutions}
          </div>
          <div className="mt-3 h-8 flex items-end gap-1">
            <div className="w-full bg-primary/20 rounded-t-sm h-3"></div>
            <div className="w-full bg-primary/20 rounded-t-sm h-5"></div>
            <div className="w-full bg-primary rounded-t-sm h-8 shadow-sm shadow-primary/50"></div>
            <div className="w-full bg-primary/20 rounded-t-sm h-4"></div>
            <div className="w-full bg-primary/20 rounded-t-sm h-6"></div>
            <div className="w-full bg-primary/20 rounded-t-sm h-5"></div>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
              Avg Response
            </span>
          </div>
          <div className="text-4xl font-black text-on-surface">{avgResponse}ms</div>
          <div className="mt-2 text-xs font-bold text-tertiary flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">bolt</span> Optimized
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="mb-8 flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full lg:flex-1 relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-4 glass-card rounded-full border-none focus:ring-2 focus:ring-primary/50 placeholder:text-on-surface-variant/50 font-medium"
            placeholder="Search agents by name, model, or task..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select className="px-6 py-4 glass-card rounded-full border-none focus:ring-2 focus:ring-primary/50 font-bold text-xs uppercase tracking-widest text-on-surface appearance-none pr-10 bg-[url('https://api.iconify.design/material-symbols:expand-more.svg')] bg-[length:20px] bg-[right_15px_center] bg-no-repeat">
            <option>Status: All</option>
            <option>Status: Active</option>
            <option>Status: Idle</option>
          </select>
          <select className="px-6 py-4 glass-card rounded-full border-none focus:ring-2 focus:ring-primary/50 font-bold text-xs uppercase tracking-widest text-on-surface appearance-none pr-10 bg-[url('https://api.iconify.design/material-symbols:expand-more.svg')] bg-[length:20px] bg-[right_15px_center] bg-no-repeat">
            <option>Model: GPT-4o</option>
            <option>Model: Claude 3.5</option>
            <option>Model: Llama 3</option>
          </select>
          <select className="px-6 py-4 glass-card rounded-full border-none focus:ring-2 focus:ring-primary/50 font-bold text-xs uppercase tracking-widest text-on-surface appearance-none pr-10 bg-[url('https://api.iconify.design/material-symbols:expand-more.svg')] bg-[length:20px] bg-[right_15px_center] bg-no-repeat">
            <option>Sort: Recent</option>
            <option>Sort: Performance</option>
          </select>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </section>
    </div>
  );
};
