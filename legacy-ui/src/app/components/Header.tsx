import { Link } from 'react-router';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { WalletButton } from './WalletButton';
import { MobileNav } from './MobileNav';
import { BookOpen, Trophy, User, Settings, Fingerprint } from 'lucide-react';
import { useLanguage } from '../i18n';

export function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-[1320px] mx-auto">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#14F195] to-[#9945FF] rounded-lg" />
            <span className="font-bold text-xl hidden sm:inline">Superteam Academy</span>
            <span className="font-bold text-xl sm:hidden">STA</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/courses">
            <Button variant="ghost" className="gap-2">
              <BookOpen className="w-4 h-4" />
              {t('header.courses')}
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="ghost" className="gap-2">
              <Trophy className="w-4 h-4" />
              {t('header.leaderboard')}
            </Button>
          </Link>
          <Link to="/identity">
            <Button variant="ghost" className="gap-2">
              <Fingerprint className="w-4 h-4" />
              {t('header.identity')}
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" className="gap-2">
              <User className="w-4 h-4" />
              {t('header.dashboard')}
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <WalletButton />
          <Link to="/settings" className="md:hidden">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}