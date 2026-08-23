import { useState } from 'react';
import { Heart, MessageCircle, Briefcase, CalendarDays } from 'lucide-react';
import type { Post } from '@/lib/connectwiz-types';
import { resolvePerson, store, useConnectWizStore } from '@/services/mock';

const KIND_ICON: Record<Post['kind'], typeof Briefcase | null> = {
  project: Briefcase,
  event: CalendarDays,
  update: null,
  text: null,
};

const KIND_LABEL: Record<Post['kind'], string> = {
  project: 'project',
  event: 'event',
  update: 'update',
  text: 'post',
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function PostCard({ post }: { post: Post }) {
  useConnectWizStore();
  const [commentDraft, setCommentDraft] = useState('');
  const [showComments, setShowComments] = useState(false);

  const author = post.authorId === 'me' ? null : resolvePerson(post.authorId);
  const name = post.authorId === 'me' ? 'you' : (author?.name ?? 'someone');
  const avatarUrl = post.authorId === 'me' ? undefined : author?.avatarUrl;
  const headline = post.authorId === 'me' ? '' : (author?.headline ?? '');
  const Icon = KIND_ICON[post.kind];

  return (
    <div className="rounded-lg border-2 border-hairline p-5">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-10 w-10 rounded-full bg-cloud" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
            {name[0].toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">{name}</p>
          <p className="truncate text-xs font-semibold text-ink-soft">{headline || timeAgo(post.createdAt)}</p>
        </div>
        {Icon && (
          <span className="flex shrink-0 items-center gap-1 rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-link">
            <Icon size={11} />
            {KIND_LABEL[post.kind]}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink">{post.content}</p>

      <div className="mt-4 flex items-center gap-5 border-t border-hairline pt-4 text-ink-soft">
        <button
          type="button"
          onClick={() => store.toggleLike(post.id)}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors duration-200 ${post.likedByMe ? 'text-error' : 'hover:text-error'}`}
        >
          <Heart size={15} fill={post.likedByMe ? 'currentColor' : 'none'} />
          {post.likes}
        </button>
        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-bold hover:text-link"
        >
          <MessageCircle size={15} />
          {post.comments.length}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 flex flex-col gap-3 border-t border-hairline pt-4">
          {post.comments.map((c) => {
            const commenter = c.authorId === 'me' ? null : resolvePerson(c.authorId);
            const commenterName = c.authorId === 'me' ? 'you' : (commenter?.name ?? 'someone');
            return (
              <p key={c.id} className="text-xs leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">{commenterName}</span> {c.text}
              </p>
            );
          })}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!commentDraft.trim()) return;
              store.addComment(post.id, commentDraft);
              setCommentDraft('');
            }}
            className="flex items-center gap-2"
          >
            <input
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="write a comment..."
              className="h-9 flex-1 rounded-pill bg-cloud px-3.5 text-xs font-semibold text-ink outline-none placeholder:text-ink-soft"
            />
            <button type="submit" className="text-xs font-bold text-link disabled:opacity-40" disabled={!commentDraft.trim()}>
              post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
