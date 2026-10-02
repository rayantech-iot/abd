'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'gradient';
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'bg-border',
          orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
          variant === 'gradient' && 'bg-gradient-to-r from-transparent via-border to-transparent',
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';