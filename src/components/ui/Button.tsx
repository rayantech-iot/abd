'use client';

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type CommonButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & 
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
  };

export type ButtonProps = CommonButtonProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, href, type = 'button', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border bg-transparent hover:bg-accent',
      ghost: 'bg-transparent hover:bg-accent text-foreground',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
    };

    const isLink = !!href;
    const Comp = isLink ? 'a' : 'button';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elementRef = ref as any;

    return (
      <Comp
        ref={elementRef}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLink ? undefined : (disabled || loading)}
        href={href}
        type={isLink ? undefined : type}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';