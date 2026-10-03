'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArchitectureStep } from '@/lib/types';

interface ArchitectureDiagramProps {
  steps: ArchitectureStep[];
  className?: string;
  vertical?: boolean;
}

export function ArchitectureDiagram({ steps, className, vertical = false }: ArchitectureDiagramProps) {
  const [animatedSteps, setAnimatedSteps] = useState(() => new Set<number>());
  const observerRef = useRef<IntersectionObserver>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimatedSteps(new Set(steps.map((_, i) => i)));
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimatedSteps(prev => {
              const next = new Set(prev);
              steps.forEach((_, i) => {
                setTimeout(() => {
                  next.add(i);
                  setAnimatedSteps(new Set(next));
                }, i * 200);
              });
              return next;
            });
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [steps, shouldReduceMotion]);

  const getStepColor = (type: ArchitectureStep['type']) => {
    switch (type) {
      case 'start': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'end': return 'text-purple-400 border-purple-400 bg-purple-400/10';
      case 'service': return 'text-blue-400 border-blue-400 bg-blue-400/10';
      case 'process': return 'text-indigo-400 border-indigo-400 bg-indigo-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      role="img"
      aria-label={vertical ? 'Architecture diagram vertical flow' : 'Architecture diagram horizontal flow'}
    >
      <div className={cn('flex items-center justify-center gap-2', vertical ? 'flex-col' : 'flex-row')}>
        {steps.map((step, index) => {
          const isAnimated = animatedSteps.has(index);
          
          return (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center transition-all duration-500',
                isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-xl border-2 shadow-lg transition-all duration-300',
                  vertical ? 'px-4 py-3 min-w-[140px]' : 'px-5 py-3 min-w-[130px]',
                  getStepColor(step.type)
                )}
              >
                <span className="font-mono text-sm font-semibold tracking-wide whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'relative overflow-hidden',
                    vertical ? 'w-px h-8' : 'w-8 h-px',
                    isAnimated ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <div
                    className={cn(
                      'absolute bg-gradient-to-r from-primary/30 via-primary to-primary/30 animate-pulse',
                      vertical ? 'w-px h-4 left-0' : 'h-px w-8 top-0'
                    )}
                    style={{
                      animationDelay: `${index * 150 + 300}ms`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}