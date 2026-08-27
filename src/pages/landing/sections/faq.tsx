import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';

const FAQS = [
  {
    q: 'Is this just LinkedIn with a different color?',
    a: 'No. LinkedIn is a directory you have to browse yourself. ConnectWiz reads a plain-language description of who you want to meet and hands you scored matches with the actual reasons attached, so you never start from a blank search bar.',
  },
  {
    q: 'What happens if I do not have an AI key set up?',
    a: 'Nothing breaks. Onboarding, search and conversation starters all have a deterministic fallback built in, so every feature still works, it just relies on rules instead of a live model.',
  },
  {
    q: 'Do I need to be a founder or engineer to use this?',
    a: 'No. Students, designers, researchers, freelancers and career switchers all use the same loop. The onboarding chat adapts to whatever you tell it about yourself.',
  },
  {
    q: 'How does "near me" actually work?',
    a: 'Once you share your location, distance is calculated for real between you and other members. If you skip that step, matching falls back to comparing the city you entered during onboarding.',
  },
  {
    q: 'Can I edit or delete what the AI generated about me?',
    a: 'Always. Every generated profile is shown to you before it saves, and you can go back and edit any field afterward from your profile page.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cloud py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl">
              Before you sign up
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-hairline border-y border-hairline">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-base font-semibold text-ink">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas text-ink-soft transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      <Plus size={15} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
