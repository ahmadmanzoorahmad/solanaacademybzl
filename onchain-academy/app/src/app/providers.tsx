'use client';

import { ThemeProvider } from 'next-themes';
import { I18nProvider } from '@/i18n/provider';
import { SolanaProvider } from '@/providers/SolanaProvider';
import { ServicesProvider } from '@/providers/ServicesProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <I18nProvider>
        <SolanaProvider>
          <ServicesProvider>
            {children}
          </ServicesProvider>
        </SolanaProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
