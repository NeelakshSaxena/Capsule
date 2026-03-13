import { Card } from '../ui/Card';

export function ProfileWidget() {
  return (
    <Card className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col items-center text-center justify-center">
      <div className="relative w-32 h-32 mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
        <img
          className="relative w-full h-full rounded-full object-cover border-4 border-white"
          alt="Portrait of Neelaksh Saxena"
          src="/assets/user_avatar.png"
        />
      </div>
      <h3 className="text-2xl font-bold text-charcoal dark:text-white">Neelaksh Saxena</h3>
      <p className="text-slate-500 font-medium">System Architect</p>
    </Card>
  );
}
