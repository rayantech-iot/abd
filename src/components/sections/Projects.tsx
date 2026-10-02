'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArchitectureDiagram } from '@/components/animations/ArchitectureDiagram';
import { DataFlow } from '@/components/animations/DataFlow';
import { CVDetectionDemo } from '@/components/animations/CVDetectionDemo';
import { cn } from '@/lib/utils';
import { ExternalLink, ArrowUpRight, X, Layers, Cpu, FileCode } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

interface ProjectType {
  id: number;
  number: string;
  title: string;
  category: string;
  date: string;
  description: string;
  technologies: string[];
  highlights: string[];
  metrics?: string[];
  company?: string;
  architecture: {
    steps: Array<{
      label: string;
      type: 'start' | 'process' | 'service' | 'end';
    }>;
  };
}

type ProjectTranslationKeys = {
  projects: {
    title: string;
    viewCaseStudy: string;
    backToProjects: string;
    items: ProjectType[];
  };
  contact: {
    form: {
      submit: string;
      success: string;
    };
  };
};

function getProjectVisual(project: ProjectType) {
  switch (project.id) {
    case 1:
      return (
        <ArchitectureDiagram
          steps={project.architecture.steps}
          className="my-6"
        />
      );
    case 2:
      return (
        <ArchitectureDiagram
          steps={project.architecture.steps}
          className="my-6"
        />
      );
    case 3:
      return (
        <DataFlow
          steps={project.architecture.steps.map(s => s.label)}
          vertical
          className="my-6"
        />
      );
    case 4:
      return <CVDetectionDemo className="my-6 aspect-video" />;
    case 5:
      return (
        <ArchitectureDiagram
          steps={project.architecture.steps}
          className="my-6"
        />
      );
    default:
      return (
        <ArchitectureDiagram
          steps={project.architecture.steps}
          className="my-6"
        />
      );
  }
}

function ProjectCard({ project, t, onClick }: { project: ProjectType; t: ProjectTranslationKeys; onClick: () => void }) {
  return (
    <Card
      variant="outlined"
      hover
      className="group overflow-hidden h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="font-mono text-primary text-sm">{project.number}</span>
          <Badge variant="secondary" className="ml-2 mt-1 inline-block text-xs">
            {project.category}
          </Badge>
        </div>
        {project.company && (
          <Badge variant="outline" className="text-xs font-mono">
            {project.company}
          </Badge>
        )}
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 6).map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
        {project.technologies.length > 6 && (
          <Badge variant="outline" className="text-xs text-muted-foreground">
            +{project.technologies.length - 6}
          </Badge>
        )}
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.metrics.map((metric) => (
            <Badge key={metric} variant="success" className="text-xs font-mono">
              {metric}
            </Badge>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between group"
          onClick={onClick}
        >
          <span>{t.projects.viewCaseStudy}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-1px]" />
        </Button>
      </div>
    </Card>
  );
}

function ProjectModal({ project, t, onClose }: { project: ProjectType; t: ProjectTranslationKeys; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl border border-border shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/50 bg-background/95 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-primary text-lg">{project.number}</span>
            <h3 id="modal-title" className="text-xl font-bold text-foreground">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-sm">{project.category}</Badge>
            <Badge variant="outline" className="text-sm font-mono">{project.date}</Badge>
            {project.company && (
              <Badge variant="outline" className="text-sm font-mono">{project.company}</Badge>
            )}
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground/90">
            <p className="leading-relaxed">{project.description}</p>
          </div>

          {getProjectVisual(project)}

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Points clés
              </h4>
              <ul className="space-y-2" role="list">
                {project.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm text-muted-foreground/90 leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50" />
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" href="#">
              <GithubIcon className="h-4 w-4" />
              Code
            </Button>
            <Button variant="outline" href="#">
              <ExternalLink className="h-4 w-4" />
              Demo
            </Button>
            <Button variant="outline" href="#">
              <FileCode className="h-4 w-4" />
              Case Study
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { locale, t } = useLocale();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = t.projects.items as ProjectType[];
  const projectT = t as ProjectTranslationKeys;

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 lg:py-32 bg-muted/30"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="projects-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.projects.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {projects.length} projets majeurs — Architecture, données, IA et ingénierie logicielle
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectCard
                project={project}
                t={projectT}
                onClick={() => setSelectedProject(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={projects.find(p => p.id === selectedProject)!}
            t={projectT}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}