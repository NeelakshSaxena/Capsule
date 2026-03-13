import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export function ProfileWidget() {
  return (
    <Card className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col items-center text-center">
      <div className="relative w-32 h-32 mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
        <img 
          className="relative w-full h-full rounded-full object-cover border-4 border-white" 
          alt="Portrait of Lora Piterson" 
          src="/assets/lora_avatar.jpg" 
        />
      </div>
      <h3 className="text-2xl font-bold text-charcoal dark:text-white">Lora Piterson</h3>
      <p className="text-slate-500 font-medium">UX/UI Designer</p>
      
      <div className="mt-6 w-full">
        <ProgressBar value={84} label="Compute Usage" />
      </div>
    </Card>
  );
}
