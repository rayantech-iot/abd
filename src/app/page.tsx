import { redirect } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';

export default function Home() {
  redirect(`/${siteConfig.i18n.defaultLocale}`);
}