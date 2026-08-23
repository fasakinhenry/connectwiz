import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { AuthShell } from './components/auth-shell';
import { api } from '@/lib/api-client';
import { ApiRequestError } from '@/hooks/use-auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch (err: any) {
      setError(err instanceof ApiRequestError ? err.message : 'something went wrong. try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="reset your password" switchLabel="remembered it?" switchTo="/login" switchCta="log in">
      {sent ? (
        <p className="rounded-lg bg-cloud px-4 py-4 text-center text-sm font-semibold text-ink">
          if an account exists for {email}, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <p className="mb-1 text-center text-sm text-ink-soft)">
            enter your email and we'll send you a link to get back in.
          </p>
          <TextField
            label="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className="rounded-lg bg-error/10 px-4 py-3 text-sm font-semibold text-error">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" disabled={loading} className="mt-3 w-full">
            {loading ? 'sending…' : 'send reset link'}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
