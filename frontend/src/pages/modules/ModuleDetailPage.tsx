import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, PlayCircle, Trash2, ArrowLeft, Save, ShieldAlert, Loader2 } from 'lucide-react';

export function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<any>(null);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uninstalling, setUninstalling] = useState(false);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/modules/${id}`);
        if (res.ok) {
          const data = await res.json();
          setModule(data);
          setSettings(data.settings || {});
        } else {
          navigate('/modules');
        }
      } catch (err) {
        console.error("Failed to load module Details", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchModule();
  }, [id, navigate]);

  const handleToggle = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/modules/${id}/toggle`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setModule((prev: any) => ({ ...prev, enabled: data.enabled }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await fetch(`http://localhost:8000/api/modules/${id}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleUninstall = async () => {
    if (!window.confirm("Are you sure you want to uninstall this module?")) return;
    setUninstalling(true);
    try {
      const res = await fetch(`http://localhost:8000/api/modules/${id}`, { method: 'DELETE' });
      if (res.ok) navigate('/modules');
    } catch (err) {
      console.error(err);
    } finally {
      setUninstalling(false);
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center pt-24">
      <Loader2 className="animate-spin text-zinc-500 w-8 h-8" />
    </div>
  );

  if (!module) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 pt-24 h-full overflow-y-auto">
      <button 
        onClick={() => navigate('/modules')}
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Modules
      </button>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8 flex items-start justify-between">
        <div className="flex gap-6">
          <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-zinc-700">
            {module.icon || '📦'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
              {module.name}
              <span className="text-sm bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full font-mono font-medium">{module.version}</span>
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">{module.description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-end">
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-colors ${
              module.enabled 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]' 
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
            }`}
          >
            <PlayCircle size={18} className={module.enabled ? 'fill-indigo-400/30' : ''} />
            {module.enabled ? 'Enabled' : 'Disabled'}
          </button>

          <button
            onClick={handleUninstall}
            disabled={uninstalling}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-medium"
          >
            {uninstalling ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Uninstall
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                <Box size={18} className="text-indigo-400" /> Settings
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {Object.keys(module.settings_schema || {}).length === 0 ? (
                <div className="text-zinc-500 italic">No settings available for this module.</div>
              ) : (
                Object.entries(module.settings_schema).map(([key, schema]: [string, any]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-zinc-300 mb-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    {schema.type === 'string' && (
                      <input 
                        type="text" 
                        value={settings[key] || ''}
                        onChange={(e) => setSettings({...settings, [key]: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder={schema.default || ''}
                      />
                    )}
                    {schema.type === 'boolean' && (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={settings[key] || false}
                            onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-indigo-500 transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </div>
                        <span className="text-sm text-zinc-400">{settings[key] ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    )}
                     {schema.type === 'number' && (
                      <input 
                        type="number" 
                        value={settings[key] || 0}
                        onChange={(e) => setSettings({...settings, [key]: Number(e.target.value)})}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    )}
                    {schema.description && <p className="text-xs text-zinc-500 mt-2">{schema.description}</p>}
                  </div>
                ))
              )}
              
              {Object.keys(module.settings_schema || {}).length > 0 && (
                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                  <button 
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
              <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                <ShieldAlert size={18} className="text-amber-500" /> Permissions
              </h2>
            </div>
            <div className="p-6">
              {module.permissions?.length === 0 ? (
                <div className="text-zinc-500 text-sm">This module requests no special permissions.</div>
              ) : (
                <ul className="space-y-3">
                  {module.permissions?.map((perm: string) => (
                    <li key={perm} className="flex items-start gap-3 text-sm text-zinc-300">
                      <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-amber-500/50" />
                      <span className="font-mono text-amber-500/80">{perm}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
