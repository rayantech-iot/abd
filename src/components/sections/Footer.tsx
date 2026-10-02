'use client';

import { useLocale } from '@/lib/LocaleProvider';
import { siteConfig } from '@/lib/siteConfig';
import { formatYear } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer
      className="border-t border-border/50 bg-muted/30"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-primary text-xl">CG</span>
              <span className="font-semibold text-lg text-foreground">{siteConfig.name}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              {siteConfig.tagline}
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{t.footer.title}</span>
              <span>•</span>
              <span>Data Science</span>
              <span>•</span>
              <span>Artificial Intelligence</span>
              <span>•</span>
              <span>Machine Learning</span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex flex-col gap-2" aria-label="Liens sociaux">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </nav>

            <p className="text-sm text-muted-foreground/70">
              {t.footer.copyright.replace('{year}', formatYear().toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}