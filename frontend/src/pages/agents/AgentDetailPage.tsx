import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgentStore } from '../../lib/AgentContext';

export const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgent, updateAgent, startAgent, stopAgent } = useAgentStore();

  const agent = getAgent(id || '');

  const [promptInput, setPromptInput] = useState(agent?.system_prompt || '');
  const [consoleInput, setConsoleInput] = useState('');
  const [logs, setLogs] = useState<{ time: string; type: string; msg: string; detail: string }[]>([
    { time: '14:22:01', type: 'success', msg: 'Memory link established', detail: 'Vector database latency: 12ms' },
    { time: '14:21:45', type: 'warning', msg: 'Model call initiated', detail: 'Payload: 2.4k tokens' },
  ]);

  if (!agent) {
    return <div className="p-8 mt-24">Agent not found</div>;
  }

  const isRunning = agent.status === 'running';

  const handleToggleTool = (toolName: string) => {
    if (agent.tools.includes(toolName)) {
      updateAgent(agent.id, { tools: agent.tools.filter((t) => t !== toolName) });
    } else {
      updateAgent(agent.id, { tools: [...agent.tools, toolName] });
    }
  };

  const handleMockExecute = () => {
    if (!consoleInput.trim()) return;
    
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' });
    
    // Add User input to log
    setLogs((prev) => [
      { time, type: 'info', msg: `User Input: ${consoleInput}`, detail: 'Triggered via Test Console' },
      ...prev,
    ]);

    // Update agent state to running if not already
    if (!isRunning) startAgent(agent.id);

    setTimeout(() => {
      setLogs((prev) => [
        { time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' }), 
          type: 'success', 
          msg: `Agent ${agent.name} Responded`, 
          detail: 'Action complete. Latency: 124ms' },
        ...prev,
      ]);
    }, 1500);

    setConsoleInput('');
  };

  return (
    <div className="pt-24 pb-12 px-8 max-w-[1920px] mx-auto min-h-screen">
      <div className="mb-6 flex items-center gap-2 cursor-pointer text-zinc-500 hover:text-zinc-900 transition-colors" onClick={() => navigate('/agents')}>
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span className="text-sm font-bold uppercase tracking-wider">Back to Fleet</span>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Panel (8 Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Header Section */}
          <section className="glass-card p-8 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl ${isRunning ? 'bg-emerald-500' : 'bg-primary'} flex items-center justify-center text-white shadow-lg`}>
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isRunning ? 'smart_toy' : 'psychology'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black tracking-tight text-on-surface">{agent.name}</h1>
                  <span className={`px-3 py-1 text-[10px] font-800 uppercase tracking-widest rounded-full ${isRunning ? 'bg-emerald-100 text-emerald-700' : agent.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-zinc-100 text-zinc-700'}`}>
                    {agent.status}
                  </span>
                </div>
                <p className="text-zinc-500 font-medium mt-1">{agent.model} • Agent ID: {agent.id}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => isRunning ? stopAgent(agent.id) : startAgent(agent.id)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all active:scale-95 ${isRunning ? 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300' : 'bg-on-primary text-white hover:bg-zinc-800'}`}
              >
                <span className="material-symbols-outlined text-lg">
                  {isRunning ? 'stop' : 'play_arrow'}
                </span>
                {isRunning ? 'Stop' : 'Start'}
              </button>
              <button 
                onClick={() => { stopAgent(agent.id); setTimeout(() => startAgent(agent.id), 500); }}
                className="px-6 py-2.5 bg-white border border-zinc-200 text-on-primary rounded-full font-bold text-sm flex items-center gap-2 hover:bg-zinc-50 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                Restart
              </button>
              <button className="p-2.5 text-zinc-400 hover:text-zinc-900 transition-all">
                <span className="material-symbols-outlined">content_copy</span>
              </button>
            </div>
          </section>

          {/* System Prompt */}
          <section className="glass-card p-8 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">System Prompt</h2>
              <span className="text-[10px] font-800 uppercase tracking-widest text-zinc-400">Read-Write Access</span>
            </div>
            <textarea
              className="w-full neumorphic-inset rounded-xl p-6 bg-zinc-50/50 min-h-[200px] font-mono text-sm leading-relaxed text-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />
            <div className="flex justify-end">
              <button 
                onClick={() => updateAgent(agent.id, { system_prompt: promptInput })}
                className="px-8 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-all active:translate-y-[1px]"
              >
                Save Changes
              </button>
            </div>
          </section>

          {/* Tools & Memory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tools Allowed */}
            <section className="glass-card p-8 rounded-lg space-y-6">
              <h2 className="text-xl font-bold tracking-tight">Tools Allowed</h2>
              <div className="space-y-4">
                {[
                  { id: 'web_search', name: 'Web Search', icon: 'search' },
                  { id: 'file_browser', name: 'File Browser', icon: 'description' },
                  { id: 'database', name: 'Database Query', icon: 'database' },
                  { id: 'terminal', name: 'Terminal Execution', icon: 'terminal' },
                ].map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between p-4 bg-white/40 rounded-xl border border-white/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                        <span className="material-symbols-outlined">{tool.icon}</span>
                      </div>
                      <span className="font-semibold text-sm">{tool.name}</span>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={agent.tools.includes(tool.id)}
                        onChange={() => handleToggleTool(tool.id)}
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* Memory Access */}
            <section className="glass-card p-8 rounded-lg space-y-6">
              <h2 className="text-xl font-bold tracking-tight">Memory Access</h2>
              <div className="p-2 bg-zinc-100/50 rounded-full flex gap-1">
                {(['full', 'scoped', 'none'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateAgent(agent.id, { memory: { mode } })}
                    className={`flex-1 py-2 text-[10px] font-800 uppercase tracking-widest rounded-full transition-all ${
                      agent.memory.mode === mode 
                        ? 'bg-white shadow-sm text-on-surface' 
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100/50">
                <p className="text-xs font-medium text-amber-800/80 leading-relaxed">
                  {agent.memory.mode === 'full' && 'Full access allows the agent to read and write to the Global Context Pool. Recommended for long-term orchestration tasks.'}
                  {agent.memory.mode === 'scoped' && 'Scoped access restricts the agent to its own isolated memory context.'}
                  {agent.memory.mode === 'none' && 'Stateless execution. No memory is preserved between interactions.'}
                </p>
              </div>
            </section>
          </div>
          
          {/* Logs & Console */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* System Logs */}
            <section className="glass-card p-8 rounded-lg flex flex-col h-[400px]">
              <h2 className="text-xl font-bold tracking-tight mb-6">System Logs</h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="text-[10px] font-mono text-zinc-400 mt-1">{log.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-sm ${log.type === 'success' ? 'text-green-500' : log.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
                          {log.type === 'success' ? 'check_circle' : log.type === 'warning' ? 'sync' : 'info'}
                        </span>
                        <span className="text-sm font-semibold">{log.msg}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">{log.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Test Console */}
            <section className="glass-card p-8 rounded-lg flex flex-col h-[400px]">
              <h2 className="text-xl font-bold tracking-tight mb-6">Test Console</h2>
              <div className="flex-1 flex flex-col gap-4 min-h-0">
                <div className="flex-1 neumorphic-inset rounded-xl bg-zinc-900 p-4 font-mono text-xs text-green-400 overflow-y-auto space-y-1">
                  <div>&gt; SYSTEM READY</div>
                  <div>&gt; CURRENT STATE: {agent.status.toUpperCase()}</div>
                  {logs.slice().reverse().filter(l => l.type === 'info' || l.type === 'success').map((l, i) => (
                    <div key={i} className={l.type === 'success' ? 'text-blue-400' : ''}>
                      &gt; {l.msg}
                    </div>
                  ))}
                  <div><span className="animate-pulse">_</span></div>
                </div>
                
                <div className="flex gap-3">
                  <input 
                    type="text"
                    className="flex-1 bg-white border border-zinc-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Send a manual command to trigger execution..."
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleMockExecute()}
                  />
                  <button 
                    onClick={handleMockExecute}
                    className="p-3 bg-primary text-on-primary rounded-full hover:scale-105 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Sidebar (4 Columns) */}
        <aside className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* Performance Metrics */}
          <section className="glass-card p-8 rounded-lg space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="neumorphic-inset p-4 rounded-xl bg-zinc-50/30">
                <p className="text-[10px] font-800 uppercase tracking-widest text-zinc-400 mb-1">Tasks</p>
                <span className="text-2xl font-black text-on-surface">{agent.metrics.tasks_completed.toLocaleString()}</span>
              </div>
              <div className="neumorphic-inset p-4 rounded-xl bg-zinc-50/30">
                <p className="text-[10px] font-800 uppercase tracking-widest text-zinc-400 mb-1">Success</p>
                <span className="text-2xl font-black text-on-surface">{agent.metrics.success_rate}%</span>
              </div>
              <div className="neumorphic-inset p-4 rounded-xl bg-zinc-50/30">
                <p className="text-[10px] font-800 uppercase tracking-widest text-zinc-400 mb-1">Latency</p>
                <span className="text-2xl font-black text-on-surface">{agent.metrics.latency}ms</span>
              </div>
              <div className="neumorphic-inset p-4 rounded-xl bg-zinc-50/30">
                <p className="text-[10px] font-800 uppercase tracking-widest text-zinc-400 mb-1">Errors</p>
                <span className="text-2xl font-black text-on-surface">{(100 - agent.metrics.success_rate).toFixed(2)}%</span>
              </div>
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="glass-card p-8 rounded-lg space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Activity Timeline</h2>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-100">
              <div className="relative pl-8 flex flex-col">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-primary z-10"></div>
                <span className="text-[10px] font-800 uppercase tracking-widest text-zinc-400">Just Now</span>
                <p className="text-sm font-bold">Configuration Updated</p>
                <p className="text-xs text-zinc-500">Changed system prompt &amp; memory parameters.</p>
              </div>
              <div className="relative pl-8 flex flex-col">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-emerald-500 z-10"></div>
                <span className="text-[10px] font-800 uppercase tracking-widest text-zinc-400">2h Ago</span>
                <p className="text-sm font-bold">Successful Orchestration</p>
                <p className="text-xs text-zinc-500">Batch processing of 'Legacy Logs' completed.</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
