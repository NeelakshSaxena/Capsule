import { useState } from 'react';
import { PlayCircle, Settings, ShieldAlert, Trash2 } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string;
  enabled: boolean;
  permissions: string[];
}

interface ModuleCardProps {
  module: Module;
  onToggle: (id: string) => void;
  onOpenSettings: (id: string) => void;
}

export function ModuleCard({ module, onToggle, onOpenSettings }: ModuleCardProps) {
  return (
    <div className={`p-5 rounded-xl border transition-all ${module.enabled ? 'border-indigo-500/50 bg-indigo-900/10' : 'border-zinc-800 bg-zinc-900/40 opacity-80'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-xl shadow-inner">
            {module.icon || '📦'}
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
              {module.name}
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">{module.version}</span>
            </h3>
            <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{module.description}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-2">
          {module.permissions?.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
              <ShieldAlert size={14} />
              <span>{module.permissions.length} Permissions</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => onOpenSettings(module.id)}
            className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
            title="Open Settings"
          >
            <Settings size={18} />
          </button>
          
          <button
            onClick={() => onToggle(module.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${module.enabled ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
          >
            <PlayCircle size={16} className={module.enabled ? 'text-indigo-200' : 'text-zinc-500'} />
            {module.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
}
