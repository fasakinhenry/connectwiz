import { AtSign, Camera, Code2 } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const COLUMNS = [
  {
    title: 'product',
    links: ['how it works', 'features', 'communities', 'pricing', 'changelog'],
  },
  {
    title: 'company',
    links: ['about', 'careers', 'brand kit', 'press'],
  },
  {
    title: 'resources',
    links: ['help center', 'streak guide', 'api docs', 'status'],
  },
  {
    title: 'legal',
    links: ['privacy', 'terms', 'community guidelines'],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-(--color-surface-inverse) text-(--color-on-surface-inverse)">
      <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[99%] leading-[0]">
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="h-16 w-full md:h-24"
          aria-hidden="true"
        >
          <path
            d="M0 64C 180 10 360 0 540 24C 720 48 900 88 1080 80C 1260 72 1350 32 1440 16V96H0V64Z"
            fill="var(--color-surface-inverse)"
          />
        </svg>
      </div>

      <div className="container-page relative pb-10 pt-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo tone="inverse" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--color-on-surface-inverse-soft)">
              the social operating system for consistency. track anything, post daily, grow with
              people on the same journey.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: AtSign, label: 'x' },
                { icon: Camera, label: 'instagram' },
                { icon: Code2, label: 'github' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={`streakme on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-(--color-on-surface-inverse-faint) text-(--color-on-surface-inverse-soft) transition-colors duration-200 hover:border-(--color-primary) hover:text-(--color-primary)"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-(--color-on-surface-inverse-soft) opacity-70">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm font-semibold text-(--color-on-surface-inverse-soft) transition-colors duration-200 hover:text-(--color-primary)"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-(--color-on-surface-inverse-faint) pt-8 text-xs font-semibold text-(--color-on-surface-inverse-soft) opacity-70 sm:flex-row">
          <p>© {new Date().getFullYear()} streakme. every day counts.</p>
          <p>built for people who don't miss a day.</p>
        </div>
      </div>
    </footer>
  );
}
