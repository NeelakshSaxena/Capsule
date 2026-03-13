import { useTheme } from '../theme/ThemeProvider';
import { IconButton } from './IconButton';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // Decide which icon to show based on current theme, treating system as whichever is active
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <IconButton
      icon={isDark ? "light_mode" : "dark_mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    />
  );
}
