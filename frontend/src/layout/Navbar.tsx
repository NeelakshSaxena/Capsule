import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '../ui/IconButton';
import { ThemeToggle } from '../ui/ThemeToggle';

const TABS = [
  { name: 'Dashboard', path: '/' },
  { name: 'Agents', path: '/agents' },
  { name: 'Modules', path: '/modules' },
  { name: 'Tools', path: '/tools' },
  { name: 'Memory', path: '/memory' },
  { name: 'Models', path: '/models' },
  { name: 'Users', path: '/users' },
  { name: 'Permissions', path: '/permissions' },
  { name: 'Logs', path: '/logs' },
  { name: 'Settings', path: '/settings' }
];

export function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl text-charcoal flex items-center justify-center">
          <span className="material-symbols-outlined block">auto_awesome</span>
        </div>
        <h2 className="text-charcoal dark:text-white text-xl font-bold tracking-tight">Capsule</h2>
      </div>

      <nav className="hidden lg:flex items-center bg-white/50 dark:bg-white/5 p-1 rounded-full border border-primary/10">
        {TABS.map((tab) => {
          const isActive = currentPath === tab.path || (currentPath.startsWith('/agents') && tab.name === 'Agents');
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
                isActive
                  ? 'bg-charcoal text-white dark:bg-primary dark:text-charcoal'
                  : 'font-medium text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <IconButton icon="settings" />
        <IconButton icon="notifications" badge />
        <div className="w-10 h-10 rounded-xl bg-primary/20 border-2 border-primary/40 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="User profile avatar of Neelaksh"
            src="/assets/user_avatar.png"
          />
        </div>
      </div>
    </header>
  );
}
