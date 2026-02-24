import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, BookOpen, Trophy, User, Home, Fingerprint } from 'lucide-react';
import { useLanguage } from '../i18n';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: '/', labelKey: 'header.home' as const, icon: Home },
    { href: '/courses', labelKey: 'header.courses' as const, icon: BookOpen },
    { href: '/leaderboard', labelKey: 'header.leaderboard' as const, icon: Trophy },
    { href: '/dashboard', labelKey: 'header.dashboard' as const, icon: User },
    { href: '/identity', labelKey: 'header.identity' as const, icon: Fingerprint },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{t(item.labelKey)}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}