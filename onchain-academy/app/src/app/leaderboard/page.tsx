'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Flame, Trophy, Info } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTranslation } from '@/i18n/provider';
import { useServices } from '@/providers/ServicesProvider';
import { shortenAddress } from '@/services/solana';
import { getHeliusApiKey } from '@/lib/env';
import { toast } from 'sonner';
import type { LeaderboardEntry, LeaderboardTimeframe } from '@/services';

const TIMEFRAMES: { key: LeaderboardTimeframe; label: string }[] = [
  { key: 'weekly', label: 'leaderboard.weekly' },
  { key: 'monthly', label: 'leaderboard.monthly' },
  { key: 'all', label: 'leaderboard.allTime' },
];

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const { publicKey, connected } = useWallet();
  const { leaderboard: leaderboardService } = useServices();
  const [timeFrame, setTimeFrame] = useState<LeaderboardTimeframe>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const heliusConfigured = !!getHeliusApiKey();

  useEffect(() => {
    setLoading(true);
    leaderboardService
      .getLeaderboard(timeFrame)
      .then(setEntries)
      .catch((err: Error) => {
        toast.error(`Failed to load leaderboard: ${err.message}`);
        setEntries([]);
      })
      .finally(() => setLoading(false));
  }, [timeFrame, leaderboardService]);

  useEffect(() => {
    if (publicKey) {
      leaderboardService.getUserRank(publicKey.toBase58()).then(setUserRank);
    }
  }, [publicKey, leaderboardService]);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
          <Trophy className="w-10 h-10" /> {t('leaderboard.title')}
        </h1>
        <p className="text-lg text-muted-foreground">{t('leaderboard.subtitle')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2">
          {TIMEFRAMES.map((tf) => (
            <Button
              key={tf.key}
              variant={timeFrame === tf.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFrame(tf.key)}
              className={timeFrame === tf.key ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] border-0' : ''}
            >
              {t(tf.label)}
            </Button>
          ))}
        </div>
      </div>

      {connected && publicKey && userRank > 0 && (
        <Card className="p-4 mb-6 bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 border-[#14F195]/20">
          <p className="text-sm">
            {t('leaderboard.you')}: <span className="font-bold text-lg">#{userRank}</span> — <span className="font-mono text-xs text-muted-foreground">{shortenAddress(publicKey.toBase58())}</span>
          </p>
        </Card>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">{t('leaderboard.rank')}</TableHead>
              <TableHead>{t('leaderboard.user')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('leaderboard.wallet')}</TableHead>
              <TableHead className="text-right">{t('leaderboard.xp')}</TableHead>
              <TableHead className="text-right hidden sm:table-cell">{t('leaderboard.level')}</TableHead>
              <TableHead className="text-right hidden sm:table-cell">{t('leaderboard.streak')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                  <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <Info className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {!heliusConfigured
                        ? 'Leaderboard indexer not configured. Set NEXT_PUBLIC_HELIUS_API_KEY to enable.'
                        : t('leaderboard.empty')}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => {
                const isCurrentUser = publicKey && entry.wallet === publicKey.toBase58();
                return (
                  <TableRow
                    key={entry.rank}
                    className={`transition-colors ${isCurrentUser ? 'bg-[#14F195]/5 font-medium' : 'hover:bg-muted/50'}`}
                  >
                    <TableCell>
                      {entry.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          entry.rank === 1
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                            : entry.rank === 2
                              ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                              : 'bg-gradient-to-br from-amber-600 to-amber-800'
                        }`}>
                          {entry.rank}
                        </div>
                      ) : (
                        <span className="text-muted-foreground pl-2">{entry.rank}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          {entry.avatarUrl && <AvatarImage src={entry.avatarUrl} />}
                          <AvatarFallback className="text-xs">
                            {entry.displayName ? entry.displayName[0] : entry.wallet.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[120px] sm:max-w-none">
                            {entry.displayName || shortenAddress(entry.wallet)}
                          </span>
                          {isCurrentUser && (
                            <Badge variant="secondary" className="text-xs shrink-0">{t('leaderboard.you')}</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-xs">
                      {shortenAddress(entry.wallet)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                        {entry.xp.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{entry.level}</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      {entry.streak !== undefined ? (
                        <span className="flex items-center justify-end gap-1">
                          <Flame className="w-3 h-3 text-orange-500" />{entry.streak}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      <p className="text-xs text-muted-foreground text-center mt-6">
        Leaderboard is computed off-chain using indexed XP balances.
      </p>
    </div>
  );
}
