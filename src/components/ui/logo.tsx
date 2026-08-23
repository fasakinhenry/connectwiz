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
 * The ConnectWiz mark: three nodes joined by lines — a small network graph
 * that reads as "people, connected." Every surface (navbar, footer, CTA,
 * favicon) renders this exact same SVG so the brand never drifts.
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
        <path
          d="M14 30 L24 14 L36 20"
          stroke="var(--color-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M14 30 L36 34"
          stroke="var(--color-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="24" cy="14" r="6" fill="var(--color-primary-deep)" />
        <circle cx="36" cy="20" r="6" fill="var(--color-primary)" />
        <circle cx="14" cy="30" r="6" fill="var(--color-primary)" />
        <circle cx="36" cy="34" r="6" fill="var(--color-flame)" />
      </svg>
      {withWordmark && (
        <span
          className={cn(
            'text-xl font-bold tracking-tight',
            tone === 'inverse' ? 'text-(--color-on-surface-inverse)' : 'text-(--color-ink)'
          )}
        >
          connect<span className="text-(--color-primary)">wiz</span>
        </span>
      )}
    </span>
  );
}
