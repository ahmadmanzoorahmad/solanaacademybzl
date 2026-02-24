import type { CredentialsService, CredentialNft, CredentialVerificationResult } from './types';
import { fetchCredentialsByWallet, verifyCredentialByMint } from './heliusDas';

export class OnchainCredentialsService implements CredentialsService {
  async getCredentialsByWallet(walletPubkey: string): Promise<CredentialNft[]> {
    return fetchCredentialsByWallet(walletPubkey);
  }

  async verifyCredential(mint: string): Promise<CredentialVerificationResult> {
    return verifyCredentialByMint(mint);
  }
}
