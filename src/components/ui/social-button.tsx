import type { ReactNode } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';

interface SocialButtonProps {
  provider: 'google' | 'linkedin';
  onClick?: () => void;
  className?: string;
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.29-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <rect width="18" height="18" rx="3" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M5.4 7.2H3.3V14h2.1V7.2ZM4.35 6.3a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM14.7 10.1c0-2-1.07-2.9-2.5-2.9-1.15 0-1.67.63-1.95 1.08V7.2H8.15c.03.6 0 6.8 0 6.8h2.1v-3.8c0-.2.02-.4.08-.55.17-.4.55-.83 1.2-.83.85 0 1.19.65 1.19 1.6V14h2.1v-3.9Z"
      />
    </svg>
  );
}

const CONFIG: Record<SocialButtonProps['provider'], { label: string; icon: ReactNode }> = {
  google: { label: 'google', icon: <GoogleMark /> },
  linkedin: { label: 'linkedin', icon: <LinkedInMark /> },
};

export function SocialButton({ provider, onClick }: SocialButtonProps) {
  const { label, icon } = CONFIG[provider];

  return (
    <Button
      type="button"
      onClick={onClick}
      className={buttonVariants({ variant: 'secondary', className: 'w-full' })}
    >
      {icon}
      {label}
    </Button>
  );
}
