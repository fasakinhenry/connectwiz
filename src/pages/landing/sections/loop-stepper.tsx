import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Brain, MessageSquareText, Link2, MessagesSquare, Flame } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const STAGES = [
  {
    label: 'Discover',
    icon: Compass,
    body: 'Describe who you want to meet in plain language. No filters to configure, no forms to fill in first.',
    example: '"Product designers into AI who are based near me"',
  },
  {
    label: 'Understand',
    icon: Brain,
    body: 'ConnectWiz reads the intent behind the words: skills, interests, goals and location, then scores every profile against it.',
    example: 'Intent read as: skill = design, interest = AI, location = near me',
  },
  {
    label: 'Approach',
    icon: MessageSquareText,
    body: 'Every match comes with the reasons it fits and a suggested opener, so the first message writes itself.',
    example: '"Noticed we are both into AI, what are you building?"',
  },
  {
    label: 'Connect',
    icon: Link2,
    body: 'Send a request with one tap. No cold follow requests into the void, just a clear next step.',
    example: 'Request sent -> pending -> connected',
  },
  {
    label: 'Communicate',
    icon: MessagesSquare,
    body: 'Keep the conversation in one place, with context on why you connected still visible.',
    example: 'Shared thread, shared context, no re-introducing yourself',
  },
  {
    label: 'Maintain',
    icon: Flame,
    body: 'A networking streak and a daily mission keep the relationship alive after the first hello.',
    example: '7-day streak - today: reply to one new message',
  },
];

export function LoopStepper() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section id="how-it-thinks" className="bg-cloud py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>How it thinks</Eyebrow>
          <h2 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl">
            One loop, six moments
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Tap a step. This is the exact loop your networking runs on inside the app.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STAGES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`flex flex-col items-center gap-2.5 rounded-lg border-2 px-3 py-5 text-center transition-colors duration-200 ${
                  isActive
                    ? 'border-primary bg-canvas'
                    : 'border-transparent bg-canvas/60 hover:border-hairline-strong'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isActive ? 'bg-primary text-on-primary' : 'bg-cloud text-ink-soft'
                  }`}
                >
                  <s.icon size={18} />
                </span>
                <span className={`text-sm font-semibold ${isActive ? 'text-ink' : 'text-ink-soft'}`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-8 max-w-2xl rounded-lg border-2 border-hairline bg-canvas p-7 sm:p-8"
          >
            <p className="text-lg leading-relaxed text-ink">{stage.body}</p>
            <p className="mt-4 rounded-md bg-cloud px-4 py-3 font-mono text-sm text-link">
              {stage.example}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
