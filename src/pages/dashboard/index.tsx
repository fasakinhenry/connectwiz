import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sidebar } from './components/sidebar';
import { ProfileCard } from './components/profile-card';
import { ActivityFeed } from './components/activity-feed';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>{user.name} — streakme</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex min-h-screen bg-canvas">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4 lg:hidden">
            <span className="text-lg font-bold text-ink">streakme</span>
            <ThemeToggle />
          </header>

          <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:px-5 sm:py-8 md:grid-cols-[1fr_300px] md:px-8">
            <ProfileCard user={user} />
            <ActivityFeed />
          </main>
        </div>
      </div>
    </>
  );
}
