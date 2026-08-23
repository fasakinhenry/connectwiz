import { Flame, Users, Trophy, Target, UserCircle2, MoreHorizontal, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/hooks/use-auth';

const NAV = [
  { label: 'feed', icon: Flame, href: '/dashboard' },
  { label: 'circles', icon: Users, href: '/dashboard/circles' },
  { label: 'leaderboard', icon: Trophy, href: '/dashboard/leaderboard' },
  { label: 'quests', icon: Target, href: '/dashboard/quests' },
  { label: 'profile', icon: UserCircle2, href: '/dashboard/profile' },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-hairline px-4 py-6 lg:flex">
      <Link to="/" className="px-2">
        <Logo />
      </Link>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                active
                  ? 'bg-cloud text-link'
                  : 'text-ink-soft hover:bg-cloud hover:text-ink'
              }`}
            >
              <item.icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => logout()}
        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-ink-soft transition-colors duration-200 hover:bg-cloud hover:text-error"
      >
        <LogOut size={19} />
        log out
      </button>

      <div className="mt-2 flex items-center gap-3 px-3 py-2 text-ink-soft">
        <MoreHorizontal size={19} />
        <span className="text-sm font-bold uppercase tracking-wide">more</span>
      </div>
    </aside>
  );
}
