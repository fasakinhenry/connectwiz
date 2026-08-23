import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Sparkles, MessageCircleWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { PersonCard } from '@/components/connectwiz/person-card';
import { parseSearchIntent, searchPeople, useConnectWizStore } from '@/services/mock';
import type { SearchIntent, SearchResultPerson } from '@/lib/connectwiz-types';

const EXAMPLES = [
  'female developers around me who are into AI',
  'startup founders in fintech looking for engineers',
  'robotics mentors near me',
  'designers who understand AI products',
];

export default function SearchPage() {
  const state = useConnectWizStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [intent, setIntent] = useState<SearchIntent | null>(null);
  const [results, setResults] = useState<SearchResultPerson[] | null>(null);

  function runSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setLoading(true);
    setResults(null);
    setIntent(null);

    setTimeout(() => {
      const parsedIntent = parseSearchIntent(trimmed);
      setIntent(parsedIntent);
      if (parsedIntent.supported) {
        setResults(searchPeople(parsedIntent, state.profile));
      }
      setLoading(false);
    }, 700);
  }

  const filterChips = intent
    ? [
        intent.gender && `gender: ${intent.gender}`,
        intent.location === 'near_me' && 'near me',
        ...intent.skills.map((s) => `skill: ${s}`),
        ...intent.interests.map((i) => `interest: ${i}`),
        ...intent.goals.map((g) => `goal: ${g}`),
      ].filter((x): x is string => Boolean(x))
    : [];

  return (
    <>
      <Helmet>
        <title>search — connectwiz</title>
      </Helmet>

      <div className="mx-auto flex max-w-2xl flex-col items-center pb-10 pt-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cloud text-link">
          <Sparkles size={22} />
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">who are you looking for?</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          describe them in plain language — skills, interests, goals, or location. connectwiz figures out the rest.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(query);
          }}
          className="mt-6 flex w-full items-center gap-2 rounded-lg border-2 border-hairline-strong bg-canvas px-4 py-2 focus-within:border-link"
        >
          <SearchIcon size={18} className="shrink-0 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="I'm looking for female developers around me who are into AI..."
            className="h-12 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-soft"
          />
          <Button type="submit" variant="primary" size="sm" disabled={!query.trim() || loading}>
            search
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => runSearch(ex)}
              className="rounded-pill border-2 border-hairline px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:border-link hover:text-link"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-10"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-link"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-ink-soft">interpreting your search...</p>
          </motion.div>
        )}

        {!loading && intent && !intent.supported && (
          <motion.div key="unsupported" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <EmptyState
              icon={MessageCircleWarning}
              title="I can't help with that request yet"
              body="Try searching for people based on skills, interests, location, goals, or networking needs — e.g. “AI researchers near me” or “founders looking for engineers.”"
            />
          </motion.div>
        )}

        {!loading && intent?.supported && results && results.length === 0 && (
          <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <EmptyState
              icon={SearchIcon}
              title="No matches yet"
              body="Nobody fits that description right now. Try broadening your search, or check back as more people join ConnectWiz."
            />
          </motion.div>
        )}

        {!loading && intent?.supported && results && results.length > 0 && (
          <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {filterChips.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">interpreted as</span>
                {filterChips.map((chip) => (
                  <span key={chip} className="rounded-pill bg-cloud px-3 py-1 text-xs font-bold text-link">
                    {chip}
                  </span>
                ))}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((r) => (
                <PersonCard key={r.profile.id} profile={r.profile} matchScore={r.matchScore} reasons={r.reasons} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
