import { motion } from 'framer-motion';
import { MessageSquare, Search, Users, Sparkles, CalendarDays, Trophy } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'conversational onboarding',
    body: 'no boring forms. tell an AI chat about your skills, interests, and goals, and it builds your networking profile for you.',
  },
  {
    icon: Search,
    title: 'natural-language search',
    body: 'search like you talk. "product designers in lagos into AI" — connectwiz interprets the intent and finds the people who fit.',
  },
  {
    icon: Sparkles,
    title: '"why you should connect"',
    body: 'every match comes with plain-language reasons — shared skills, interests, goals, or location — so you know why before you say hi.',
  },
  {
    icon: Users,
    title: 'connections that go somewhere',
    body: 'connect, get a conversation starter, and message — all in one flow. no more staring at a blank chat box.',
  },
  {
    icon: CalendarDays,
    title: 'events & communities',
    body: 'see who you might want to meet at an event before you show up, and join communities built around what you actually care about.',
  },
  {
    icon: Trophy,
    title: 'a streak that means something',
    body: 'build a networking habit with streaks, daily missions, and XP — for meeting people, not just opening the app.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>the platform</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            everything networking needs to stop feeling hectic
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            not a directory. not a swipe deck. an AI copilot for the whole loop — discover,
            understand, approach, connect, and stay in touch.
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
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
