import { getSolanaCluster } from '@/lib/env';

export function getSolanaNetwork(): string {
  return getSolanaCluster();
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function getExplorerUrl(address: string, type: 'address' | 'tx' = 'address'): string {
  const cluster = getSolanaCluster();
  return `https://explorer.solana.com/${type}/${address}?cluster=${cluster}`;
}
