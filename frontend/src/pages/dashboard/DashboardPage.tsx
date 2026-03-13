import { MetricCard } from '../../ui/MetricCard';
import { ProfileWidget } from '../../widgets/ProfileWidget';
import { ProgressWidget } from '../../widgets/ProgressWidget';
import { TimeTrackerWidget } from '../../widgets/TimeTrackerWidget';
import { TaskProgressWidget } from '../../widgets/TaskProgressWidget';
import { TimelineWidget } from '../../widgets/TimelineWidget';
import { ActivityFeedWidget } from '../../widgets/ActivityFeedWidget';
import { DevicesWidget } from '../../widgets/DevicesWidget';
import { ResourcesWidget } from '../../widgets/ResourcesWidget';

export function DashboardPage() {
  return (
    <>
      {/* Hero Welcome & Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-charcoal dark:text-white tracking-tight">Welcome back, Neelaksh</h1>
          <p className="text-slate-500 mt-2 font-medium">System overview and orchestration metrics for today.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
          <MetricCard title="Active Agents" value={12} />
          <MetricCard title="Modules" value={24} />
          <MetricCard title="Models" value={8} />
          <MetricCard title="Running" value={5} highlight />
        </div>
      </div>

      {/* 12-Column Grid Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        <ProfileWidget />
        <ProgressWidget />
        <TimeTrackerWidget />
        
        <TaskProgressWidget />
        <TimelineWidget />
        
        <ActivityFeedWidget />
        <DevicesWidget />
        <ResourcesWidget />
      </div>
    </>
  );
}
