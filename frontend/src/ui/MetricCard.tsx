
import type { HTMLAttributes } from 'react';
import { Card } from './Card';
import { cn } from '../lib/utils';

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  highlight?: boolean;
}

export function MetricCard({ title, value, highlight, className, ...props }: MetricCardProps) {
  return (
    <Card className={cn('p-4 rounded-2xl min-w-[140px]', className)} {...props}>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <p className={cn("text-2xl font-black mt-1", highlight ? "text-primary" : "text-charcoal dark:text-white")}>
        {value}
      </p>
    </Card>
  );
}
