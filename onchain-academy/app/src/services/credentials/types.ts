export type CredentialTrack = string;

export interface CredentialNft {
  id: string;
  mint: string;
  name: string;
  image?: string;
  description?: string;
  track?: CredentialTrack;
  level?: number;
  xp?: number;
  coursesCompleted?: number;
  owner: string;
  updatedAt?: string;
  metadataUri?: string;
  explorerUrl: string;
  verified: boolean;
}

export interface CredentialVerificationResult {
  mint: string;
  valid: boolean;
  owner?: string;
  name?: string;
  image?: string;
  track?: string;
  level?: number;
  xp?: number;
  coursesCompleted?: number;
  metadataUri?: string;
  explorerUrl: string;
  error?: string;
}

export interface CredentialsService {
  getCredentialsByWallet(walletPubkey: string): Promise<CredentialNft[]>;
  verifyCredential(mint: string): Promise<CredentialVerificationResult>;
}
