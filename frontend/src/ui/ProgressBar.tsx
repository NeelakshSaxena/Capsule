
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  label?: string;
}

export function ProgressBar({ value, label, className, ...props }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-background-light dark:bg-charcoal/30 rounded-2xl p-4 neumorphic-inset", className)} {...props}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{label}</span>
        <span className="text-sm font-black text-primary">{Math.max(0, Math.min(100, value))}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
