'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Database, BarChart3, Cpu, Code2, Zap, HardDrive, Server } from 'lucide-react';

const skillIcons = {
  'AI / ML': Sparkles,
  'Data': Database,
  'BI': BarChart3,
  'Generative AI': Cpu,
  'Software': Code2,
  'Automation': Zap,
  'Databases': HardDrive,
  'Infrastructure': Server,
};

export function Skills() {
  const { t } = useLocale();

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="skills-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.skills.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stack technique maîtrisée au fil des projets et expériences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.skills.categories.map((category, catIndex) => {
            const Icon = skillIcons[category.name as keyof typeof skillIcons] || Code2;
            
            return (
              <Card
                key={category.name}
                variant="outlined"
                hover
                className="group overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 + itemIndex * 0.03, duration: 0.3 }}
                      >
                        <Badge variant="outline" className="text-sm font-mono">
                          {item}
                        </Badge>
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Les niveaux d&apos;expertise varient selon les technologies — cette liste reflète les outils
            utilisés concrètement dans mes projets et expériences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}