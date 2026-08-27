import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Sparkles, MessageCircleWarning } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { parseSearchIntent, searchPeople } from '@/services/mock';
import type { SearchIntent, SearchResultPerson } from '@/lib/connectwiz-types';

const EXAMPLES = [
  'Female developers around me who are into AI',
  'Startup founders in fintech looking for engineers',
  'Robotics mentors near me',
  'People in the fashion space building something new',
];

export function LiveSearchDemo() {
  const [query, setQuery] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [intent, setIntent] = useState<SearchIntent | null>(null);
  const [results, setResults] = useState<SearchResultPerson[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function runDemo(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setLoading(true);
    setHasSearched(true);

    window.setTimeout(() => {
      const parsed = parseSearchIntent(trimmed);
      setIntent(parsed);
      setResults(parsed.supported ? searchPeople(parsed, null).slice(0, 3) : []);
      setLoading(false);
    }, 550);
  }

  useEffect(() => {
    runDemo(EXAMPLES[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="live-search" className="py-section-sm md:py-section-md">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>
            <Sparkles size={13} />
            Try it yourself, right now
          </Eyebrow>
          <h2 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight text-ink md:text-5xl">
            Search like you would talk to a friend
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            This box runs the same matching logic as the real app. Type your own, or pick an
            example below.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runDemo(query);
            }}
            className="flex flex-col gap-2 rounded-lg border-2 border-hairline-strong bg-canvas p-2 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2.5 px-3 py-2">
              <Search size={18} className="shrink-0 text-ink-soft" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Who are you looking for?"
                aria-label="Search people"
                className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink-soft"
              />
            </div>
            <Button type="submit" variant="primary" className="shrink-0">
              Search
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => runDemo(ex)}
                className="rounded-pill border-2 border-hairline px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:border-link hover:text-link"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="mt-8 min-h-60">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 pt-10 text-center"
                >
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-primary" />
                  <p className="text-sm font-semibold text-ink-soft">Reading your intent...</p>
                </motion.div>
              ) : !hasSearched ? null : intent && !intent.supported ? (
                <motion.div
                  key="unsupported"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 rounded-lg border-2 border-hairline bg-cloud px-6 py-8 text-center"
                >
                  <MessageCircleWarning size={22} className="text-ink-soft" />
                  <p className="max-w-sm text-sm font-medium text-ink-soft">
                    I cannot help with that request yet. Try searching by skills, interests,
                    location or networking goals.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {results?.map((r, i) => (
                    <motion.div
                      key={r.profile.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex flex-col rounded-lg border-2 border-hairline bg-canvas p-4 text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <img src={r.profile.avatarUrl} alt="" className="h-11 w-11 shrink-0 rounded-full bg-cloud" />
                        <span className="shrink-0 rounded-pill bg-cloud px-2 py-1 text-[11px] font-bold text-link">
                          {r.matchScore}%
                        </span>
                      </div>
                      <p className="mt-3 truncate text-sm font-bold text-ink">{r.profile.name}</p>
                      <p className="truncate text-xs font-semibold text-ink-soft">{r.profile.headline}</p>
                      <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-ink-soft">
                        <MapPin size={11} />
                        {r.profile.location.city}
                      </p>
                      {r.reasons[0] && (
                        <p className="mt-3 border-t border-hairline pt-3 text-[11px] font-semibold text-link">
                          {r.reasons[0]}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasSearched && !loading && (
            <p className="mt-6 text-center text-sm font-medium text-ink-soft">
              This is a live preview against sample profiles.{' '}
              <Link to="/signup" className="font-semibold text-link hover:text-primary-deep">
                Create your profile
              </Link>{' '}
              to search for real.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
