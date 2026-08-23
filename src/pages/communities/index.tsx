import { Helmet } from 'react-helmet-async';
import { Users2 } from 'lucide-react';
import { SEED_COMMUNITIES, store, useConnectWizStore } from '@/services/mock';

export default function CommunitiesPage() {
  const state = useConnectWizStore();

  return (
    <>
      <Helmet>
        <title>communities — connectwiz</title>
      </Helmet>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-ink">communities</h1>
        <p className="mt-1 text-sm text-ink-soft">find your people around what you actually care about.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SEED_COMMUNITIES.map((c) => {
            const joined = Boolean(state.communities[c.id]);
            return (
              <div key={c.id} className="flex flex-col rounded-lg border-2 border-hairline p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cloud text-link">
                      <Users2 size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{c.name}</p>
                      <p className="text-xs font-semibold text-ink-soft">{c.memberCount.toLocaleString()} members</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                  <p className="text-xs font-semibold text-ink-soft">{c.recentActivity}</p>
                  <button
                    type="button"
                    onClick={() => store.toggleCommunity(c.id)}
                    className={`rounded-pill px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                      joined ? 'border-2 border-hairline text-ink-soft hover:border-error hover:text-error' : 'bg-primary text-on-primary hover:bg-primary-bright'
                    }`}
                  >
                    {joined ? 'joined' : 'join'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
