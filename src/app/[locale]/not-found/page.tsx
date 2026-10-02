'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/LocaleProvider';
import { Button } from '@/components/ui/Button';
import { WifiOff, Home, RotateCcw } from 'lucide-react';

export default function NotFound() {
  const { locale } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="relative inline-flex items-center justify-center">
            <WifiOff className="h-24 w-24 text-muted-foreground/30" />
            <span className="absolute text-6xl font-bold text-primary/20 font-mono">404</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4"
        >
          Signal not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-lg text-muted-foreground mb-8"
        >
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href={`/${locale}`}
          >
            <Home className="mr-2 h-4 w-4" />
            Retour au portfolio
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Page précédente
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}