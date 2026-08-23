const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiError {
  success: false;
  message: string;
  errors?: unknown[];
}

export class ApiRequestError extends Error {
  status: number;
  errors?: unknown[];

  constructor(message: string, status: number, errors?: unknown[]) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.errors = errors;
  }
}

let accessToken: string | null = localStorage.getItem('streakme_access_token');

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) localStorage.setItem('streakme_access_token', token);
  else localStorage.removeItem('streakme_access_token');
}

export function getAccessToken() {
  return accessToken;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  { retry = true }: { retry?: boolean } = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && retry && path !== '/api/auth/refresh') {
    const refreshed = await tryRefresh();
    if (refreshed) return request<T>(path, options, { retry: false });
  }

  const body = (await res.json().catch(() => null)) as ApiSuccess<T> | ApiError | null;

  if (!res.ok || !body || body.success === false) {
    const message = body && 'message' in body ? body.message : `request failed (${res.status})`;
    throw new ApiRequestError(message, res.status, (body as ApiError)?.errors);
  }

  return (body as ApiSuccess<T>).data;
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const body = (await res.json()) as ApiSuccess<{ accessToken: string }>;
    setAccessToken(body.data.accessToken);
    return true;
  } catch {
    return false;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

export { API_URL };
