'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { siteConfig } from '@/lib/siteConfig';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NeuralNetwork } from '@/components/animations/NeuralNetwork';
import { ArrowRight, Mail, MapPin, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Hero() {
  const { locale, t } = useLocale();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="outline" className="text-sm gap-1.5">
                <span className="font-mono">{t.hero.badge}</span>
              </Badge>
            </motion.span>

            <h1
              id="hero-title"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              {t.hero.title.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="mt-4 text-sm font-medium text-primary flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="hidden sm:inline">{t.hero.specializations}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                variant="primary"
                href={`/${locale}/#projects`}
                className="group w-full sm:w-auto"
              >
                {t.hero.ctaProjects}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                href={`/${locale}/#contact`}
                className="w-full sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                {t.hero.ctaContact}
              </Button>
            </motion.div>

            {siteConfig.isLookingForAlternance && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span>{t.hero.openToWork}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{siteConfig.location}</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-video max-w-xl mx-auto">
              <NeuralNetwork />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center gap-4 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg"
            >
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  <span className="relative rounded-full bg-primary" />
                </span>
                <span>Live visualization</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="font-mono text-primary">~25 nodes</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="font-mono text-primary">60fps</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="h-6 w-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}