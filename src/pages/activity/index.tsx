import { Helmet } from 'react-helmet-async';
import { Bell, Flame, Heart, MessageCircle, Sparkles, UserPlus, UserCheck2 } from 'lucide-react';
import { Link } from 'react-router';
import { EmptyState } from '@/components/ui/empty-state';
import { useConnectWizStore } from '@/services/mock';
import type { ActivityItem } from '@/lib/connectwiz-types';

const ICONS: Record<ActivityItem['kind'], typeof Bell> = {
  connection_request: UserPlus,
  connection_accept: UserCheck2,
  like: Heart,
  comment: MessageCircle,
  streak: Flame,
  mission: Sparkles,
  suggestion: Sparkles,
  onboarding: Sparkles,
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ActivityPage() {
  const state = useConnectWizStore();

  return (
    <>
      <Helmet>
        <title>activity — connectwiz</title>
      </Helmet>

      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-ink">activity</h1>
        <p className="mt-1 text-sm text-ink-soft">everything happening around your network.</p>

        {state.activity.length === 0 ? (
          <div className="mt-6">
            <EmptyState icon={Bell} title="No activity yet" body="Connect with people and join communities to see updates here." />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {state.activity.map((item) => {
              const Icon = ICONS[item.kind];
              const content = (
                <div className="flex items-start gap-3 rounded-lg border-2 border-hairline p-4 transition-colors duration-200 hover:border-link">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cloud text-link">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-relaxed text-ink">{item.text}</p>
                    <p className="mt-1 text-xs font-semibold text-ink-soft">{timeAgo(item.createdAt)}</p>
                  </div>
                </div>
              );
              return item.kind === 'suggestion' ? (
                <Link key={item.id} to="/dashboard/search">
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
