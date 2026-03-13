import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  badge?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, badge, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'p-2.5 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-primary/20 transition-all text-slate-700 dark:text-slate-200 relative',
          className
        )}
        {...props}
      >
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
        {badge && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
        )}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
