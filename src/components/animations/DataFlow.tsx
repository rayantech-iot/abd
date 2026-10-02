'use client';

import { useEffect, useRef, useState } from 'react';
import { checkReducedMotion } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface DataFlowProps {
  steps: string[];
  className?: string;
  vertical?: boolean;
}

export function DataFlow({ steps, className, vertical = false }: DataFlowProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; progress: number; stepIndex: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return checkReducedMotion();
    }
    return false;
  });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          x: 0,
          y: 0,
          progress: 0,
          stepIndex: Math.floor(Math.random() * (steps.length - 1)),
        });
      }
      setParticles(newParticles);
    };

    const interval = setInterval(generateParticles, 1500);
    return () => clearInterval(interval);
  }, [steps.length, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || particles.length === 0) return;

    const animate = () => {
      setParticles(prev => {
        return prev.map(p => ({
          ...p,
          progress: Math.min(1, p.progress + 0.008),
        })).filter(p => p.progress < 1);
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, [particles.length, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      role="img"
      aria-label="Data flow animation"
    >
      <div className={cn('flex items-center justify-center gap-4', vertical ? 'flex-col' : 'flex-row')}>
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div
              className={cn(
                'flex items-center justify-center px-4 py-3 rounded-xl border-2 font-mono text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300',
                activeStep >= index
                  ? 'text-primary border-primary bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                  : 'text-muted-foreground border-border bg-muted/30'
              )}
            >
              {step}
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'relative overflow-hidden flex items-center',
                  vertical ? 'h-12 w-px' : 'w-24 h-px'
                )}
              >
                <div className="absolute bg-gradient-to-r from-transparent via-primary/40 to-transparent h-px w-full" />
                {particles
                  .filter(p => p.stepIndex === index)
                  .map((particle, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                      style={{
                        transform: vertical
                          ? `translateY(${particle.progress * 100}%)`
                          : `translateX(${particle.progress * 100}%)`,
                        opacity: particle.progress < 0.1 || particle.progress > 0.9 ? 0 : 1,
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}