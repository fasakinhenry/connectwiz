import { useState, type SubmitEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { SocialButton } from '@/components/ui/social-button';
import { AuthShell } from './components/auth-shell';
import { useAuth, ApiRequestError } from '@/hooks/use-auth';
import { API_URL } from '@/lib/api-client';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err instanceof ApiRequestError ? err.message : 'something went wrong. try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="log in" switchLabel="don't have an account?" switchTo="/signup" switchCta="sign up">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <TextField
          label="email or username"
          type="text"
          name="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          trailing={
            <Link
              to="/forgot-password"
              className="shrink-0 text-xs font-bold uppercase tracking-wide text-ink-soft transition-colors duration-200 hover:text-link"
            >
              forgot?
            </Link>
          }
        />

        {error && (
          <p className="rounded-lg bg-error/10 px-4 py-3 text-sm font-semibold text-error">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={loading} className="mt-3 w-full">
          {loading ? 'logging in…' : 'log in'}
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
        by signing in to streakme, you agree to our{' '}
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
