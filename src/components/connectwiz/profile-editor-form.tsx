import { useState } from 'react';
import type { NetworkingProfile } from '@/lib/connectwiz-types';
import { TextField } from '@/components/ui/text-field';
import { TagInput } from '@/components/ui/tag-input';
import { Button } from '@/components/ui/button';
import { profileCompleteness } from '@/services/mock';

const EXPERIENCE_OPTIONS: { value: NetworkingProfile['experience']; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'entry', label: 'Early career' },
  { value: 'mid', label: 'Mid-level' },
  { value: 'senior', label: 'Senior' },
  { value: 'founder', label: 'Founder / Leadership' },
];

export function ProfileEditorForm({
  profile,
  onSave,
  onCancel,
  submitLabel = 'save changes',
  showCompleteness = true,
}: {
  profile: NetworkingProfile;
  onSave: (profile: NetworkingProfile) => void;
  onCancel?: () => void;
  submitLabel?: string;
  showCompleteness?: boolean;
}) {
  const [draft, setDraft] = useState(profile);
  const completeness = profileCompleteness(draft);

  function set<K extends keyof NetworkingProfile>(key: K, value: NetworkingProfile[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  return (
    <div className="w-full">
      {showCompleteness && (
        <div className="mb-5 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-pill bg-cloud">
            <div className="h-full rounded-pill bg-primary transition-all duration-500" style={{ width: `${completeness}%` }} />
          </div>
          <span className="shrink-0 text-xs font-bold text-ink-soft">{completeness}% complete</span>
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-lg border-2 border-hairline p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <img src={draft.avatarUrl} alt="" className="h-16 w-16 rounded-full border-2 border-hairline bg-cloud" />
          <div className="min-w-0 flex-1">
            <TextField label="Headline" value={draft.headline} onChange={(e) => set('headline', e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wide text-ink-soft">Bio</label>
          <textarea
            value={draft.bio}
            onChange={(e) => set('bio', e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg bg-cloud px-4 py-3 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-link"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="City"
            value={draft.location.city}
            onChange={(e) => set('location', { ...draft.location, city: e.target.value })}
          />
          <TextField
            label="Country"
            value={draft.location.country}
            onChange={(e) => set('location', { ...draft.location, country: e.target.value })}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <TextField label="Profession" value={draft.profession} onChange={(e) => set('profession', e.target.value)} />
          <TextField
            label="Organization"
            value={draft.organization ?? ''}
            onChange={(e) => set('organization', e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-soft">Experience</label>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set('experience', opt.value)}
                className={`rounded-pill border-2 px-3.5 py-2 text-xs font-bold transition-colors duration-200 ${
                  draft.experience === opt.value
                    ? 'border-link bg-cloud text-link'
                    : 'border-hairline text-ink-soft hover:border-link'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <TagInput label="Skills" value={draft.skills} onChange={(v) => set('skills', v)} placeholder="add a skill" />
        <TagInput label="Interests" value={draft.interests} onChange={(v) => set('interests', v)} placeholder="add an interest" />
        <TagInput label="Goals" value={draft.goals} onChange={(v) => set('goals', v)} placeholder="add a goal" />
        <TagInput label="Looking for" value={draft.lookingFor} onChange={(v) => set('lookingFor', v)} placeholder="who do you want to meet" />
        <TagInput label="Can offer" value={draft.canOffer} onChange={(v) => set('canOffer', v)} placeholder="what can you give back" />
      </div>

      <div className="mt-6 flex gap-3">
        {onCancel && (
          <Button variant="secondary" size="lg" className="flex-1" onClick={onCancel} type="button">
            cancel
          </Button>
        )}
        <Button variant="primary" size="lg" className="flex-1" onClick={() => onSave(draft)} type="button">
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
