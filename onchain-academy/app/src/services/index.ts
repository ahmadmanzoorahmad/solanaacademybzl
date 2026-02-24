import type { LearningProgressService } from './learningProgress/types';
import type { CredentialsService } from './credentials/types';
import type { LeaderboardService } from './leaderboard/types';
import type { AuthService } from './auth/types';
import { StubLearningProgressService } from './learningProgress/stub';
import { StubCredentialsService } from './credentials/stub';
import { StubLeaderboardService } from './leaderboard/stub';
import { StubAuthService } from './auth/stub';

export interface Services {
  learningProgress: LearningProgressService;
  credentials: CredentialsService;
  leaderboard: LeaderboardService;
  auth: AuthService;
}

export function createStubServices(): Services {
  return {
    learningProgress: new StubLearningProgressService(),
    credentials: new StubCredentialsService(),
    leaderboard: new StubLeaderboardService(),
    auth: new StubAuthService(),
  };
}

export type { LearningProgressService } from './learningProgress/types';
export type { LessonProgressRecord } from './learningProgress/types';
export type { CredentialsService, CredentialNft, CredentialVerificationResult, CredentialTrack } from './credentials/types';
export type { LeaderboardService, LeaderboardEntry, LeaderboardTimeframe } from './leaderboard/types';
export type { AuthService, AuthUser, AuthSession } from './auth/types';
