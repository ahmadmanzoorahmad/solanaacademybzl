import { useState } from 'react';
import { Button } from '../components/ui/button';
import { LeaderboardRow } from '../components/LeaderboardRow';
import { Trophy, Filter, Loader2, Info } from 'lucide-react';
import { leaderboard, currentUser } from '../data/mockData';
import { useTranslation } from '../i18n/useTranslation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

type Timeframe = 'weekly' | 'monthly' | 'all-time';
type Track = 'all' | 'Solana Developer' | 'DeFi Specialist' | 'NFT Developer' | 'Rust Developer' | 'Security Specialist';

export function Leaderboard() {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState<Timeframe>('all-time');
  const [selectedTrack, setSelectedTrack] = useState<Track>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching when filters change
  const handleFilterChange = (newTimeframe?: Timeframe, newTrack?: Track) => {
    setIsLoading(true);
    setTimeout(() => {
      if (newTimeframe) setTimeframe(newTimeframe);
      if (newTrack) setSelectedTrack(newTrack);
      setIsLoading(false);
    }, 500);
  };

  // Filter leaderboard by track
  const filteredLeaderboard = selectedTrack === 'all' 
    ? leaderboard 
    : leaderboard.filter(entry => entry.track === selectedTrack);

  // Check if empty
  const isEmpty = filteredLeaderboard.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-8 py-8 md:py-12 max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#14F195] to-[#9945FF] mb-4">
            <Trophy className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
            {t('leaderboard.title')}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('leaderboard.subtitle')}
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6 md:mb-8 border-[#14F195]/20 bg-[#14F195]/5">
          <Info className="h-4 w-4 text-[#14F195]" />
          <AlertDescription className="text-sm">
            Leaderboard updates periodically from on-chain XP balances. Rankings are derived off-chain by indexing XP Token-2022 balances.
          </AlertDescription>
        </Alert>

        {/* Filters */}
        <Card className="p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Timeframe Filter */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={timeframe === 'weekly' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('weekly', undefined)}
                  disabled={isLoading}
                  className={timeframe === 'weekly' ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:from-[#14F195]/90 hover:to-[#9945FF]/90' : ''}
                >
                  {t('leaderboard.weekly')}
                </Button>
                <Button
                  variant={timeframe === 'monthly' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('monthly', undefined)}
                  disabled={isLoading}
                  className={timeframe === 'monthly' ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:from-[#14F195]/90 hover:to-[#9945FF]/90' : ''}
                >
                  {t('leaderboard.monthly')}
                </Button>
                <Button
                  variant={timeframe === 'all-time' ? 'default' : 'outline'}
                  onClick={() => handleFilterChange('all-time', undefined)}
                  disabled={isLoading}
                  className={timeframe === 'all-time' ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:from-[#14F195]/90 hover:to-[#9945FF]/90' : ''}
                >
                  {t('leaderboard.allTime')}
                </Button>
              </div>
            </div>

            {/* Track Filter */}
            <div className="flex items-center gap-2 md:w-auto w-full">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Select
                value={selectedTrack}
                onValueChange={(value) => handleFilterChange(undefined, value as Track)}
                disabled={isLoading}
              >
                <SelectTrigger className="md:w-[240px] w-full">
                  <SelectValue placeholder={t('leaderboard.filterByTrack')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('leaderboard.allTracks')}</SelectItem>
                  <SelectItem value="Solana Developer">Solana Developer</SelectItem>
                  <SelectItem value="DeFi Specialist">DeFi Specialist</SelectItem>
                  <SelectItem value="NFT Developer">NFT Developer</SelectItem>
                  <SelectItem value="Rust Developer">Rust Developer</SelectItem>
                  <SelectItem value="Security Specialist">Security Specialist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin text-[#14F195] mx-auto mb-4" />
              <p className="text-muted-foreground">{t('leaderboard.loading')}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && isEmpty && (
          <Card className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted mb-4">
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{t('leaderboard.empty')}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('leaderboard.emptyMessage')}
            </p>
          </Card>
        )}

        {/* Leaderboard List */}
        {!isLoading && !isEmpty && (
          <>
            <div className="space-y-3 md:space-y-4">
              {filteredLeaderboard.map((entry) => (
                <LeaderboardRow
                  key={entry.user.id}
                  entry={entry}
                  isCurrentUser={entry.user.id === currentUser.id}
                />
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                {t('leaderboard.showing')} {filteredLeaderboard.length} {t('leaderboard.learners')}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                {t('leaderboard.updateNote')}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
