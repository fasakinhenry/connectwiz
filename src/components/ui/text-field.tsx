import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  trailing?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, trailing, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        <div
          className={cn(
            'flex items-center rounded-lg border-2 bg-(--color-cloud) px-4 transition-colors duration-200 focus-within:border-(--color-link) focus-within:bg-(--color-canvas)',
            error ? 'border-(--color-error)' : 'border-transparent'
          )}
        >
          <input
            ref={ref}
            id={inputId}
            placeholder={label}
            aria-label={label}
            className={cn(
              'peer h-14 w-full min-w-0 bg-transparent text-base font-semibold text-(--color-ink) outline-none placeholder:font-medium placeholder:text-(--color-ink-soft)',
              className
            )}
            {...props}
          />
          {trailing}
        </div>
        {error && <p className="mt-1.5 pl-1 text-xs font-semibold text-(--color-error)">{error}</p>}
      </div>
    );
  }
);
TextField.displayName = 'TextField';
