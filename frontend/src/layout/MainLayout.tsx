import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="layout-container flex h-full grow flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-8">
        {children}
      </main>
      <footer className="p-10 border-t border-primary/10 text-center">
        <p className="text-slate-400 text-sm font-medium">© 2026 Capsule Orchestration. All systems operational.</p>
      </footer>
    </div>
  );
}
