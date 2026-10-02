'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export function Education() {
  const { t } = useLocale();

  return (
    <section
      id="education"
      className="py-20 sm:py-28 lg:py-32 bg-muted/30"
      aria-labelledby="education-title"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="education-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.education.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Parcours académique orienté IA, Data et Génie Logiciel
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary to-primary/30" />
          
          {t.education.items.map((item, index) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative pl-16 pb-12 last:pb-0"
            >
              <div className="absolute left-4 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground z-10">
                <GraduationCap className="h-5 w-5" />
              </div>
              
              <Card variant="outlined" hover className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="font-mono text-sm">
                      {item.period}
                    </Badge>
                    {index === 0 && (
                      <Badge variant="outline" className="text-xs font-mono">
                        En cours
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  {item.subtitle && (
                    <p className="mt-1 text-primary font-medium">{item.subtitle}</p>
                  )}
                  <p className="mt-2 text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {item.school}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Langues</h3>
          <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto">
            {t.languages.items.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center justify-center gap-4 p-6 rounded-xl bg-background border border-border/50"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{lang.name}</p>
                  <p className="text-sm text-muted-foreground">{lang.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}