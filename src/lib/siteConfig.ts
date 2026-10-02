export const siteConfig = {
  name: 'Constantin GADEGBE',
  title: 'Data Science | Intelligence Artificielle | Machine & Deep Learning',
  altTitle: 'AI & Data Engineer',
  tagline: "Je conçois des solutions intelligentes à l'intersection de la Data, de l'IA et du Software Engineering.",
  specializations: ['Computer Vision', 'Data Engineering', 'Generative AI'],
  
  email: 'gadegbeabednego@gmail.com',
  phone: '0758330140',
  linkedin: 'https://linkedin.com/in/constantin-gadegbe',
  location: 'France',
  mobility: 'Ouvert à la mobilité',
  
  isLookingForWork: true,
  isLookingForAlternance: true,
  availabilityMessage: 'Alternance de 24 mois à partir de septembre 2026 — 1 semaine en formation / 3 semaines en entreprise',
  
  cvUrl: '/cv.pdf',
  
  social: {
    linkedin: 'https://linkedin.com/in/constantin-gadegbe',
    github: 'https://github.com/constantin-gadegbe',
  },
  
  seo: {
    title: 'Constantin GADEGBE — AI & Data Engineer | Machine Learning | Data Science',
    description: 'Portfolio de Constantin GADEGBE, AI & Data Engineer spécialisé en Computer Vision, Data Engineering, Machine Learning et IA Générative. Construction de systèmes intelligents reliant données, modèles et applications.',
    ogImage: '/og-image.png',
  },
  
  theme: {
    default: 'system',
    storageKey: 'portfolio-theme',
  },
  
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
  },
} as const;

export type SiteConfig = typeof siteConfig;