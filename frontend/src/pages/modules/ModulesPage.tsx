import { useState, useEffect } from 'react';
import { Plus, RefreshCw, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../../components/module/ModuleCard';
import { ModuleInstaller } from '../../components/module/ModuleInstaller';

export function ModulesPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInstaller, setShowInstaller] = useState(false);
  const navigate = useNavigate();

  const fetchModules = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/modules');
      if (res.ok) {
        const data = await res.json();
        setModules(data);
      }
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleToggle = async (moduleId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/modules/${moduleId}/toggle`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setModules(prev => prev.map(m => m.id === moduleId ? { ...m, enabled: data.enabled } : m));
      }
    } catch (error) {
      console.error('Failed to toggle module:', error);
    }
  };

  const handleOpenSettings = (moduleId: string) => {
    navigate(`/modules/${moduleId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 pt-24 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-zinc-100 flex items-center gap-3">
            <Box className="w-8 h-8 text-indigo-500" />
            Modules
          </h1>
          <p className="text-zinc-400 mt-2">Manage Capsule apps, plugins, and extensions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchModules}
            className="p-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-800"
            title="Refresh Modules"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => setShowInstaller(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
          >
            <Plus size={20} />
            Add Module
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full h-64 flex items-center justify-center">
            <RefreshCw className="animate-spin text-zinc-500 w-8 h-8" />
          </div>
        ) : modules.length === 0 ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/50">
            <Box className="w-12 h-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-semibold text-zinc-300">No modules installed</h3>
            <p className="text-zinc-500 mt-2 text-center max-w-sm">
              Enhance Capsule by installing community modules or creating your own.
            </p>
          </div>
        ) : (
          modules.map(mod => (
            <ModuleCard 
              key={mod.id} 
              module={mod} 
              onToggle={handleToggle} 
              onOpenSettings={handleOpenSettings} 
            />
          ))
        )}
      </div>

      {showInstaller && (
        <ModuleInstaller 
          onClose={() => setShowInstaller(false)} 
          onSuccess={fetchModules} 
        />
      )}
    </div>
  );
}
