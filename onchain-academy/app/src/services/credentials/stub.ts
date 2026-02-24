import type { CredentialsService, CredentialNft, CredentialVerificationResult } from './types';
import { getExplorerUrl } from '@/services/solana';

const STUB_CREDENTIALS: CredentialNft[] = [
  {
    id: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    name: 'Solana Fundamentals Certificate',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop',
    description: 'Completed the Solana Fundamentals course with distinction.',
    track: 'Solana Developer',
    level: 3,
    xp: 1000,
    coursesCompleted: 1,
    owner: 'StubOwner111111111111111111111111111111111',
    updatedAt: '2024-02-15T12:00:00Z',
    metadataUri: 'https://arweave.net/stub-metadata-1',
    explorerUrl: getExplorerUrl('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'),
    verified: true,
  },
  {
    id: '8yLYug3DH98e98UYJSDpbD5jBkheTqA83TZRuJosgBvV',
    mint: '8yLYug3DH98e98UYJSDpbD5jBkheTqA83TZRuJosgBvV',
    name: 'Anchor Framework Mastery',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=400&fit=crop',
    description: 'Demonstrated mastery of the Anchor framework for Solana program development.',
    track: 'Rust Developer',
    level: 7,
    xp: 3000,
    coursesCompleted: 3,
    owner: 'StubOwner111111111111111111111111111111111',
    updatedAt: '2024-02-20T14:30:00Z',
    metadataUri: 'https://arweave.net/stub-metadata-2',
    explorerUrl: getExplorerUrl('8yLYug3DH98e98UYJSDpbD5jBkheTqA83TZRuJosgBvV'),
    verified: true,
  },
];

export class StubCredentialsService implements CredentialsService {
  async getCredentialsByWallet(_walletPubkey: string): Promise<CredentialNft[]> {
    return STUB_CREDENTIALS.map((c) => ({ ...c, owner: _walletPubkey || c.owner }));
  }

  async verifyCredential(mint: string): Promise<CredentialVerificationResult> {
    const found = STUB_CREDENTIALS.find((c) => c.mint === mint);
    if (found) {
      return {
        mint: found.mint,
        valid: true,
        owner: found.owner,
        name: found.name,
        image: found.image,
        track: found.track,
        level: found.level,
        xp: found.xp,
        coursesCompleted: found.coursesCompleted,
        metadataUri: found.metadataUri,
        explorerUrl: found.explorerUrl,
      };
    }
    return {
      mint,
      valid: false,
      explorerUrl: getExplorerUrl(mint),
      error: 'Credential not found',
    };
  }
}
