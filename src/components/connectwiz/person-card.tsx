import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import type { NetworkingProfile } from '@/lib/connectwiz-types';
import { ConnectButton } from './connect-button';

interface PersonCardProps {
  profile: NetworkingProfile;
  matchScore?: number;
  reasons?: string[];
}

export function PersonCard({ profile, matchScore, reasons }: PersonCardProps) {
  return (
    <div className="flex flex-col rounded-lg border-2 border-hairline p-5 transition-colors duration-200 hover:border-link">
      <div className="flex items-start justify-between gap-3">
        <Link to={`/dashboard/people/${profile.id}`} className="flex min-w-0 items-center gap-3">
          <img src={profile.avatarUrl} alt="" className="h-12 w-12 shrink-0 rounded-full bg-cloud" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">{profile.name}</p>
            <p className="truncate text-xs font-semibold text-ink-soft">{profile.headline}</p>
          </div>
        </Link>
        {typeof matchScore === 'number' && (
          <span className="shrink-0 rounded-pill bg-cloud px-2.5 py-1 text-xs font-bold text-link">
            {matchScore}% match
          </span>
        )}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
        <MapPin size={12} />
        {profile.location.city}, {profile.location.country}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {[...profile.skills.slice(0, 2), ...profile.interests.slice(0, 2)].map((tag) => (
          <span key={tag} className="rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold text-ink-soft">
            {tag}
          </span>
        ))}
      </div>

      {reasons && reasons.length > 0 && (
        <div className="mt-3 flex flex-col gap-1 border-t border-hairline pt-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-link">why you should connect</p>
          {reasons.map((reason) => (
            <p key={reason} className="text-xs font-semibold text-ink-soft">
              · {reason}
            </p>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-hairline pt-4">
        <Link to={`/dashboard/people/${profile.id}`} className="text-xs font-bold uppercase tracking-wide text-ink-soft hover:text-link">
          view profile
        </Link>
        <ConnectButton personId={profile.id} />
      </div>
    </div>
  );
}
