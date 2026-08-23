import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, setAccessToken, ApiRequestError } from '@/lib/api-client';
import type { AuthResponse, StreakMeUser } from '@/lib/types';
import { store } from '@/services/mock';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: StreakMeUser | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  register: (input: RegisterInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  hydrateFromToken: (accessToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StreakMeUser | null>(null);
  const [status, setStatus] = useState<AuthContextValue['status']>('loading');

  useEffect(() => {
    api
      .get<StreakMeUser>('/api/auth/me')
      .then((me) => {
        setUser(me);
        setStatus('authenticated');
      })
      .catch(() => {
        setStatus('unauthenticated');
      });
  }, []);

  async function register(input: RegisterInput) {
    const data = await api.post<AuthResponse>('/api/auth/register', input);
    setAccessToken(data.accessToken);
    setUser(data.user);
    setStatus('authenticated');
  }

  async function login(input: LoginInput) {
    const data = await api.post<AuthResponse>('/api/auth/login', input);
    setAccessToken(data.accessToken);
    setUser(data.user);
    setStatus('authenticated');
  }

  async function logout() {
    try {
      await api.post('/api/auth/logout');
    } finally {
      setAccessToken(null);
      setUser(null);
      setStatus('unauthenticated');
      // Reset the local ConnectWiz profile/onboarding state too, so logging
      // in as someone else (or demoing again) starts fresh at onboarding.
      store.reset();
    }
  }

  async function hydrateFromToken(accessToken: string) {
    setAccessToken(accessToken);
    const me = await api.get<StreakMeUser>('/api/auth/me');
    setUser(me);
    setStatus('authenticated');
  }

  return (
    <AuthContext.Provider value={{ user, status, register, login, logout, hydrateFromToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export { ApiRequestError };
