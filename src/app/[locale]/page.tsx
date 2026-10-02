import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { StructuredData } from '@/components/sections/StructuredData';
import { siteConfig } from '@/lib/siteConfig';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    alternates: {
      languages: {
        'fr': 'https://constantin-gadegbe.com/fr',
        'en': 'https://constantin-gadegbe.com/en',
      },
    },
    openGraph: {
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  
  return (
    <>
      <StructuredData />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}