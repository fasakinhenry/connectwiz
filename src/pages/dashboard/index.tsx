import { Outlet, Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sidebar, MobileTabBar } from './components/sidebar';
import { useConnectWizStore } from '@/services/mock';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const state = useConnectWizStore();

  if (!user) return null;
  if (!state.onboardingComplete) return <Navigate to="/onboarding" replace />;

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Helmet>
        <title>{user.name} — connectwiz</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex min-h-screen bg-canvas">
        <Sidebar />

        <div className="min-w-0 flex-1 pb-16 lg:pb-0">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4 lg:hidden">
            <span className="text-lg font-bold text-ink">connectwiz</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={handleLogout}
                aria-label="log out"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-hairline text-ink-soft transition-colors duration-200 hover:border-error hover:text-error"
              >
                <LogOut size={16} />
              </button>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-8 md:px-8">
            <Outlet />
          </main>
        </div>

        <MobileTabBar />
      </div>
    </>
  );
}
