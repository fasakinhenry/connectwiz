import { motion } from 'framer-motion';
import { MessagesSquare, Users, Calendar, Flame, MapPin, ShieldCheck } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const FEATURES = [
  {
    icon: MessagesSquare,
    title: 'A conversation, not a form',
    body: 'Onboarding is a chat. Answer naturally, get a follow-up on anything vague, review the profile before it saves.',
  },
  {
    icon: MapPin,
    title: 'Location that actually matters',
    body: 'Share your position once and "near me" searches use real distance, not a guess based on your bio.',
  },
  {
    icon: Users,
    title: 'Communities with a pulse',
    body: 'Join groups built around what you do, not just your job title, and see who is active this week.',
  },
  {
    icon: Calendar,
    title: 'Events worth showing up to',
    body: 'Every event surfaces the people you might actually want to meet there, before you arrive.',
  },
  {
    icon: Flame,
    title: 'A streak that means something',
    body: 'It tracks real networking activity: a message sent, a connection made, not just opening the app.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    body: 'Your profile is yours to edit and remove. No selling data, no dark patterns to keep you scrolling.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <Eyebrow>What you get</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl">
              Everything after the first match
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Finding someone is the easy part to fake. Here is what keeps the relationship
              actually going.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                className="rounded-lg border-2 border-hairline p-6 transition-colors duration-200 hover:border-link"
              >
                <feature.icon size={20} className="text-link" strokeWidth={2} />
                <h3 className="mt-4 text-base font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
