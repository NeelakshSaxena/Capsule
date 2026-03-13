import { Card } from '../ui/Card';

export function TimelineWidget() {
  return (
    <Card className="col-span-1 md:col-span-6 lg:col-span-4">
      <h4 className="text-lg font-bold text-charcoal dark:text-white mb-4">Weekly Roadmap</h4>
      <div className="space-y-4">
        
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-charcoal dark:text-white">MON</span>
            <div className="w-0.5 h-12 bg-primary/20 my-1"></div>
          </div>
          <div className="flex-1">
            <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-r-xl">
              <p className="text-xs font-bold text-charcoal dark:text-white">Agent Run: Health Audit</p>
              <p className="text-[10px] text-slate-500 mt-1">Scheduled: 09:00 AM</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-300 dark:text-slate-600">TUE</span>
            <div className="w-0.5 h-12 bg-primary/20 my-1"></div>
          </div>
          <div className="flex-1">
            <div className="bg-slate-100/50 dark:bg-slate-800/50 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
              <p className="text-xs font-bold text-slate-400">Memory Indexing</p>
              <p className="text-[10px] text-slate-500 mt-1">Auto-sync active</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-300 dark:text-slate-600">WED</span>
          </div>
          <div className="flex-1">
            <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-r-xl">
              <p className="text-xs font-bold text-charcoal dark:text-white">Model Re-training</p>
              <p className="text-[10px] text-slate-500 mt-1">Dataset v2.4</p>
            </div>
          </div>
        </div>
        
      </div>
    </Card>
  );
}
