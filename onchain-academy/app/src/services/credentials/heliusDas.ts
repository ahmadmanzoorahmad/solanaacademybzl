import { getHeliusApiKey, getSolanaCluster } from '@/lib/env';
import { getExplorerUrl } from '@/services/solana';
import type { CredentialNft, CredentialVerificationResult } from './types';

interface HeliusAssetAttribute {
  trait_type: string;
  value: string | number;
}

interface HeliusAsset {
  id: string;
  content: {
    metadata: {
      name: string;
      description?: string;
      attributes?: HeliusAssetAttribute[];
    };
    links?: {
      image?: string;
    };
    json_uri?: string;
  };
  ownership: {
    owner: string;
  };
  updated_at?: string;
  interface?: string;
}

interface HeliusAssetsResponse {
  items: HeliusAsset[];
  total: number;
}

const cache = new Map<string, { data: CredentialNft[]; ts: number }>();
const CACHE_TTL_MS = 45_000;

function extractAttribute(attrs: HeliusAssetAttribute[] | undefined, key: string): string | number | undefined {
  if (!attrs) return undefined;
  const attr = attrs.find((a) => a.trait_type.toLowerCase() === key.toLowerCase());
  return attr?.value;
}

function mapAssetToCredential(asset: HeliusAsset): CredentialNft {
  const attrs = asset.content.metadata.attributes;
  const trackVal = extractAttribute(attrs, 'track');
  const levelVal = extractAttribute(attrs, 'level');
  const xpVal = extractAttribute(attrs, 'xp');
  const coursesVal = extractAttribute(attrs, 'coursesCompleted') ?? extractAttribute(attrs, 'courses_completed');

  return {
    id: asset.id,
    mint: asset.id,
    name: asset.content.metadata.name,
    image: asset.content.links?.image,
    description: asset.content.metadata.description,
    track: typeof trackVal === 'string' ? trackVal : undefined,
    level: typeof levelVal === 'number' ? levelVal : (typeof levelVal === 'string' ? parseInt(levelVal, 10) || undefined : undefined),
    xp: typeof xpVal === 'number' ? xpVal : (typeof xpVal === 'string' ? parseInt(xpVal, 10) || undefined : undefined),
    coursesCompleted: typeof coursesVal === 'number' ? coursesVal : (typeof coursesVal === 'string' ? parseInt(coursesVal, 10) || undefined : undefined),
    owner: asset.ownership.owner,
    updatedAt: asset.updated_at,
    metadataUri: asset.content.json_uri,
    explorerUrl: getExplorerUrl(asset.id),
    verified: true,
  };
}

export async function fetchCredentialsByWallet(walletPubkey: string): Promise<CredentialNft[]> {
  const apiKey = getHeliusApiKey();
  if (!apiKey) {
    return [];
  }

  const cached = cache.get(walletPubkey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const cluster = getSolanaCluster();

  try {
    const dasUrl = cluster === 'mainnet-beta'
      ? `https://mainnet.helius-rpc.com/?api-key=${apiKey}`
      : `https://devnet.helius-rpc.com/?api-key=${apiKey}`;

    const response = await fetch(dasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'get-assets',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: walletPubkey,
          page: 1,
          limit: 100,
          displayOptions: {
            showCollectionMetadata: true,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Helius DAS returned ${response.status}`);
    }

    const json = await response.json() as { result?: HeliusAssetsResponse; error?: { message: string } };
    if (json.error) {
      throw new Error(json.error.message);
    }

    const assets = json.result?.items ?? [];
    const nfts = assets
      .filter((a) => a.interface === 'V1_NFT' || a.interface === 'ProgrammableNFT' || a.interface === 'MplCoreAsset' || a.interface === 'V2_NFT')
      .map(mapAssetToCredential);

    cache.set(walletPubkey, { data: nfts, ts: Date.now() });
    return nfts;
  } catch (err) {
    console.error('[heliusDas] fetchCredentialsByWallet error:', err);
    return [];
  }
}

export async function verifyCredentialByMint(mint: string): Promise<CredentialVerificationResult> {
  const apiKey = getHeliusApiKey();
  if (!apiKey) {
    return {
      mint,
      valid: false,
      explorerUrl: getExplorerUrl(mint),
      error: 'DAS not configured',
    };
  }

  const cluster = getSolanaCluster();

  try {
    const dasUrl = cluster === 'mainnet-beta'
      ? `https://mainnet.helius-rpc.com/?api-key=${apiKey}`
      : `https://devnet.helius-rpc.com/?api-key=${apiKey}`;

    const response = await fetch(dasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'get-asset',
        method: 'getAsset',
        params: { id: mint },
      }),
    });

    if (!response.ok) {
      throw new Error(`Helius DAS returned ${response.status}`);
    }

    const json = await response.json() as { result?: HeliusAsset; error?: { message: string } };
    if (json.error) {
      return {
        mint,
        valid: false,
        explorerUrl: getExplorerUrl(mint),
        error: json.error.message,
      };
    }

    if (!json.result) {
      return {
        mint,
        valid: false,
        explorerUrl: getExplorerUrl(mint),
        error: 'Asset not found',
      };
    }

    const asset = json.result;
    const attrs = asset.content.metadata.attributes;
    const trackVal = extractAttribute(attrs, 'track');
    const levelVal = extractAttribute(attrs, 'level');
    const xpVal = extractAttribute(attrs, 'xp');
    const coursesVal = extractAttribute(attrs, 'coursesCompleted') ?? extractAttribute(attrs, 'courses_completed');

    return {
      mint: asset.id,
      valid: true,
      owner: asset.ownership.owner,
      name: asset.content.metadata.name,
      image: asset.content.links?.image,
      track: typeof trackVal === 'string' ? trackVal : undefined,
      level: typeof levelVal === 'number' ? levelVal : (typeof levelVal === 'string' ? parseInt(levelVal, 10) || undefined : undefined),
      xp: typeof xpVal === 'number' ? xpVal : (typeof xpVal === 'string' ? parseInt(xpVal, 10) || undefined : undefined),
      coursesCompleted: typeof coursesVal === 'number' ? coursesVal : (typeof coursesVal === 'string' ? parseInt(coursesVal, 10) || undefined : undefined),
      metadataUri: asset.content.json_uri,
      explorerUrl: getExplorerUrl(asset.id),
    };
  } catch (err) {
    console.error('[heliusDas] verifyCredentialByMint error:', err);
    return {
      mint,
      valid: false,
      explorerUrl: getExplorerUrl(mint),
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
