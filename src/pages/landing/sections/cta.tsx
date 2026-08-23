import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="px-4 pb-6 pt-2 md:px-6">
      <div className="container-page relative overflow-hidden rounded-lg bg-[#10182b] px-6 py-16 text-center text-white md:px-12 md:py-24">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'var(--color-flame)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10"
        >
          <Flame size={30} className="text-flame" fill="var(--color-flame)" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto mt-6 max-w-2xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl"
        >
          your streak starts the moment you stop scrolling
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="relative mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/70"
        >
          day one feels small. day one hundred feels like a different person. join free. no
          credit card, just a reason to show up tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button variant="primary" size="lg">
            start your streak now
          </Button>
          <Button variant="tertiary" size="lg" className="text-white/70 hover:text-white">
            explore communities
          </Button>
        </motion.div>

        <p className="relative mt-6 text-xs font-semibold uppercase tracking-wider text-white/40">
          join 23,481 people already on a streak today
        </p>
      </div>
    </section>
  );
}
