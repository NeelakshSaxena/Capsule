import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl p-6',
          glass ? 'glass-card' : 'bg-white shadow-sm border border-slate-100 dark:border-slate-800 dark:bg-charcoal',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
