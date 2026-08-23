import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface AuthShellProps {
  title: string;
  switchLabel: string;
  switchTo: string;
  switchCta: string;
  children: ReactNode;
}

export function AuthShell({ title, switchLabel, switchTo, switchCta, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-canvas)">
      <header className="flex items-center justify-between px-4 py-5 sm:px-5 md:px-8">
        <Link
          to="/"
          aria-label="close and return home"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--color-ink-soft) transition-colors duration-200 hover:bg-(--color-cloud) hover:text-(--color-ink)"
        >
          <X size={22} />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <span className="hidden text-sm font-semibold text-(--color-ink-soft) sm:inline">
            {switchLabel}
          </span>
          <Link
            to={switchTo}
            className="text-sm font-bold uppercase tracking-wide text-(--color-link) transition-colors duration-200 hover:text-(--color-primary-deep)"
          >
            {switchCta}
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-6 sm:px-5 md:items-center md:pt-0">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 flex flex-col items-center text-center md:hidden">
            <Logo withWordmark={false} size={40} />
          </div>

          <h1 className="text-center text-3xl font-bold tracking-tight text-balance text-(--color-ink)">
            {title}
          </h1>

          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
