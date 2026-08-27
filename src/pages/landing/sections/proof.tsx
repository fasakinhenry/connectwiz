import { motion } from 'framer-motion';

const STATS = [
  { value: '1', label: 'AI call per search, not one per scroll' },
  { value: '3', label: 'reasons shown on every single match' },
  { value: '6', label: 'stages in the loop, discover to maintain' },
  { value: '0', label: 'forms to fill out during onboarding' },
];

export function Proof() {
  return (
    <section className="border-y border-hairline py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-balance text-3xl font-medium leading-snug tracking-tight text-ink md:text-4xl">
              Built to work honestly, not to look busy.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              No inflated counters, no fake activity. Every AI feature also has a deterministic
              fallback, so a missing API key never breaks a single screen.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-l-2 border-hairline pl-4"
              >
                <p className="font-display text-4xl font-medium text-ink">{stat.value}</p>
                <p className="mt-1.5 text-sm leading-snug text-ink-soft">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
