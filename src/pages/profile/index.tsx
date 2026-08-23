import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Pencil, MapPin, Share2, Sparkles, Trophy, Lock } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { ConnectButton } from '@/components/connectwiz/connect-button';
import { ProfileEditorForm } from '@/components/connectwiz/profile-editor-form';
import {
  findPerson,
  store,
  useConnectWizStore,
  getConversationStarters,
  getSharedAttributes,
  getAchievements,
  getLevel,
  profileCompleteness,
  SEED_COMMUNITIES,
  SEED_EVENTS,
} from '@/services/mock';
import type { NetworkingProfile } from '@/lib/connectwiz-types';

function TagSection({ title, tags }: { title: string; tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">{title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="rounded-pill bg-cloud px-3 py-1.5 text-xs font-bold text-ink">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { personId } = useParams();
  const state = useConnectWizStore();
  const [editing, setEditing] = useState(false);

  const isSelf = !personId;
  const profile: NetworkingProfile | null = isSelf ? state.profile : findPerson(personId!) ?? null;

  useEffect(() => {
    if (!isSelf && personId) store.recordProfileView(personId);
  }, [isSelf, personId]);

  if (!profile) {
    return <EmptyState icon={Sparkles} title="Profile not found" body="This person doesn't exist, or hasn't joined ConnectWiz yet." />;
  }

  if (isSelf && editing) {
    return (
      <>
        <Helmet>
          <title>edit profile — connectwiz</title>
        </Helmet>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-5 text-2xl font-bold text-ink">edit your profile</h1>
          <ProfileEditorForm
            profile={profile}
            onCancel={() => setEditing(false)}
            onSave={(p) => {
              store.updateProfile(p);
              setEditing(false);
            }}
          />
        </div>
      </>
    );
  }

  const completeness = profileCompleteness(profile);
  const level = getLevel(state.gamification.xp);
  const achievements = isSelf ? getAchievements(state) : [];
  const starters = !isSelf ? getConversationStarters(state.profile, profile) : [];
  const shared = !isSelf ? getSharedAttributes(state.profile, profile) : null;
  const communities = SEED_COMMUNITIES.filter((c) => profile.communities.includes(c.id));
  const events = SEED_EVENTS.filter((e) => profile.events.includes(e.id));

  return (
    <>
      <Helmet>
        <title>{profile.name} — connectwiz</title>
      </Helmet>

      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="overflow-hidden rounded-lg border-2 border-hairline">
          <div className="h-28 bg-linear-to-br from-primary to-primary-deep sm:h-36" />
          <div className="bg-canvas px-5 pb-6 sm:px-6">
            <div className="flex items-end justify-between">
              <img
                src={profile.avatarUrl}
                alt=""
                className="-mt-10 h-20 w-20 rounded-full border-4 border-canvas bg-cloud sm:-mt-12 sm:h-24 sm:w-24"
              />
              <div className="flex gap-2 pt-4">
                {isSelf ? (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 rounded-pill border-2 border-hairline px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-soft hover:border-link hover:text-link"
                  >
                    <Pencil size={13} />
                    edit profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      aria-label="share profile"
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-hairline text-ink-soft hover:border-link hover:text-link"
                    >
                      <Share2 size={14} />
                    </button>
                    <ConnectButton personId={profile.id} />
                  </>
                )}
              </div>
            </div>

            <h1 className="mt-3 text-2xl font-bold text-ink">{profile.name}</h1>
            <p className="text-sm font-semibold text-ink-soft">{profile.headline}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
              <MapPin size={12} />
              {profile.location.city}, {profile.location.country}
            </p>

            {isSelf && (
              <div className="mt-4 flex items-center gap-3 border-t border-hairline pt-4">
                <div className="h-2 flex-1 overflow-hidden rounded-pill bg-cloud">
                  <div className="h-full rounded-pill bg-primary transition-all duration-500" style={{ width: `${completeness}%` }} />
                </div>
                <span className="shrink-0 text-xs font-bold text-ink-soft">{completeness}% complete</span>
              </div>
            )}
          </div>
        </div>

        {!isSelf && starters.length > 0 && (
          <div className="rounded-lg border-2 border-hairline p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-link">
              <Sparkles size={13} />
              not sure what to say?
            </p>
            {shared && (shared.interests.length > 0 || shared.skills.length > 0 || shared.sameCity) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {shared.interests.map((i) => (
                  <span key={i} className="rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                    both into {i}
                  </span>
                ))}
                {shared.skills.map((s) => (
                  <span key={s} className="rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                    shared skill: {s}
                  </span>
                ))}
                {shared.sameCity && (
                  <span className="rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold text-ink-soft">
                    same city
                  </span>
                )}
              </div>
            )}
            <div className="mt-3 flex flex-col gap-2">
              {starters.map((s) => (
                <p key={s} className="rounded-lg bg-cloud px-4 py-3 text-sm font-semibold leading-relaxed text-ink">
                  {s}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5 rounded-lg border-2 border-hairline p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">about</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{profile.bio}</p>
          </div>
          <TagSection title="skills" tags={profile.skills} />
          <TagSection title="interests" tags={profile.interests} />
          <TagSection title="goals" tags={profile.goals} />
          <TagSection title="looking for" tags={profile.lookingFor} />
          <TagSection title="can offer" tags={profile.canOffer} />
        </div>

        {(communities.length > 0 || events.length > 0) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {communities.length > 0 && (
              <div className="rounded-lg border-2 border-hairline p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">communities</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {communities.map((c) => (
                    <p key={c.id} className="text-sm font-semibold text-ink">
                      {c.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {events.length > 0 && (
              <div className="rounded-lg border-2 border-hairline p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">events</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {events.map((e) => (
                    <p key={e.id} className="text-sm font-semibold text-ink">
                      {e.title}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isSelf && (
          <div className="rounded-lg border-2 border-hairline p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">
                <Trophy size={14} className="text-flame" />
                achievements
              </p>
              <span className="rounded-pill bg-cloud px-3 py-1 text-xs font-bold text-link">{level.name}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 rounded-lg border-2 p-3 ${
                    a.unlocked ? 'border-link bg-cloud' : 'border-hairline opacity-60'
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-link">
                    {a.unlocked ? <Trophy size={16} /> : <Lock size={14} className="text-ink-soft" />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-ink">{a.label}</p>
                    <p className="truncate text-[11px] font-semibold text-ink-soft">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
