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
 * The ConnectWiz mark: a rounded badge holding two people (dots) joined by a
 * single travelling line that ends in a small spark, the AI reading the
 * connection and pointing it out. One flat fill, no gradient, reads clearly
 * at favicon size.
 */
export function Logo({ className, withWordmark = true, tone = 'auto', size = 32 }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="38" height="38" rx="11" fill="var(--color-primary)" />
        <path
          d="M12 26 C12 20, 18 20, 21 15"
          stroke="var(--color-on-primary)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="12" cy="26" r="4" fill="var(--color-on-primary)" />
        <circle cx="23" cy="13" r="4.5" fill="var(--color-on-primary)" />
        <circle cx="30.5" cy="9.5" r="2.2" fill="var(--color-flame)" />
      </svg>
      {withWordmark && (
        <span
          className={cn(
            'font-display text-xl font-semibold tracking-tight',
            tone === 'inverse' ? 'text-(--color-on-surface-inverse)' : 'text-(--color-ink)'
          )}
        >
          Connect<span className="italic text-(--color-primary)">Wiz</span>
        </span>
      )}
    </span>
  );
}
