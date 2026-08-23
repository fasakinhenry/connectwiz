import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, value, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState('');

  function commit() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!value.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...value, trimmed]);
    }
    setDraft('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</label>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border-2 border-transparent bg-cloud px-3 py-2.5 focus-within:border-link">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-pill bg-canvas px-3 py-1.5 text-xs font-bold text-ink"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              aria-label={`remove ${tag}`}
              className="text-ink-soft hover:text-error"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={commit}
          placeholder={value.length ? '' : placeholder}
          className="min-w-24 flex-1 bg-transparent py-1 text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-soft"
        />
      </div>
    </div>
  );
}
