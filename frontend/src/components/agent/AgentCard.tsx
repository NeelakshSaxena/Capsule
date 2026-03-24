import React from 'react';
import type { Agent } from '../../types/agent';
import { useAgentStore } from '../../lib/AgentContext';
import { useNavigate } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { startAgent, stopAgent } = useAgentStore();
  const navigate = useNavigate();

  const isRunning = agent.status === 'running';
  const isError = agent.status === 'error';

  let statusColor = 'bg-zinc-400';
  let statusText = 'text-zinc-500';
  let statusBg = 'bg-zinc-100';
  let borderColor = 'border-zinc-200';
  let iconColor = 'text-zinc-400';
  let iconName = 'psychology';
  
  if (isRunning) {
    statusColor = 'bg-emerald-500';
    statusText = 'text-emerald-600';
    statusBg = 'bg-primary/10';
    borderColor = 'border-primary/20';
    iconColor = 'text-primary';
    iconName = 'smart_toy';
  } else if (isError) {
    statusColor = 'bg-error';
    statusText = 'text-error';
    statusBg = 'bg-red-50';
    borderColor = 'border-red-100';
    iconColor = 'text-error';
    iconName = 'error';
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRunning) stopAgent(agent.id);
    else startAgent(agent.id);
  };

  return (
    <div 
      className={`glass-card rounded-lg p-6 flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] cursor-pointer ${isError ? 'border-red-100' : ''}`}
      onClick={() => navigate(`/agents/${agent.id}`)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full ${statusBg} flex items-center justify-center border-2 ${borderColor}`}>
            <span className={`material-symbols-outlined ${iconColor} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {iconName}
            </span>
          </div>
          <div>
            <h3 className="font-black text-xl text-on-surface">{agent.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${statusColor} ${isRunning ? 'animate-pulse' : ''}`}></span>
              <span className={`text-[10px] font-extrabold uppercase tracking-tighter ${statusText}`}>
                {agent.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-1 justify-end">
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/agents/${agent.id}`); }}>
            <span className="material-symbols-outlined text-zinc-400">settings</span>
          </button>
        </div>
      </div>
      
      <div className="mb-6 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-on-surface-variant">Model</span>
          <span className="px-3 py-1 bg-zinc-900 text-white rounded-full font-black text-[10px]">{agent.model}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-on-surface-variant">Tools</span>
          <div className="flex gap-2">
            {agent.tools.slice(0, 3).map(tool => (
              <span key={tool} className="px-2 py-0.5 bg-zinc-100 rounded text-[10px] font-bold text-zinc-600">{tool}</span>
            ))}
            {agent.tools.length > 3 && <span className="text-[10px] text-zinc-400">+{agent.tools.length - 3}</span>}
          </div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-on-surface-variant">Memory</span>
          <span className="text-on-surface font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              {agent.memory.mode === 'full' ? 'cloud' : agent.memory.mode === 'scoped' ? 'link' : 'warning'}
            </span> 
            {agent.memory.mode === 'full' ? 'Global' : agent.memory.mode === 'scoped' ? 'Scoped' : 'None'}
          </span>
        </div>
      </div>
      
      <div className={`neumorphic-inset p-4 rounded-lg mb-6 flex justify-between items-center ${isError ? 'bg-red-50/20' : 'bg-white/30'}`}>
        <span className={`text-[11px] font-black uppercase ${isError ? 'text-error' : 'text-on-surface-variant'}`}>
          {isError ? 'Re-Auth Required' : 'Execution Control'}
        </span>
        {isError ? (
          <button className="px-3 py-1 bg-error text-white text-[10px] font-black rounded-full uppercase" onClick={handleToggle}>Retry</button>
        ) : (
          <button 
            className={`w-12 h-6 rounded-full relative shadow-inner transition-colors ${isRunning ? 'bg-emerald-500' : 'bg-zinc-200'}`}
            onClick={handleToggle}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${isRunning ? 'right-1' : 'left-1'}`}></div>
          </button>
        )}
      </div>
      
      <div className="mt-auto pt-6 border-t border-white/30 flex justify-between items-center">
        <div className="text-[10px]">
          <p className="text-on-surface-variant font-bold uppercase tracking-widest">Latency</p>
          <p className="text-on-surface font-black">{agent.metrics.latency}ms</p>
        </div>
        <div className="text-[10px] text-right">
          <p className="text-on-surface-variant font-bold uppercase tracking-widest">Tasks Completed</p>
          <p className="text-on-surface font-black">{agent.metrics.tasks_completed.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
