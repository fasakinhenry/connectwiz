import { Helmet } from 'react-helmet-async';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { SEED_EVENTS, resolvePerson, store, useConnectWizStore } from '@/services/mock';

export default function EventsPage() {
  const state = useConnectWizStore();

  return (
    <>
      <Helmet>
        <title>events — connectwiz</title>
      </Helmet>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-ink">events</h1>
        <p className="mt-1 text-sm text-ink-soft">see who you might want to meet before you show up.</p>

        <div className="mt-6 flex flex-col gap-4">
          {SEED_EVENTS.map((event) => {
            const going = Boolean(state.eventRsvps[event.id]);
            const attendees = event.attendeeIds.map(resolvePerson).filter(Boolean);
            return (
              <div key={event.id} className="rounded-lg border-2 border-hairline p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-link">
                      <CalendarDays size={13} />
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <h2 className="mt-1.5 text-lg font-bold text-ink">{event.title}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                      <MapPin size={12} />
                      {event.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => store.toggleEventRsvp(event.id)}
                    className={`shrink-0 rounded-pill px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                      going ? 'border-2 border-hairline text-ink-soft hover:border-error hover:text-error' : 'bg-primary text-on-primary hover:bg-primary-bright'
                    }`}
                  >
                    {going ? "you're going" : 'rsvp'}
                  </button>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{event.description}</p>

                {attendees.length > 0 && (
                  <div className="mt-4 border-t border-hairline pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-link">people you might want to meet</p>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {attendees.map((person) => (
                        <Link
                          key={person!.id}
                          to={`/dashboard/people/${person!.id}`}
                          className="flex items-center gap-2 rounded-pill border-2 border-hairline px-2.5 py-1.5 transition-colors duration-200 hover:border-link"
                        >
                          <img src={person!.avatarUrl} alt="" className="h-6 w-6 rounded-full bg-cloud" />
                          <span className="text-xs font-bold text-ink">{person!.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
