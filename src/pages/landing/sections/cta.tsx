import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="px-4 pb-6 pt-2 md:px-6">
      <div className="container-page overflow-hidden rounded-lg bg-(--color-surface-inverse) text-(--color-on-surface-inverse)">
        <div className="grid gap-10 px-6 py-14 md:grid-cols-[1.3fr_0.7fr] md:px-12 md:py-18">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              Your next collaborator is one search away.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-(--color-on-surface-inverse-soft)">
              No credit card. A conversation builds your profile, and a search box that actually
              understands what you mean does the rest.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get started free
                </Button>
              </Link>
              <a href="#faq">
                <Button
                  variant="tertiary"
                  size="lg"
                  className="w-full border-(--color-on-surface-inverse-faint) text-(--color-on-surface-inverse-soft) hover:text-(--color-on-surface-inverse) sm:w-auto"
                >
                  Read the FAQ
                  <ArrowRight size={16} />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center gap-3 rounded-lg border-2 border-(--color-on-surface-inverse-faint) p-6"
          >
            <div className="flex items-center gap-2 text-(--color-flame)">
              <Flame size={18} fill="var(--color-flame)" />
              <span className="font-display text-2xl font-medium text-(--color-on-surface-inverse)">7 days</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-on-surface-inverse-soft)">
              Networking streak
            </p>
            <div className="mt-2 border-t border-(--color-on-surface-inverse-faint) pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--color-on-surface-inverse-soft)">
                Today&rsquo;s mission
              </p>
              <p className="mt-1.5 text-sm text-(--color-on-surface-inverse-soft)">
                Connect with someone who has a skill you want to learn.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
