'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeProvider';
import { useLocale } from '@/lib/LocaleProvider';
import { siteConfig } from '@/lib/siteConfig';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Sun, Moon, Monitor, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#home', labelKey: 'home' },
  { href: '#about', labelKey: 'about' },
  { href: '#experience', labelKey: 'experience' },
  { href: '#projects', labelKey: 'projects' },
  { href: '#skills', labelKey: 'skills' },
  { href: '#education', labelKey: 'education' },
  { href: '#contact', labelKey: 'contact' },
] as const;

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted] = useState(typeof window !== 'undefined');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeIcons = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    system: <Monitor className="h-5 w-5" />,
  };

  const themeLabels = {
    light: t.theme.light,
    dark: t.theme.dark,
    system: t.theme.system,
  };

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md" aria-label="Navigation principale">
        <div className="mx-auto max-w-7xl px-4 h-full" />
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300',
        'border-b border-border/50',
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-background/80 backdrop-blur-md'
      )}
      aria-label={t.nav.home}
    >
      <div className="mx-auto max-w-7xl px-4 h-full">
        <div className="flex h-full items-center justify-between">
          <Link
            href={`/${locale}/#home`}
            className="flex items-center gap-2 font-semibold text-lg text-foreground hover:opacity-80 transition-opacity"
            aria-label={`${siteConfig.name} - Accueil`}
          >
            <span className="font-mono text-primary">CG</span>
            <span className="hidden sm:block">{siteConfig.name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-width hover:after:w-full"
              >
                {t.nav[item.labelKey]}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border/50" role="group" aria-label={t.theme.system}>
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={cn(
                    'relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                    theme === t
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  aria-pressed={theme === t}
                  aria-label={themeLabels[t]}
                >
                  {themeIcons[t]}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border/50" role="group" aria-label="Language">
              {siteConfig.i18n.locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l as 'fr' | 'en')}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                    locale === l
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  aria-pressed={locale === l}
                  aria-label={l === 'fr' ? 'Français' : 'English'}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              variant="primary"
              href={`/${locale}/#contact`}
            >
              {t.hero.ctaContact}
            </Button>

            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-4 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-2" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav[item.labelKey]}
                </Link>
              ))}
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2" role="group" aria-label={t.theme.system}>
                  {(['light', 'dark', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={cn(
                        'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                        theme === t
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                      aria-pressed={theme === t}
                    >
                      {themeLabels[t]}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2" role="group" aria-label="Language">
                  {siteConfig.i18n.locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLocale(l as 'fr' | 'en')}
                      className={cn(
                        'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                        locale === l
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                      aria-pressed={locale === l}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="sm"
                  variant="primary"
                  href={`/${locale}/#contact`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.hero.ctaContact}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}