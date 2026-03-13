import { Card } from '../ui/Card';

export function TaskProgressWidget() {
  return (
    <Card className="col-span-1 md:col-span-6 lg:col-span-8">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-charcoal dark:text-white">Task Execution Pipeline</h4>
        <span className="text-sm font-medium text-slate-500">Processing Job #8291</span>
      </div>
      
      <div className="flex items-center gap-2 h-12 bg-background-light dark:bg-charcoal/20 rounded-2xl p-2 neumorphic-inset">
        <div className="flex-1 h-full bg-primary/20 rounded-xl flex items-center justify-center px-4">
          <span className="text-xs font-bold text-primary">Planning</span>
        </div>
        <div className="flex-1 h-full bg-primary rounded-xl flex items-center justify-center px-4 shadow-lg shadow-primary/20">
          <span className="text-xs font-bold text-charcoal flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-charcoal rounded-full animate-ping"></span>
            Execution
          </span>
        </div>
        <div className="flex-1 h-full bg-slate-200/50 dark:bg-slate-700/50 rounded-xl flex items-center justify-center px-4">
          <span className="text-xs font-bold text-slate-400">Completed</span>
        </div>
      </div>
      
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        <div className="flex-shrink-0 bg-white/40 dark:bg-white/5 border border-primary/20 px-4 py-3 rounded-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">psychology</span>
          <div>
            <p className="text-xs font-bold text-charcoal dark:text-white">LLM Query</p>
            <p className="text-[10px] text-slate-500">GPT-4o • 42ms</p>
          </div>
        </div>
        
        <div className="flex-shrink-0 bg-white/40 dark:bg-white/5 border border-primary/20 px-4 py-3 rounded-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">database</span>
          <div>
            <p className="text-xs font-bold text-charcoal dark:text-white">Vector Search</p>
            <p className="text-[10px] text-slate-500">Pinecone • 12ms</p>
          </div>
        </div>
        
        <div className="flex-shrink-0 bg-white/40 dark:bg-white/5 border border-primary/20 px-4 py-3 rounded-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">terminal</span>
          <div>
            <p className="text-xs font-bold text-charcoal dark:text-white">Python Hook</p>
            <p className="text-[10px] text-slate-500">Lambda • 185ms</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
