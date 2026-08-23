import { motion } from 'framer-motion';
import { Flame, Heart, MessageCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const POSTS = [
  { name: 'amara', streak: 214, habit: 'strength training', hue: '#287bff' },
  { name: 'kunle', streak: 62, habit: 'daily leetcode', hue: '#ff8a3d' },
  { name: 'jordan', streak: 349, habit: '5am mile', hue: '#22c55e' },
];

const STATS = [
  { value: '1.2M+', label: 'streaks tracked' },
  { value: '340K', label: 'daily check-ins' },
  { value: '18K', label: 'active circles' },
  { value: '92%', label: '30-day retention' },
];

export function Community() {
  return (
    <section id="community" className="py-(--spacing-section-sm) md:py-(--spacing-section-md)">
      <div className="container-page grid items-center gap-9 lg:grid-cols-2">
        <div>
          <Eyebrow>the community</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            your feed, but everyone's actually consistent
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
            no highlight reels. just daily proof of real people, real reps, real days logged.
            react, reply, and keep each other honest.
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
          {POSTS.map((post, i) => (
            <motion.div
              key={post.name}
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
                    style={{ background: post.hue }}
                  >
                    {post.name[0].toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{post.name}</p>
                    <p className="text-xs font-semibold text-ink-soft">{post.habit}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-pill bg-cloud px-3 py-1 text-xs font-bold text-link">
                  <Flame size={12} fill="var(--color-flame)" className="text-flame" />
                  {post.streak}
                </span>
              </div>
              <div className="mt-4 h-28 w-full rounded-md bg-cloud" />
              <div className="mt-4 flex items-center gap-5 text-ink-soft">
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  <Heart size={14} /> 48
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  <MessageCircle size={14} /> 12
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
