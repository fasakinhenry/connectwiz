import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LocationStep({ onDone }: { onDone: (coords: { lat: number; lng: number } | null) => void }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => onDone({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setStatus('error'),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-md flex-col items-center text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cloud text-link">
        <MapPin size={26} />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">one last thing — where are you right now?</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        sharing your current location helps connectwiz find people who are actually near you when
        you search. we only use it for matching.
      </p>

      {status === 'error' && (
        <p className="mt-4 rounded-lg bg-error/10 px-4 py-3 text-xs font-semibold text-error">
          couldn't get your location. you can still search by city, or try again.
        </p>
      )}

      <div className="mt-6 flex w-full flex-col gap-3">
        <Button variant="primary" size="lg" className="w-full" onClick={useCurrentLocation} disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              locating...
            </>
          ) : (
            <>
              <MapPin size={16} />
              use my current location
            </>
          )}
        </Button>
        <button
          type="button"
          onClick={() => onDone(null)}
          className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft hover:text-link"
        >
          skip for now
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}
