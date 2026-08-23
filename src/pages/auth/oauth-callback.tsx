import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/hooks/use-auth';

/**
 * Lands here after Google/LinkedIn redirect back from the backend with
 * `?accessToken=...`. We hydrate the session from that token, then bounce
 * straight into the dashboard.
 */
export default function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const { hydrateFromToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = params.get('accessToken');
    if (!token) {
      setError('missing access token');
      return;
    }
    hydrateFromToken(token)
      .then(() => navigate('/dashboard', { replace: true }))
      .catch(() => setError('could not complete sign-in'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
      <div className="animate-pulse">
        <Logo withWordmark={false} size={44} />
      </div>
      {error ? (
        <div>
          <p className="font-semibold text-error">{error}</p>
          <a href="/login" className="mt-2 inline-block text-sm font-bold text-link">
            back to log in
          </a>
        </div>
      ) : (
        <p className="text-sm font-semibold text-ink-soft">signing you in…</p>
      )}
    </div>
  );
}
