import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  /** 'auto' follows the page's ink color. 'inverse' is for permanently-dark
   *  surfaces (footer, promo CTA) where the wordmark must always render white. */
  tone?: 'auto' | 'inverse';
  size?: number;
}

/**
 * The streakme mark: a flame built from an ascending staircase of bars —
 * reading simultaneously as fire (momentum, heat, "don't break the streak")
 * and as an upward contribution graph (the GitHub-heatmap DNA of the product).
 * This is the single source of truth for the mark — every surface (navbar,
 * footer, CTA, favicon) renders this exact same SVG so the brand never drifts.
 */
export function Logo({ className, withWordmark = true, tone = 'auto', size = 32 }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="6" y="30" width="7" height="12" rx="2.5" fill="var(--color-flame)" />
        <rect x="15" y="22" width="7" height="20" rx="2.5" fill="var(--color-flame)" />
        <rect x="24" y="13" width="7" height="29" rx="2.5" fill="var(--color-flame-deep)" />
        <path
          d="M35.5 8c1.8 3.4-.4 5.6-1.9 7.4-1.6 1.9-2.7 3.7-1.3 6.4 1 1.9 3 2.9 5 2.6 3-.5 5.2-3.4 4.9-6.9-.4-4.6-3.9-8-6.7-9.5Z"
          fill="var(--color-primary)"
        />
      </svg>
      {withWordmark && (
        <span
          className={cn(
            'text-xl font-bold tracking-tight',
            tone === 'inverse' ? 'text-(--color-on-surface-inverse)' : 'text-(--color-ink)'
          )}
        >
          streak<span className="text-(--color-primary)">me</span>
        </span>
      )}
    </span>
  );
}
