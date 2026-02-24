import { clusterApiUrl } from '@solana/web3.js';

export function getSolanaRpcUrl(): string {
  return process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet');
}

export function getXpMint(): string | null {
  return process.env.NEXT_PUBLIC_XP_MINT || null;
}

export function getHeliusApiKey(): string | null {
  return process.env.NEXT_PUBLIC_HELIUS_API_KEY || null;
}

export function getHeliusBaseUrl(): string {
  return process.env.NEXT_PUBLIC_HELIUS_BASE_URL || 'https://api.helius.xyz';
}

export function getSolanaCluster(): string {
  return process.env.NEXT_PUBLIC_SOLANA_CLUSTER || 'devnet';
}
