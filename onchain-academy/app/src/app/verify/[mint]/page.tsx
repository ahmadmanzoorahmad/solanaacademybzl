'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, Copy, Info } from 'lucide-react';
import { useServices } from '@/providers/ServicesProvider';
import { shortenAddress } from '@/services/solana';
import { getHeliusApiKey } from '@/lib/env';
import { toast } from 'sonner';
import type { CredentialVerificationResult } from '@/services';

export default function VerifyCredentialPage() {
  const params = useParams<{ mint: string }>();
  const mint = params.mint;
  const { credentials: credentialsService } = useServices();
  const [result, setResult] = useState<CredentialVerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const heliusConfigured = !!getHeliusApiKey();

  useEffect(() => {
    setLoading(true);
    credentialsService
      .verifyCredential(mint)
      .then(setResult)
      .catch((err: Error) => {
        toast.error(`Verification failed: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [mint, credentialsService]);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[800px] mx-auto">
      <Link href="/identity" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Identity
      </Link>

      <h1 className="text-3xl font-bold mb-2">Credential Verification</h1>
      <p className="text-muted-foreground mb-8">Verify the authenticity of a Superteam Academy on-chain credential.</p>

      {loading ? (
        <Card className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      ) : !result ? (
        <Card className="p-12 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Verification Error</h2>
          <p className="text-muted-foreground">Could not verify credential.</p>
        </Card>
      ) : result.error === 'DAS not configured' ? (
        <Card className="p-8 text-center border-dashed">
          <Info className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">DAS Not Configured</h2>
          <p className="text-muted-foreground mb-2">Set NEXT_PUBLIC_HELIUS_API_KEY to enable on-chain verification.</p>
          <p className="text-sm text-muted-foreground">The system is Devnet-ready and will verify credentials once configured.</p>
        </Card>
      ) : (
        <Card className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${result.valid ? 'bg-[#14F195]/20' : 'bg-red-500/20'}`}>
              {result.valid ? (
                <CheckCircle className="w-8 h-8 text-[#14F195]" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {result.valid ? 'Valid Credential' : 'Invalid / Not Found'}
              </h2>
              <Badge className={result.valid ? 'bg-[#14F195]/20 text-[#14F195]' : 'bg-red-500/20 text-red-400'}>
                {result.valid ? 'Verified on Solana Devnet' : 'Not Verified'}
              </Badge>
            </div>
          </div>

          {result.image && (
            <img src={result.image} alt={result.name || 'Credential'} className="w-full h-48 object-cover rounded-xl mb-6" />
          )}

          {result.name && (
            <h3 className="text-xl font-semibold mb-4">{result.name}</h3>
          )}

          <div className="space-y-3 mb-6">
            <DetailRow label="Mint" value={result.mint} mono copyable />
            {result.owner && <DetailRow label="Owner" value={result.owner} mono />}
            {result.track && <DetailRow label="Track" value={result.track} badge />}
            {result.level !== undefined && <DetailRow label="Level" value={String(result.level)} />}
            {result.xp !== undefined && <DetailRow label="XP" value={result.xp.toLocaleString()} />}
            {result.coursesCompleted !== undefined && <DetailRow label="Courses Completed" value={String(result.coursesCompleted)} />}
            {result.metadataUri && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Metadata</span>
                <a href={result.metadataUri} target="_blank" rel="noopener noreferrer" className="text-sm text-[#14F195] hover:underline flex items-center gap-1">
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Explorer</span>
              <a href={result.explorerUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#14F195] hover:underline flex items-center gap-1">
                Solana Explorer <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            {result.error && (
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Error</span>
                <span className="text-red-400 text-sm">{result.error}</span>
              </div>
            )}
          </div>

          <Card className="p-6 text-center border-dashed bg-muted/30">
            <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-2">
              <span className="text-xs text-muted-foreground">QR Code</span>
            </div>
            <p className="text-xs text-muted-foreground">Scan to verify this credential</p>
          </Card>
        </Card>
      )}

      {!heliusConfigured && result && !result.error?.includes('DAS') && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Showing stub data. Set NEXT_PUBLIC_HELIUS_API_KEY for live verification.
        </p>
      )}
    </div>
  );
}

function DetailRow({ label, value, mono, badge, copyable }: {
  label: string;
  value: string;
  mono?: boolean;
  badge?: boolean;
  copyable?: boolean;
}) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  };

  return (
    <div className="flex justify-between items-center py-2 border-b">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {badge ? (
          <Badge variant="secondary">{value}</Badge>
        ) : (
          <span className={`text-sm ${mono ? 'font-mono' : ''}`}>
            {mono && value.length > 20 ? shortenAddress(value, 8) : value}
          </span>
        )}
        {copyable && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleCopy}>
            <Copy className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
