import { Pencil, Flame, Zap, Gem, Heart } from 'lucide-react';
import type { StreakMeUser } from '@/lib/types';

const STAT_ICONS = [Flame, Zap, Gem, Heart];

export function ProfileCard({ user }: { user: StreakMeUser }) {
  const stats = user.stats ?? { currentStreak: 1, totalXp: 0, following: 0, followers: 0 };
  const joined = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const statBlocks = [
    { label: 'day streak', value: stats.currentStreak },
    { label: 'total xp', value: stats.totalXp.toLocaleString() },
    { label: 'following', value: stats.following },
    { label: 'followers', value: stats.followers },
  ];

  return (
    <div className="overflow-hidden rounded-lg border-2 border-hairline">
      <div className="relative h-32 bg-linear-to-br from-primary to-primary-deep sm:h-40 md:h-48">
        <button
          type="button"
          aria-label="edit cover"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-on-surface-inverse-faint text-white transition-colors duration-200 hover:bg-white/30"
        >
          <Pencil size={15} />
        </button>
      </div>

      <div className="bg-canvas px-4 pb-6 sm:px-6">
        <img
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
          className="-mt-10 h-20 w-20 rounded-full border-4 border-canvas bg-cloud sm:-mt-12 sm:h-24 sm:w-24 md:h-28 md:w-28"
        />

        <h1 className="mt-4 text-2xl font-bold text-ink">{user.name}</h1>
        <p className="text-sm font-semibold text-ink-soft">@{user.username}</p>
        <p className="mt-1 text-sm text-ink-soft)">joined {joined}</p>

        <div className="mt-3 flex gap-5 text-sm font-bold">
          <span className="text-link">{stats.following} following</span>
          <span className="text-link">{stats.followers} followers</span>
        </div>

        <div className="mt-6 border-t border-hairline pt-6">
          <h2 className="text-lg font-bold text-ink">statistics</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {statBlocks.map((s, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div
                  key={s.label}
                  className="rounded-lg border-2 border-hairline px-4 py-4 text-center"
                >
                  <Icon
                    size={22}
                    className="mx-auto text-flame)"
                    fill={i === 0 ? 'var(--color-flame)' : 'none'}
                  />
                  <p className="mt-2 text-xl font-bold text-ink">{s.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
