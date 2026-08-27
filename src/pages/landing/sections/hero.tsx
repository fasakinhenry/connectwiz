import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';

const MATCH_REASONS = ['Both interested in AI', 'Building in the same space', 'Based near you'];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 md:pb-20 md:pt-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-40"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="min-w-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow>
              <Sparkles size={13} />
              Networking, rebuilt around AI
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display mt-6 text-balance text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            Meet the right people.
            <br />
            <span className="italic text-primary">Not just more people.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-7 max-w-125 text-lg leading-relaxed text-ink-soft"
          >
            Tell ConnectWiz who you are looking for in your own words. It reads the intent, finds
            real matches nearby or anywhere, and tells you exactly why each one fits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-start"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Get started free
              </Button>
            </Link>
            <a href="#how-it-thinks" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full gap-2 sm:w-auto">
                See how it thinks
                <ArrowRight size={16} />
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 text-sm font-medium text-ink-soft"
          >
            Free to start. No credit card. Works whether or not you ever type an AI key in.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto"
        >
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-hairline sm:translate-x-4 sm:translate-y-4"
            aria-hidden="true"
          />
          <div className="relative rounded-lg border-2 border-hairline bg-canvas p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              You searched
            </p>
            <p className="font-display mt-2 text-lg leading-snug text-ink">
              &ldquo;Founders in AI who might want to collaborate&rdquo;
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-6">
              <img
                src="https://api.dicebear.com/9.x/adventurer/svg?seed=jordan-lee&backgroundType=gradientLinear"
                alt=""
                className="h-12 w-12 shrink-0 rounded-full bg-cloud"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">Jordan Lee</p>
                <p className="truncate text-sm text-ink-soft">Founder building developer tools</p>
              </div>
              <span className="shrink-0 rounded-pill bg-cloud px-2.5 py-1 text-xs font-bold text-link">
                91%
              </span>
            </div>

            <ul className="mt-4 flex flex-col gap-1.5">
              {MATCH_REASONS.map((reason) => (
                <li key={reason} className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {reason}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-md bg-cloud px-3 py-2.5 text-xs font-semibold text-link">
              This is why you should connect, not just a name and a face.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
