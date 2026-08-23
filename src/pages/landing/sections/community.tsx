import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const RESULTS = [
  {
    name: 'zainab bello',
    role: 'ML engineer · healthcare AI',
    match: 91,
    reasons: ['both interested in AI', 'shares your Machine Learning skill'],
    hue: '#287bff',
  },
  {
    name: 'grace okon',
    role: 'full-stack developer · lagos',
    match: 88,
    reasons: ['located near you', 'into generative AI'],
    hue: '#ff8a3d',
  },
  {
    name: 'priya sharma',
    role: 'robotics student',
    match: 76,
    reasons: ['also looking for mentors', 'into AI + hardware'],
    hue: '#22c55e',
  },
];

const STATS = [
  { value: '12+', label: 'searchable signals per profile' },
  { value: '1 call', label: 'per search, not per scroll' },
  { value: '3', label: 'reasons shown per match' },
  { value: '0', label: 'awkward cold opens' },
];

export function Community() {
  return (
    <section id="community" className="py-(--spacing-section-sm) md:py-(--spacing-section-md)">
      <div className="container-page grid items-center gap-9 lg:grid-cols-2">
        <div>
          <Eyebrow>
            <Sparkles size={14} className="text-link" />
            the wow feature
          </Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            search for people the way you'd describe them to a friend
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
            type "female developers around me who are into AI" and connectwiz turns that into
            structured filters, then explains every match instead of dumping a list on you.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <p className="text-3xl font-bold text-ink">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-ink-soft">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {RESULTS.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-lg border-2 border-hairline bg-paper p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: person.hue }}
                  >
                    {person.name[0].toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{person.name}</p>
                    <p className="text-xs font-semibold text-ink-soft">{person.role}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-pill bg-cloud px-3 py-1 text-xs font-bold text-link">
                  {person.match}% match
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                {person.reasons.map((reason) => (
                  <p key={reason} className="text-xs font-semibold text-ink-soft">
                    · {reason}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
