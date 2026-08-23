import { Link } from 'react-router';
import { Check, Clock, UserPlus, MessageCircle } from 'lucide-react';
import { store, useConnectWizStore } from '@/services/mock';
import { cn } from '@/lib/cn';

export function ConnectButton({ personId, className }: { personId: string; className?: string }) {
  const state = useConnectWizStore();
  const status = state.connections[personId] ?? 'none';

  if (status === 'connected') {
    return (
      <Link
        to={`/dashboard/messages/${personId}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-pill border-2 border-hairline px-4 py-2 text-xs font-bold uppercase tracking-wide text-link transition-colors duration-200 hover:bg-cloud',
          className
        )}
      >
        <MessageCircle size={13} />
        message
      </Link>
    );
  }

  if (status === 'pending-outgoing') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-pill bg-cloud px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-soft',
          className
        )}
      >
        <Clock size={13} />
        pending
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        store.connectTo(personId);
      }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-on-primary transition-colors duration-200 hover:bg-primary-bright',
        className
      )}
    >
      <UserPlus size={13} />
      connect
    </button>
  );
}

export function ConnectionStatusBadge({ personId }: { personId: string }) {
  const state = useConnectWizStore();
  const status = state.connections[personId] ?? 'none';
  if (status !== 'connected') return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-link">
      <Check size={12} /> connected
    </span>
  );
}
