import { motion } from 'framer-motion';

const FRICTIONS = [
  {
    n: '01',
    title: 'You do not know who to approach',
    body: 'Everyone is a stranger until they are not. Scrolling a directory does not tell you who is actually worth a message.',
  },
  {
    n: '02',
    title: 'You cannot tell what you have in common',
    body: 'A job title is not a reason to talk to someone. Shared goals, skills and interests are, and they are buried in a bio nobody reads.',
  },
  {
    n: '03',
    title: 'You freeze on the first message',
    body: 'Even when you find the right person, "hey, love your profile" dies in every inbox on earth.',
  },
];

export function Problem() {
  return (
    <section className="py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-balance text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              Networking is not hard because people are hard to find.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              It is hard because finding is where it stops. Here is where most people actually get
              stuck.
            </p>
          </motion.div>

          <div className="flex flex-col divide-y divide-hairline border-y border-hairline">
            {FRICTIONS.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="grid grid-cols-[auto_1fr] gap-5 py-7"
              >
                <span className="font-display text-2xl font-medium text-hairline-strong">{item.n}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
