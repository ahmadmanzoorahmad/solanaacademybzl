'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Fingerprint, Shield, ExternalLink, Wallet, CheckCircle, Info } from 'lucide-react';
import { nftAchievements } from '@/data/mock-data';
import { useServices } from '@/providers/ServicesProvider';
import { useTranslation } from '@/i18n/provider';
import { levelFromXp } from '@/services/xp';
import { shortenAddress } from '@/services/solana';
import { getHeliusApiKey } from '@/lib/env';
import { toast } from 'sonner';
import type { CredentialNft } from '@/services';

export default function DigitalIdentityPage() {
  const { t } = useTranslation();
  const { publicKey, connected } = useWallet();
  const { credentials: credentialsService, learningProgress } = useServices();
  const [credentials, setCredentials] = useState<CredentialNft[]>([]);
  const [totalXp, setTotalXp] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const earnedNFTs = nftAchievements.filter((a) => a.earned);
  const xpLevel = totalXp !== null ? levelFromXp(totalXp) : null;
  const hasVerified = credentials.some((c) => c.verified);
  const heliusConfigured = !!getHeliusApiKey();

  useEffect(() => {
    if (connected && publicKey) {
      const pubkey = publicKey.toBase58();
      setLoading(true);
      Promise.all([
        credentialsService.getCredentialsByWallet(pubkey).then(setCredentials),
        learningProgress.getTotalXp(pubkey).then(setTotalXp),
      ])
        .catch((err: Error) => {
          toast.error(`Failed to load identity data: ${err.message}`);
        })
        .finally(() => setLoading(false));
    } else {
      setTotalXp(null);
      setCredentials([]);
    }
  }, [connected, publicKey, credentialsService, learningProgress]);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
            <Fingerprint className="w-10 h-10" /> {t('identity.title')}
          </h1>
          {connected && hasVerified && (
            <Badge className="bg-[#14F195]/20 text-[#14F195] text-sm gap-1">
              <CheckCircle className="w-4 h-4" /> On-Chain Verified
            </Badge>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{t('identity.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">{earnedNFTs.length}</div>
          <p className="text-muted-foreground">{t('identity.nftAchievements')}</p>
        </Card>
        <Card className="p-6 text-center">
          {loading ? (
            <Skeleton className="h-9 w-16 mx-auto mb-1" />
          ) : (
            <div className="text-3xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
              {credentials.length}
            </div>
          )}
          <p className="text-muted-foreground">{t('identity.certificates')}</p>
        </Card>
        <Card className="p-6 text-center">
          {loading ? (
            <Skeleton className="h-9 w-24 mx-auto mb-1" />
          ) : (
            <>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                {totalXp !== null ? totalXp.toLocaleString() : '—'}
              </div>
              {connected && totalXp !== null && xpLevel !== null && (
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Badge variant="secondary" className="text-xs">Level {xpLevel}</Badge>
                  <Badge className="bg-[#14F195]/20 text-[#14F195] text-xs gap-1">
                    <CheckCircle className="w-3 h-3" /> On-Chain
                  </Badge>
                </div>
              )}
            </>
          )}
          <p className="text-muted-foreground">{t('identity.totalXp')}</p>
        </Card>
      </div>

      {!connected && (
        <Card className="p-8 mb-12 text-center border-dashed">
          <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{t('identity.connectWallet')}</p>
        </Card>
      )}

      <h2 className="text-2xl font-bold mb-6">My Credentials</h2>
      {!connected ? (
        <Card className="p-8 text-center border-dashed mb-12">
          <Wallet className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">Connect wallet to view on-chain credentials.</p>
        </Card>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-40 w-full mb-4 rounded-lg" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      ) : connected && !heliusConfigured && credentials.length === 0 ? (
        <Card className="p-8 text-center border-dashed mb-12">
          <Info className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">Helius key not configured — credentials view is Devnet-ready.</p>
          <p className="text-xs text-muted-foreground mt-2">Set NEXT_PUBLIC_HELIUS_API_KEY to enable on-chain credential fetching.</p>
        </Card>
      ) : credentials.length === 0 ? (
        <Card className="p-8 text-center border-dashed mb-12">
          <p className="text-muted-foreground">{t('identity.noCredentials')}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {credentials.map((cred) => (
            <Card key={cred.id} className="p-6 hover:border-primary transition-all">
              {cred.image && (
                <img src={cred.image} alt={cred.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#14F195]" />
                <h3 className="font-semibold truncate">{cred.name}</h3>
              </div>
              {cred.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{cred.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {cred.track && <Badge variant="secondary">{cred.track}</Badge>}
                {cred.level !== undefined && <Badge variant="outline">Level {cred.level}</Badge>}
                {cred.xp !== undefined && <Badge variant="outline">{cred.xp} XP</Badge>}
                {cred.coursesCompleted !== undefined && <Badge variant="outline">{cred.coursesCompleted} courses</Badge>}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">{shortenAddress(cred.mint)}</span>
                <div className="flex gap-1">
                  <Link href={`/verify/${cred.mint}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <CheckCircle className="w-3 h-3" /> Verify
                    </Button>
                  </Link>
                  <a href={cred.explorerUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <ExternalLink className="w-3 h-3" /> Explorer
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">{t('identity.nftAchievements')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {nftAchievements.map((nft) => (
          <Card key={nft.id} className={`p-6 ${!nft.earned ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{nft.icon}</span>
              <div>
                <h3 className="font-semibold">{nft.title}</h3>
                <Badge variant="secondary" className="capitalize">{nft.rarity}</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{nft.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{nft.xpReward} XP</span>
              {nft.earned ? <Badge className="bg-[#22C55E] text-white">{t('identity.earned')}</Badge> : <Badge variant="outline">{t('identity.locked')}</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
