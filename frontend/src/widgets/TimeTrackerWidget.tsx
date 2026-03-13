import { Card } from '../ui/Card';

export function TimeTrackerWidget() {
  return (
    <Card className="col-span-1 md:col-span-6 lg:col-span-3 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle className="text-slate-100 dark:text-slate-800" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
          <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="150" strokeWidth="8"></circle>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-black text-charcoal dark:text-white">02:35</span>
          <div className="flex gap-2 mt-2">
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-charcoal transition-transform hover:scale-105">
              <span className="material-symbols-outlined text-sm">pause</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-transform hover:scale-105">
              <span className="material-symbols-outlined text-sm">stop</span>
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm font-bold text-slate-400 uppercase tracking-widest">Active compute time</p>
    </Card>
  );
}
