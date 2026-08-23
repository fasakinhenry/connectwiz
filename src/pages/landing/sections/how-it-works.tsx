import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/eyebrow';

const STEPS = [
  {
    n: '01',
    title: 'talk, don\'t fill out forms',
    body: 'a quick AI conversation learns your skills, interests, and goals — then builds a rich profile you can review and edit.',
  },
  {
    n: '02',
    title: 'describe who you want to meet',
    body: 'type it in plain language: "female developers around me who are into AI." connectwiz interprets the intent for you.',
  },
  {
    n: '03',
    title: 'see the why, not just the who',
    body: 'every match shows a match score and the real reasons you\'re a fit — shared skills, interests, goals, or location.',
  },
  {
    n: '04',
    title: 'connect, then actually talk',
    body: 'send a request, get a conversation starter based on what you have in common, and take it from strangers to a real relationship.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cloud py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>the loop</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink md:text-5xl">
            four steps. no cold-DM anxiety.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-6 hidden h-0.5 bg-hairline-strong md:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-canvas text-sm font-bold text-link">
                {step.n}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
