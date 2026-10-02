'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { siteConfig } from './siteConfig';

export type Locale = 'fr' | 'en';

type TranslationKeys = {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string[];
    subtitle: string;
    specializations: string;
    ctaProjects: string;
    ctaContact: string;
    openToWork: string;
  };
  about: {
    title: string;
    description: string;
    expertise: string[];
    timeline: Array<{
      period: string;
      title: string;
      school: string;
      description: string;
    }>;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      tags: string[];
      highlights: string[];
    }>;
  };
  projects: {
    title: string;
    viewCaseStudy: string;
    backToProjects: string;
    items: Array<{
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
    }>;
  };
  skills: {
    title: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  education: {
    title: string;
    items: Array<{
      period: string;
      title: string;
      subtitle?: string;
      school: string;
    }>;
  };
  languages: {
    title: string;
    items: Array<{
      name: string;
      level: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    linkedin: string;
    sendEmail: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      success: string;
      error: string;
      demoNotice: string;
    };
  };
  footer: {
    copyright: string;
    title: string;
    subtitle: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  ui: {
    downloadCV: string;
    loading: string;
    scrollDown: string;
  };
};

const defaultTranslations: TranslationKeys = {
  nav: { home: 'Accueil', about: 'À propos', experience: 'Expérience', projects: 'Projets', skills: 'Compétences', education: 'Formation', contact: 'Contact' },
  hero: { badge: 'AI & Data Engineer', title: ['Data Science.', 'Intelligence Artificielle.', 'Machine Learning.'], subtitle: "Je conçois des solutions intelligentes à l'intersection de la Data, de l'IA et du Software Engineering.", specializations: 'Computer Vision • Data Engineering • Generative AI', ctaProjects: 'Explorer mes projets', ctaContact: 'Me contacter', openToWork: 'Open to opportunities • France' },
  about: { title: 'À propos', description: 'Profil issu du génie logiciel et des systèmes d\'information, progressivement spécialisé dans la vision industrielle, la Data Science, le Machine Learning, la Data Engineering et l\'IA générative.', expertise: ['Computer Vision', 'Data Engineering', 'Machine Learning', 'Generative AI', 'BI / Analytics', 'Software Engineering'], timeline: [] },
  experience: { title: 'Expérience', items: [] },
  projects: { title: 'Projets', viewCaseStudy: 'Voir le case study', backToProjects: 'Retour aux projets', items: [] },
  skills: { title: 'Expertise Technique', categories: [] },
  education: { title: 'Formation', items: [] },
  languages: { title: 'Langues', items: [] },
  contact: { title: 'Construisons quelque chose d\'intelligent.', subtitle: 'Une problématique Data, IA, Computer Vision ou Software Engineering ? Parlons-en.', email: 'Email', phone: 'Téléphone', linkedin: 'LinkedIn', sendEmail: 'Envoyer un email', form: { name: 'Nom', email: 'Email', subject: 'Sujet', message: 'Message', submit: 'Envoyer', success: 'Message envoyé avec succès !', error: 'Une erreur est survenue. Veuillez réessayer.', demoNotice: 'Mode démo : aucun backend configuré. Le formulaire simule l\'envoi.' } },
  footer: { copyright: '© {year} Constantin GADEGBE', title: 'AI & Data Engineer', subtitle: 'Data Science • Artificial Intelligence • Machine Learning' },
  theme: { light: 'Clair', dark: 'Sombre', system: 'Système' },
  ui: { downloadCV: 'Télécharger CV', loading: 'Chargement...', scrollDown: 'Descendre' },
};

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio-locale') as Locale | null;
    if (stored && siteConfig.i18n.locales.includes(stored)) {
      return stored;
    }
  }
  return 'fr';
}

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; t: TranslationKeys } | undefined>(undefined);

async function loadTranslations(locale: Locale): Promise<TranslationKeys> {
  const mod = await import(`../locales/${locale}/common`);
  return mod.common;
}

export function LocaleProvider({ children, defaultLocale = 'fr' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [translations, setTranslations] = useState<TranslationKeys>(defaultTranslations);
  const [mounted] = useState(typeof window !== 'undefined');

  useEffect(() => {
    loadTranslations(locale).then(setTranslations);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('portfolio-locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}