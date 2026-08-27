import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold text-sm select-none transition-all duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'btn-shimmer rounded-lg bg-(--color-primary) text-(--color-on-primary) border-0 border-b-4 border-(--color-primary-deep) px-7 py-3.5 hover:bg-(--color-primary-bright) active:translate-y-0.5 active:border-b-2',
        secondary:
          'rounded-lg bg-(--color-canvas) text-(--color-link) border-2 border-(--color-hairline) px-7 py-3.5 hover:bg-(--color-cloud) hover:border-(--color-link)',
        tertiary:
          'rounded-lg text-(--color-link) border-2 border-(--color-ink-soft) px-7 py-3.5 hover:text-(--color-link)',
        ghost:
          'rounded-lg bg-transparent text-(--color-ink-soft) px-5 py-3 hover:text-(--color-link)',
      },
      size: {
        md: '',
        sm: 'px-5 py-2.5! text-xs',
        lg: 'px-9 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';