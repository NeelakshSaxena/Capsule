import { Card } from '../ui/Card';

export function ProgressWidget() {
  const days = [
    { label: 'M', height: '45%', active: false },
    { label: 'T', height: '60%', active: false },
    { label: 'W', height: '35%', active: false, medium: true },
    { label: 'T', height: '90%', active: true },
    { label: 'F', height: '55%', active: false },
    { label: 'S', height: '20%', active: false },
    { label: 'S', height: '15%', active: false },
  ];

  return (
    <Card className="col-span-1 md:col-span-3 lg:col-span-5 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-lg font-bold text-charcoal dark:text-white">System Activity</h4>
          <p className="text-sm text-slate-500 font-medium">6.1h Work Time this week</p>
        </div>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide">MON-SUN</span>
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-3 px-2">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 w-full">
            <div 
              className={`w-full rounded-t-lg ${day.active ? 'bg-primary' : (day.medium ? 'bg-primary/30' : 'bg-primary/10')}`} 
              style={{ height: day.height }}
            ></div>
            <span className={`text-[10px] font-bold ${day.active ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
