import { motion } from 'framer-motion';
import { Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';

const MOCK_RESULTS = [
  { name: 'Amara Chukwu', role: 'Frontend Engineer, AI interfaces', match: 94, seed: 'amara-chukwu' },
  { name: 'Grace Okon', role: 'Full-Stack Developer, generative AI', match: 88, seed: 'grace-okon' },
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
              <Sparkles size={14} className="text-primary" />
              AI-powered networking copilot
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-[16ch] text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:max-w-[18ch] sm:text-5xl md:max-w-none md:text-6xl"
          >
            meet the right people,
            <span className="text-link"> not just more people.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-136 text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            connectwiz is AI-powered networking that helps you discover people who actually matter
            to your goals. describe who you're looking for in plain language — we'll tell you why
            they're a match.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-start"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                get started free
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                see how it works
              </Button>
            </a>
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
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${Math.random() * 1000 + 400}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-ink-soft">
              built for builders, founders &amp; students who network on purpose
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
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">try a search</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg border-2 border-hairline-strong bg-canvas px-4 py-3.5">
              <Search size={16} className="shrink-0 text-link" />
              <p className="truncate text-sm font-semibold text-ink">
                "female developers around me who are into AI"
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {MOCK_RESULTS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                  className="flex items-center gap-3 rounded-lg border-2 border-hairline bg-canvas p-3"
                >
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${r.seed}&backgroundType=gradientLinear`}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full bg-cloud"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{r.name}</p>
                    <p className="truncate text-xs font-semibold text-ink-soft">{r.role}</p>
                  </div>
                  <span className="shrink-0 rounded-pill bg-cloud px-2.5 py-1 text-xs font-bold text-link">
                    {r.match}% match
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">
              <p className="text-sm font-semibold text-ink-soft">"both interested in AI"</p>
              <span className="rounded-pill bg-cloud px-3 py-1.5 text-xs font-bold text-link">
                why you should connect
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="absolute -left-6 -bottom-6 hidden items-center gap-2 rounded-lg border-2 border-hairline bg-canvas px-4 py-3 shadow-none md:flex"
          >
            <Sparkles size={16} className="text-link" />
            <span className="text-sm font-bold text-ink">match explained, not just found</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
