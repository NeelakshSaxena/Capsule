import { Card } from '../ui/Card';

export function ActivityFeedWidget() {
  const activities = [
    {
      title: "Health data indexed",
      time: "Just now • Source: Wearable API",
      icon: "monitor_heart",
      colorClass: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      title: "Memory extracted",
      time: "14 mins ago • Context: Meeting",
      icon: "psychology",
      colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      title: "Rate limit warning",
      time: "1 hour ago • Anthropic API",
      icon: "warning",
      colorClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
      title: "Deployment success",
      time: "2 hours ago • Local Node",
      icon: "check_circle",
      colorClass: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
    }
  ];

  return (
    <Card className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-charcoal dark:text-white">Recent Activity</h4>
        <button className="text-primary text-xs font-bold hover:underline">View All</button>
      </div>
      
      <div className="space-y-6 flex-1">
        {activities.map((act, i) => (
          <div key={i} className="flex gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.colorClass}`}>
              <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-charcoal dark:text-white">{act.title}</p>
              <p className="text-[11px] text-slate-500 font-medium">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
