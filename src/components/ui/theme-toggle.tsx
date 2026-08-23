import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-hairline text-ink-soft transition-colors duration-200 hover:border-link hover:text-link"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
