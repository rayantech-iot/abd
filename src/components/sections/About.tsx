'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { DataFlow } from '@/components/animations/DataFlow';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export function About() {
  const { t } = useLocale();

  const expertiseFlow = [
    'Software Engineering',
    'Computer Vision',
    'Data Science',
    'Machine Learning',
    'Data Engineering',
    'Generative AI',
    'Intelligent Systems',
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 bg-muted/30"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="about-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.about.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Expertise</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.about.expertise.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <h3 className="text-xl font-semibold text-foreground mb-6">Évolution technologique</h3>
            <DataFlow steps={expertiseFlow} vertical />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Parcours</h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary to-primary/30" />
            {t.about.timeline.map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                <div className="absolute left-4 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono text-xs font-bold border-4 border-background z-10">
                  {index + 1}
                </div>
                <div className="bg-background border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 text-sm text-primary font-medium mb-2">
                    <span className="font-mono">{item.period}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-1 text-muted-foreground">{item.school}</p>
                  <p className="mt-2 text-sm text-muted-foreground/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}