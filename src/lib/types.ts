export interface Locale {
  code: 'fr' | 'en';
  label: string;
  flag: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  tags: string[];
  highlights: string[];
}

export interface ProjectItem {
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
    steps: ArchitectureStep[];
  };
}

export interface ArchitectureStep {
  label: string;
  type: 'start' | 'process' | 'service' | 'end';
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  subtitle?: string;
  school: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}