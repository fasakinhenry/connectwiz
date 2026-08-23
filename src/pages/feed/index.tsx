import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Circle, Rss } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { EmptyState } from '@/components/ui/empty-state';
import { PostCard } from './components/post-card';
import { store, useConnectWizStore, getDailyGoals } from '@/services/mock';
import type { PostKind } from '@/lib/connectwiz-types';

const KIND_OPTIONS: { value: PostKind; label: string }[] = [
  { value: 'text', label: 'post' },
  { value: 'update', label: 'update' },
  { value: 'project', label: 'project' },
  { value: 'event', label: 'event' },
];

export default function FeedPage() {
  const { user } = useAuth();
  const state = useConnectWizStore();
  const [draft, setDraft] = useState('');
  const [kind, setKind] = useState<PostKind>('text');
  const goals = getDailyGoals(state);

  function submitPost() {
    if (!draft.trim()) return;
    store.createPost(draft, kind);
    setDraft('');
    setKind('text');
  }

  return (
    <>
      <Helmet>
        <title>feed — connectwiz</title>
      </Helmet>

      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="rounded-lg border-2 border-hairline p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">today's goals</p>
          <div className="mt-3 flex flex-col gap-2">
            {goals.map((g) => {
              const done = g.progress >= g.target;
              return (
                <div key={g.id} className="flex items-center gap-2 text-sm font-semibold">
                  {done ? <CheckCircle2 size={16} className="text-link" /> : <Circle size={16} className="text-ink-soft" />}
                  <span className={done ? 'text-ink-soft line-through' : 'text-ink'}>{g.label}</span>
                  <span className="ml-auto text-xs font-bold text-ink-soft">
                    {Math.min(g.progress, g.target)}/{g.target}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border-2 border-hairline p-4">
          <div className="flex items-start gap-3">
            <img src={user?.avatarUrl} alt="" className="h-10 w-10 shrink-0 rounded-full bg-cloud" />
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="looking for collaborators? share progress? post it here."
              rows={2}
              className="w-full resize-none bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-soft"
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-hairline pt-3">
            <div className="flex gap-1.5">
              {KIND_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setKind(opt.value)}
                  className={`rounded-pill border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                    kind === opt.value ? 'border-link bg-cloud text-link' : 'border-hairline text-ink-soft hover:border-link'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={submitPost}
              disabled={!draft.trim()}
              className="rounded-pill bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wide text-on-primary disabled:opacity-40"
            >
              post
            </button>
          </div>
        </div>

        {state.posts.length === 0 ? (
          <EmptyState icon={Rss} title="Your feed is quiet" body="Post an update, or connect with a few people to see their posts here." />
        ) : (
          <div className="flex flex-col gap-4">
            {state.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
