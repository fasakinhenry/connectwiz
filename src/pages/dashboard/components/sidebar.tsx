import { Flame, Search, MessageCircle, Bell, Users2, CalendarDays, UserCircle2, LogOut, Rss } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/hooks/use-auth';
import { useConnectWizStore } from '@/services/mock';
import { getLevel, getTodayMission } from '@/services/mock';

const NAV = [
  { label: 'feed', icon: Rss, href: '/dashboard', end: true },
  { label: 'search', icon: Search, href: '/dashboard/search' },
  { label: 'messages', icon: MessageCircle, href: '/dashboard/messages' },
  { label: 'activity', icon: Bell, href: '/dashboard/activity' },
  { label: 'communities', icon: Users2, href: '/dashboard/communities' },
  { label: 'events', icon: CalendarDays, href: '/dashboard/events' },
  { label: 'profile', icon: UserCircle2, href: '/dashboard/profile' },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const state = useConnectWizStore();
  const level = getLevel(state.gamification.xp);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-hairline px-4 py-6 lg:flex">
      <Link to="/" className="px-2">
        <Logo />
      </Link>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = item.end ? location.pathname === item.href : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                active ? 'bg-cloud text-link' : 'text-ink-soft hover:bg-cloud hover:text-ink'
              }`}
            >
              <item.icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 flex flex-col gap-3 rounded-lg border-2 border-hairline p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <Flame size={16} className="text-flame" fill="var(--color-flame)" />
            {state.gamification.streak} day streak
          </span>
          <span className="rounded-pill bg-cloud px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-link">
            {level.name}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-pill bg-cloud">
          <div
            className="h-full rounded-pill bg-primary transition-all duration-500"
            style={{ width: `${Math.round(level.progress * 100)}%` }}
          />
        </div>
        <p className="text-[11px] font-semibold text-ink-soft">{state.gamification.xp} xp</p>
      </div>

      <div className="mt-3 rounded-lg bg-cloud p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-link">today's mission</p>
        <p className="mt-1.5 text-xs font-semibold leading-relaxed text-ink">{getTodayMission()}</p>
      </div>

      <div className="flex-1" />

      <button
        type="button"
        onClick={() => logout()}
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-ink-soft transition-colors duration-200 hover:bg-cloud hover:text-error"
      >
        <LogOut size={19} />
        log out
      </button>
    </aside>
  );
}

export function MobileTabBar() {
  const location = useLocation();
  const items = NAV.slice(0, 5);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-hairline bg-canvas py-2 lg:hidden">
      {items.map((item) => {
        const active = item.end ? location.pathname === item.href : location.pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            to={item.href}
            aria-label={item.label}
            className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
              active ? 'text-link' : 'text-ink-soft'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
