import { Card } from '../ui/Card';

export function DevicesWidget() {
  const devices = [
    { name: "MacBook Air M1", icon: "laptop_mac", status: "online" },
    { name: "Local GPU Node", icon: "developer_board", status: "online" },
    { name: "Remote Server", icon: "dns", status: "offline" }
  ];

  return (
    <Card className="col-span-1 md:col-span-3 lg:col-span-4">
      <h4 className="text-lg font-bold text-charcoal dark:text-white mb-6">Connected Nodes</h4>
      <div className="space-y-4">
        {devices.map((device, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-between p-4 bg-background-light dark:bg-charcoal/30 rounded-2xl neumorphic-inset ${device.status === 'offline' ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-charcoal dark:text-slate-300">{device.icon}</span>
              <span className="text-sm font-bold text-charcoal dark:text-white">{device.name}</span>
            </div>
            {device.status === 'online' ? (
              <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            ) : (
              <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
