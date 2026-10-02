'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { siteConfig } from '@/lib/siteConfig';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';

export function Contact() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    else if (formData.message.trim().length < 20) newErrors.message = 'Le message doit contenir au moins 20 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, replace with actual API call:
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 lg:py-32"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50">
                <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t.contact.email}</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50">
                <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t.contact.phone}</h3>
                  <a
                    href={`tel:+33${siteConfig.phone.replace(/^0/, '')}`}
                    className="mt-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50">
                <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <LinkedinIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t.contact.linkedin}</h3>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {siteConfig.linkedin}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button
                  size="lg"
                  variant="primary"
                  href={`mailto:${siteConfig.email}?subject=Portfolio Contact`}
                  className="w-full"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t.contact.sendEmail}
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card variant="outlined" className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label={t.contact.form.name}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Votre nom"
                      required
                      autoComplete="name"
                    />
                    <Input
                      label={t.contact.form.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="votre@email.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  
                  <Input
                    label={t.contact.form.subject}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="Sujet du message"
                    required
                  />
                  
                  <Textarea
                    label={t.contact.form.message}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Décrivez votre projet, votre besoin..."
                    required
                    rows={5}
                  />

                  <p className="text-xs text-muted-foreground/70 text-center">
                    {t.contact.form.demoNotice}
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    className="w-full"
                    loading={status === 'submitting'}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {t.contact.form.success}
                      </>
                    ) : (
                      <>
                        {t.contact.form.submit}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {t.contact.form.error}
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}