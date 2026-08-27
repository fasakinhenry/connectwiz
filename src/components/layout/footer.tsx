import { AtSign, Camera, Code2 } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const COLUMNS = [
  {
    title: 'Product',
    links: ['How it thinks', 'Try a search', 'What you get', 'Questions'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Brand kit', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'Guide to good networking', 'API docs', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Community guidelines'],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-(--color-surface-inverse) text-(--color-on-surface-inverse)">
      <div className="container-page relative pb-10 pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo tone="inverse" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--color-on-surface-inverse-soft)">
              An AI copilot for meeting people on purpose. Say who you are looking for, see why
              they fit, and take it from there.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: AtSign, label: 'X' },
                { icon: Camera, label: 'Instagram' },
                { icon: Code2, label: 'GitHub' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={`ConnectWiz on ${label}`}
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
                      className="text-sm font-medium text-(--color-on-surface-inverse-soft) transition-colors duration-200 hover:text-(--color-primary)"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-(--color-on-surface-inverse-faint) pt-8 text-xs font-medium text-(--color-on-surface-inverse-soft) opacity-70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ConnectWiz. Built for people who actually meet.</p>
          <p>No spam. No cold DMs. Just the right introductions.</p>
        </div>
      </div>
    </footer>
  );
}
