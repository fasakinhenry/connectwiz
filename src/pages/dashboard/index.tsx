import { Outlet, Navigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sidebar, MobileTabBar } from './components/sidebar';
import { useConnectWizStore } from '@/services/mock';

export default function DashboardLayout() {
  const { user } = useAuth();
  const state = useConnectWizStore();

  if (!user) return null;
  if (!state.onboardingComplete) return <Navigate to="/onboarding" replace />;

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
            <ThemeToggle />
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
