import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';

const WEEKS = 18;
const DAYS = 7;

function seededIntensity(w: number, d: number) {
  const n = Math.sin(w * 12.9898 + d * 78.233) * 43758.5453;
  const frac = n - Math.floor(n);
  return Math.floor(frac * 5);
}

const LEVEL_VARS = [
  'var(--color-hairline)',
  'color-mix(in oklab, var(--color-primary) 30%, var(--color-hairline))',
  'color-mix(in oklab, var(--color-primary) 55%, var(--color-hairline))',
  'color-mix(in oklab, var(--color-primary) 80%, var(--color-hairline))',
  'var(--color-primary)',
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-15 md:pb-12 md:pt-8">
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-130 w-130 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--color-primary)' }}
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>
              <Flame size={14} className="text-flame" />
              23,481 streaks alive right now
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-[15ch] text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:max-w-[16ch] sm:text-5xl md:max-w-none md:text-6xl"
          >
            track anything. show up daily.
            <span className="text-link"> never break the chain.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-136 text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            streakme is the social streak platform where people build consistency together. post your progress, find your people, and let your streak do the talking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-start"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              start your streak free
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              see how it works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <div className="flex -space-x-3">
              {['#287bff', '#ff8a3d', '#22c55e', '#a855f7'].map((c) => (
                <div
                  key={c}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-canvas transition-transform duration-200 hover:scale-110"
                  style={{ background: c }}
                >
                  <img
                    src={`https://api.dicebear.com/10.x/lorelei/svg?seed=${Math.random() * 1000 + 400}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-ink-soft">
              joined by builders, students &amp; creators worldwide
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-xl lg:mx-0"
        >
          <div className="rounded-lg border-2 border-hairline bg-paper p-5 shadow-none sm:p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  your streak
                </p>
                <p className="mt-1 flex items-center gap-2 text-3xl font-bold text-ink">
                  <Flame className="text-flame" size={26} fill="var(--color-flame)" />
                  128 days
                </p>
              </div>
              <span className="rounded-pill bg-cloud px-3 py-1.5 text-xs font-bold text-link">
                top 2% this week
              </span>
            </div>

            <div className="mt-6 grid grid-flow-col grid-rows-7 gap-1.5">
              {Array.from({ length: WEEKS }).map((_, w) =>
                Array.from({ length: DAYS }).map((_, d) => {
                  const level = seededIntensity(w, d);
                  const delay = (w * DAYS + d) * 0.006;
                  return (
                    <motion.span
                      key={`${w}-${d}`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.4 + delay }}
                      className="h-3 w-3 rounded-[3px] md:h-3.5 md:w-3.5"
                      style={{ background: LEVEL_VARS[level] }}
                    />
                  );
                })
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-hairline pt-5">
              <p className="text-sm font-semibold text-ink-soft">
                "84 people cheered your streak today"
              </p>
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-paper bg-primary"
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -left-6 -bottom-6 hidden items-center gap-2 rounded-lg border-2 border-hairline bg-canvas px-4 py-3 shadow-none md:flex"
          >
            <Flame size={16} className="text-flame" fill="var(--color-flame)" />
            <span className="text-sm font-bold text-ink">streak saved!</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
