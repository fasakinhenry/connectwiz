import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';

const TESTIMONIALS = [
  {
    quote:
      'I always knew networking mattered, I just never knew who to actually talk to. connectwiz found me two collaborators in the same week I signed up.',
    name: 'temi a.',
    role: 'indie hacker',
  },
  {
    quote:
      'the "why you should connect" line is the whole product for me. it turns a cold DM into an actual reason to talk.',
    name: 'daniel o.',
    role: 'frontend developer',
  },
  {
    quote:
      'our accelerator cohort uses this to find mentors now. the search is scary good at understanding what we actually mean.',
    name: 'chiamaka n.',
    role: 'founder, cohortly',
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="py-(--spacing-section-sm) md:py-(--spacing-section-md)">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>from early users</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-(--color-ink) md:text-5xl">
            connections people are actually glad they made
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
