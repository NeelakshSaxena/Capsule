import { IconButton } from '../ui/IconButton';
import { ThemeToggle } from '../ui/ThemeToggle';

const TABS = [
  'Dashboard', 'Agents', 'Modules', 'Tools', 'Memory', 
  'Models', 'Users', 'Permissions', 'Logs', 'Settings'
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl text-charcoal flex items-center justify-center">
          <span className="material-symbols-outlined block">auto_awesome</span>
        </div>
        <h2 className="text-charcoal dark:text-white text-xl font-bold tracking-tight">Capsule</h2>
      </div>

      <nav className="hidden lg:flex items-center bg-white/50 dark:bg-white/5 p-1 rounded-full border border-primary/10">
        {TABS.map((tab, idx) => (
          <a
            key={tab}
            href="#"
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
              idx === 0 
                ? 'bg-charcoal text-white dark:bg-primary dark:text-charcoal' 
                : 'font-medium text-slate-600 dark:text-slate-400 hover:text-primary'
            }`}
          >
            {tab}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <IconButton icon="settings" />
        <IconButton icon="notifications" badge />
        <div className="w-10 h-10 rounded-xl bg-primary/20 border-2 border-primary/40 overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            alt="User profile avatar of Neelaksh" 
            src="/assets/neelaksh_avatar.jpg" 
          />
        </div>
      </div>
    </header>
  );
}
