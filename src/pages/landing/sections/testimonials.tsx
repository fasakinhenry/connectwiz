import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';

const TESTIMONIALS = [
  {
    quote:
      'I\'ve tried every habit app there is. none of them stuck until I had a circle of people who\'d actually notice if I disappeared for a day.',
    name: 'temi a.',
    role: '214-day strength streak',
  },
  {
    quote:
      'streakme turned "I should code more" into a 90-day habit I genuinely look forward to. the heatmap is oddly addictive.',
    name: 'daniel o.',
    role: '90-day #100DaysOfCode',
  },
  {
    quote:
      'our whole cohort runs their build-in-public streaks here now. it\'s the accountability layer discord could never be.',
    name: 'chiamaka n.',
    role: 'founder, cohortly',
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="py-(--spacing-section-sm) md:py-(--spacing-section-md)">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>from the community</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-(--color-ink) md:text-5xl">
            streaks people are actually proud of
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col rounded-lg border-2 border-(--color-hairline) bg-(--color-paper) p-7"
            >
              <blockquote className="flex-1 text-[15px] leading-relaxed text-(--color-ink)">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-(--color-hairline) pt-4">
                <p className="text-sm font-bold text-(--color-ink)">{t.name}</p>
                <p className="text-xs font-semibold text-(--color-ink-soft)">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
