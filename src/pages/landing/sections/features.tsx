import { motion } from 'framer-motion';
import { Flame, Users, Camera, Sparkles, BarChart3, MessageCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const FEATURES = [
  {
    icon: Flame,
    title: 'streak tracking',
    body: 'track anything: gym, code, reading, sobriety, sales calls. one tap a day keeps the flame alive.',
  },
  {
    icon: Camera,
    title: 'daily progress posts',
    body: 'share a photo, note, or metric every day. your feed becomes a living record of who you\'re becoming.',
  },
  {
    icon: Users,
    title: 'accountability circles',
    body: 'join small groups of people chasing the same goal. miss a day and your circle notices.',
  },
  {
    icon: MessageCircle,
    title: 'community chat',
    body: 'every streak has a home — react, reply, and cheer each other on in real time.',
  },
  {
    icon: BarChart3,
    title: 'contribution heatmaps',
    body: 'watch your consistency compound into a visual history you\'ll want to protect.',
  },
  {
    icon: Sparkles,
    title: 'ai-powered discovery',
    body: 'get matched with people on the same journey, based on what you\'re building and how you talk about it.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>the platform</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            everything a streak needs to survive
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            duolingo made you afraid to lose your streak. streakme gives you a community that
            won't let you.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="rounded-lg border-2 border-hairline bg-canvas p-7 transition-colors duration-200 hover:border-link"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cloud text-link">
                <feature.icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
