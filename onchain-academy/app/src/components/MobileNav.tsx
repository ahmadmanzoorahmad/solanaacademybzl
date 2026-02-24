'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Trophy, User, Fingerprint, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/provider';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { href: '/courses', icon: BookOpen, label: t('header.courses') },
    { href: '/leaderboard', icon: Trophy, label: t('header.leaderboard') },
    { href: '/identity', icon: Fingerprint, label: t('header.identity') },
    { href: '/dashboard', icon: User, label: t('header.dashboard') },
    { href: '/settings', icon: Settings, label: t('header.settings') },
  ];

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {open && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur p-6">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span className="text-lg">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
