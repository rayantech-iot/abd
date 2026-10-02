'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Building2, Code, Server, Brain } from 'lucide-react';

const experienceIcons = {
  'VERT MARINE': Brain,
  'Développement Web': Code,
  'SUNU Bank Togo': Server,
};

export function Experience() {
  const { t } = useLocale();

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="experience-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />
          
          {t.experience.items.map((item, index) => {
            const Icon = experienceIcons[item.company as keyof typeof experienceIcons] || Building2;
            
            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                <div className="absolute left-4 top-1 flex h-10 w-10 items-center justify-center rounded-xl bg-background border-2 border-primary/30 z-10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                
                <div className="bg-background border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="outline" className="font-mono text-xs">
                      {item.company}
                    </Badge>
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-mono text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-mono">{item.period}</p>
                  
                  <ul className="mt-4 space-y-3" role="list">
                    {item.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + i * 0.08, duration: 0.4 }}
                        className="flex items-start gap-3 text-sm text-muted-foreground/90 leading-relaxed"
                      >
                        <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}