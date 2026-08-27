import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';

const FEATURED = {
  quote:
    'I always knew networking mattered. I just never knew who to actually talk to first. ConnectWiz found me two collaborators in the same week I signed up, and told me exactly why they were worth messaging.',
  name: 'Temi A.',
  role: 'Indie hacker, building solo',
};

const SUPPORTING = [
  {
    quote: 'The reasons shown on every match are the whole product for me. It turns a cold message into an actual opener.',
    name: 'Daniel O.',
    role: 'Frontend developer',
  },
  {
    quote: 'Our cohort uses this to find mentors now. The search understands what we mean, not just what we type.',
    name: 'Chiamaka N.',
    role: 'Founder, Cohortly',
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="mb-12 max-w-xl">
          <Eyebrow>From early users</Eyebrow>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="font-display text-balance text-3xl font-medium leading-snug tracking-tight text-ink md:text-4xl">
              &ldquo;{FEATURED.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="h-10 w-10 shrink-0 rounded-full bg-cloud" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">{FEATURED.name}</p>
                <p className="text-xs font-medium text-ink-soft">{FEATURED.role}</p>
              </div>
            </figcaption>
          </motion.figure>

          <div className="flex flex-col gap-6 border-t border-hairline pt-8 lg:border-l-2 lg:border-t-0 lg:pl-10 lg:pt-0">
            {SUPPORTING.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <blockquote className="text-sm leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs font-medium text-ink-soft">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
