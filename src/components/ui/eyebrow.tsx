import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border-2 border-hairline bg-cloud px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-link',
        className
      )}
    >
      {children}
    </span>
  );
}
