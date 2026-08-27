import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { Logo } from '@/components/ui/logo';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const LINKS = [
  { label: 'How it thinks', href: '#how-it-thinks' },
  { label: 'Try a search', href: '#live-search' },
  { label: 'What you get', href: '#features' },
  { label: 'Questions', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-(--color-hairline) bg-(--color-canvas)/95 backdrop-blur-md'
          : 'border-b border-transparent bg-(--color-canvas)/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between py-3.5" aria-label="primary">
        <Link to="/" aria-label="ConnectWiz home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-(--color-ink-soft) transition-colors duration-200 hover:text-(--color-ink)"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link to="/login" className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
            Log in
          </Link>
          <Link to="/signup" className={buttonVariants({ variant: 'primary', size: 'sm' })}>
            Get started
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-(--color-hairline) text-(--color-ink)"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-(--color-hairline) bg-(--color-canvas) lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-(--color-ink) hover:bg-(--color-cloud)"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: 'primary', className: 'w-full' }) + " py-2.5!"}
                >
                  Get started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
