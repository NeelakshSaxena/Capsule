import { useState } from 'react';
import { UploadCloud, Github, Folder, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ModuleInstallerProps {
  onClose: () => void;
  onSuccess: () => void;
}

type TabMode = 'zip' | 'git' | 'folder';

export function ModuleInstaller({ onClose, onSuccess }: ModuleInstallerProps) {
  const [activeTab, setActiveTab] = useState<TabMode>('zip');
  const [isInstalling, setIsInstalling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  
  // Future implementations can use these states for Git/Folder path inputs
  const [gitUrl, setGitUrl] = useState('');
  const [folderPath, setFolderPath] = useState('');

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleInstall = async () => {
    setError(null);
    setSuccess(false);
    setLogs([]);
    setIsInstalling(true);

    try {
      if (activeTab === 'zip') {
        if (!file) {
          throw new Error("Please select a ZIP file first.");
        }
        addLog("Validating ZIP archive...");
        const formData = new FormData();
        formData.append("file", file);

        addLog("Uploading and extracting to temporary directory...");
        const res = await fetch('http://localhost:8000/api/modules/install', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Installation failed");
        }
        
        addLog("Validating plugin.json schema...");
        addLog("Moving module to target directory...");
        addLog("Installation completed successfully!");
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        throw new Error(`${activeTab.toUpperCase()} installation is not implemented yet.`);
      }
    } catch (err: any) {
      setError(err.message);
      addLog(`ERROR: ${err.message}`);
    } finally {
      setIsInstalling(false);
    }
  };

  const tabs: {id: TabMode, label: string, icon: any}[] = [
    { id: 'zip', label: 'Upload ZIP', icon: UploadCloud },
    { id: 'git', label: 'Git Repo', icon: Github },
    { id: 'folder', label: 'Local Folder', icon: Folder },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <UploadCloud className="text-indigo-400" />
            Install Module
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id 
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'zip' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Select ZIP Archive</label>
              <div className="border-2 border-dashed border-zinc-700 hover:border-indigo-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-zinc-900/50">
                <input 
                  type="file" 
                  accept=".zip"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden" 
                  id="zip-upload"
                />
                <label htmlFor="zip-upload" className="cursor-pointer flex flex-col items-center">
                  <UploadCloud size={48} className={`mb-4 ${file ? 'text-indigo-500' : 'text-zinc-600'}`} />
                  {file ? (
                    <span className="text-zinc-200 font-medium">{file.name}</span>
                  ) : (
                    <>
                      <span className="text-zinc-300 font-medium">Click to upload or drag and drop</span>
                      <span className="text-zinc-500 text-sm mt-1">.zip files only</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          )}

          {activeTab === 'git' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Git Repository URL</label>
              <input 
                type="text" 
                placeholder="https://github.com/user/repo.git"
                value={gitUrl}
                onChange={e => setGitUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          {activeTab === 'folder' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Absolute Path to Local Folder</label>
              <input 
                type="text" 
                placeholder="/home/user/my-capsule-module"
                value={folderPath}
                onChange={e => setFolderPath(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          {/* Installation Logs console */}
          <div className="mt-8 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-500">
              Installation Output
            </div>
            <div className="p-4 h-32 overflow-y-auto font-mono text-sm">
              {logs.length === 0 && <span className="text-zinc-600">Waiting to start...</span>}
              {logs.map((log, i) => (
                <div key={i} className={`${log.startsWith('ERROR') ? 'text-red-400' : 'text-zinc-300'} mb-1`}>
                  <span className="text-zinc-600 mr-2">{'>'}</span>{log}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900 flex justify-between items-center">
          <div className="flex-1">
             {error && (
               <div className="flex items-center gap-2 text-red-400 text-sm">
                 <AlertCircle size={16} />
                 {error}
               </div>
             )}
             {success && (
               <div className="flex items-center gap-2 text-green-400 text-sm">
                 <CheckCircle size={16} />
                 Module installed successfully!
               </div>
             )}
          </div>
          
          <button
            onClick={handleInstall}
            disabled={isInstalling || (activeTab === 'zip' && !file)}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInstalling && <Loader2 size={18} className="animate-spin" />}
            {isInstalling ? 'Installing...' : 'Install Module'}
          </button>
        </div>
      </div>
    </div>
  );
}
