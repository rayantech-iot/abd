'use client';

import { useLocale } from '@/lib/LocaleProvider';
import { siteConfig } from '@/lib/siteConfig';
import { useState } from 'react';

export function StructuredData() {
  const { locale } = useLocale();
  const [mounted] = useState(typeof window !== 'undefined');

  if (!mounted) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    alternateName: siteConfig.altTitle,
    description: siteConfig.tagline,
    url: `https://constantin-gadegbe.com/${locale}`,
    email: siteConfig.email,
    telephone: `+33${siteConfig.phone.replace(/^0/, '')}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    knowsAbout: [
      'Data Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Data Engineering',
      'Generative AI',
      'Business Intelligence',
      'Software Engineering',
      'Python',
      'TypeScript',
      'SQL',
      'Power BI',
      'Azure',
      'Docker',
    ],
    sameAs: [
      siteConfig.linkedin,
      siteConfig.social.github,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Open to opportunities',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Isp-Cnam',
        description: 'Master IA & Data',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Université de Nîmes',
        description: 'Licence Vision pour la Robotique Industrielle',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'IAI-Togo',
        description: 'Licence Génie Logiciels et Systèmes d\'Information',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}