import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { SocialButton } from '@/components/ui/social-button';
import { AuthShell } from './components/auth-shell';
import { useAuth, ApiRequestError } from '@/hooks/use-auth';
import { API_URL } from '@/lib/api-client';
import { avatarUrlForSeed, randomAvatarSeed } from '@/lib/avatar';

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(() => randomAvatarSeed());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const avatarUrl = useMemo(() => avatarUrlForSeed(avatarSeed), [avatarSeed]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ name, email, password, avatarUrl });
      navigate('/onboarding', { replace: true });
    } catch (err: any) {
      setError(err instanceof ApiRequestError ? err.message : 'something went wrong. try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="create your account"
      switchLabel="already have an account?"
      switchTo="/login"
      switchCta="log in"
    >
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="your generated avatar"
            className="h-20 w-20 rounded-full border-2 border-hairline bg-cloud"
          />
          <button
            type="button"
            onClick={() => setAvatarSeed(randomAvatarSeed())}
            aria-label="shuffle avatar"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-hairline bg-primary text-on-primary transition-colors duration-200 hover:bg-primary-bright"
          >
            <Shuffle size={14} />
          </button>
        </div>
        <p className="text-xs font-semibold text-ink-soft)">
          your avatar — shuffle it, or upload one later
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <TextField
          label="full name"
          type="text"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="password"
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="rounded-lg bg-error/10 px-4 py-3 text-sm font-semibold text-error">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={loading} className="mt-3 w-full">
          {loading ? 'creating account…' : 'create account'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-hairline" />
        <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
          or
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <SocialButton provider="google" onClick={() => (window.location.href = `${API_URL}/api/auth/google`)} />
        <SocialButton
          provider="linkedin"
          onClick={() => (window.location.href = `${API_URL}/api/auth/linkedin`)}
        />
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-ink-soft">
        by creating an account, you agree to our{' '}
        <a href="#" className="font-bold text-ink-soft hover:text-link">
          terms
        </a>{' '}
        and{' '}
        <a href="#" className="font-bold text-ink-soft hover:text-link">
          privacy policy
        </a>
        .
      </p>
    </AuthShell>
  );
}
