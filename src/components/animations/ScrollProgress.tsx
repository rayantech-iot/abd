'use client';

import { useEffect, useState } from 'react';
import { checkReducedMotion } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ScrollProgress({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0);
  const [shouldReduceMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return checkReducedMotion();
    }
    return false;
  });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(Math.min(1, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      className={cn('fixed top-0 left-0 z-50 h-1 w-full pointer-events-none', className)}
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/40 origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}