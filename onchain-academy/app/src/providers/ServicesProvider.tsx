'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { type Services, createStubServices } from '@/services';
import { OnchainLearningProgressService } from '@/services/learningProgress/onchain';
import { OnchainCredentialsService } from '@/services/credentials/onchain';
import { StubCredentialsService } from '@/services/credentials/stub';
import { HeliusLeaderboardService } from '@/services/leaderboard/helius';
import { StubLeaderboardService } from '@/services/leaderboard/stub';
import { StubAuthService } from '@/services/auth/stub';
import { getHeliusApiKey } from '@/lib/env';

const ServicesContext = createContext<Services | null>(null);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const { connection } = useConnection();
  const { connected } = useWallet();

  const services = useMemo(() => {
    const heliusKey = getHeliusApiKey();

    if (connected) {
      return {
        learningProgress: new OnchainLearningProgressService(connection),
        credentials: heliusKey ? new OnchainCredentialsService() : new StubCredentialsService(),
        leaderboard: heliusKey ? new HeliusLeaderboardService() : new StubLeaderboardService(),
        auth: new StubAuthService(),
      };
    }

    return {
      ...createStubServices(),
      leaderboard: heliusKey ? new HeliusLeaderboardService() : new StubLeaderboardService(),
    };
  }, [connection, connected]);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices(): Services {
  const ctx = useContext(ServicesContext);
  if (!ctx) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return ctx;
}
