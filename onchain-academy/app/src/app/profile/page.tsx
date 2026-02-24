'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Award, Github, Twitter, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import { currentUser, achievements } from '@/data/mock-data';
import { AchievementBadge } from '@/components/AchievementBadge';
import { useServices } from '@/providers/ServicesProvider';
import { shortenAddress } from '@/services/solana';
import type { CredentialNft } from '@/services';

export default function ProfilePage() {
  const { publicKey, connected } = useWallet();
  const { credentials: credentialsService } = useServices();
  const [credentials, setCredentials] = useState<CredentialNft[]>([]);
  const [loadingCreds, setLoadingCreds] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      setLoadingCreds(true);
      credentialsService
        .getCredentialsByWallet(publicKey.toBase58())
        .then(setCredentials)
        .finally(() => setLoadingCreds(false));
    } else {
      setCredentials([]);
    }
  }, [connected, publicKey, credentialsService]);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <Card className="p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{currentUser.name}</h1>
            <p className="text-muted-foreground">@{currentUser.username}</p>
            <p className="mt-2 text-muted-foreground">{currentUser.bio}</p>
            <div className="flex gap-3 mt-3 justify-center md:justify-start">
              {currentUser.socialLinks.twitter && (
                <a href={currentUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground" /></a>
              )}
              {currentUser.socialLinks.github && (
                <a href={currentUser.socialLinks.github} target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-muted-foreground hover:text-foreground" /></a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div><div className="text-2xl font-bold">{currentUser.level}</div><div className="text-sm text-muted-foreground">Level</div></div>
            <div><div className="text-2xl font-bold">{currentUser.xp.toLocaleString()}</div><div className="text-sm text-muted-foreground">XP</div></div>
            <div><div className="text-2xl font-bold">#{currentUser.rank}</div><div className="text-sm text-muted-foreground">Rank</div></div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Award className="w-6 h-6" /> Achievements</h2>
          <div className="space-y-3">
            {achievements.map((a) => <AchievementBadge key={a.id} achievement={a} />)}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {Object.entries(currentUser.skills).map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{skill}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#14F195] to-[#9945FF]" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6" /> On-Chain Credentials
      </h2>
      {!connected ? (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">Connect your wallet to view on-chain credentials.</p>
        </Card>
      ) : loadingCreds ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-32 w-full mb-3 rounded-lg" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      ) : credentials.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No on-chain credentials found. Complete courses to earn certificates!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred) => (
            <Card key={cred.id} className="p-6">
              {cred.image && (
                <img src={cred.image} alt={cred.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              )}
              <h3 className="font-semibold mb-1">{cred.name}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cred.track && <Badge variant="secondary" className="text-xs">{cred.track}</Badge>}
                {cred.level !== undefined && <Badge variant="outline" className="text-xs">Lvl {cred.level}</Badge>}
                {cred.verified && <Badge className="bg-[#14F195]/20 text-[#14F195] text-xs gap-0.5"><CheckCircle className="w-2.5 h-2.5" /> Verified</Badge>}
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="font-mono">{shortenAddress(cred.mint)}</span>
                <div className="flex gap-1">
                  <Link href={`/verify/${cred.mint}`}>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">Verify</Button>
                  </Link>
                  <a href={cred.explorerUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="h-6 text-xs"><ExternalLink className="w-3 h-3" /></Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
