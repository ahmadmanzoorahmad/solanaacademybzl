'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, Copy, Download, Share2 } from 'lucide-react';
import { useServices } from '@/providers/ServicesProvider';
import { shortenAddress } from '@/services/solana';
import { toast } from 'sonner';
import type { CredentialVerificationResult } from '@/services';

export default function CertificatePage() {
  const params = useParams<{ id: string }>();
  const mint = params.id;
  const { credentials: credentialsService } = useServices();
  const [result, setResult] = useState<CredentialVerificationResult | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleCopyMint = async () => {
    await navigator.clipboard.writeText(mint);
    toast.success('Mint address copied');
  };

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[900px] mx-auto">
      <Link href="/identity" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Identity
      </Link>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : !result ? (
        <Card className="p-12 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
          <p className="text-muted-foreground">Could not verify this certificate.</p>
        </Card>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-8">
            {result.valid ? (
              <CheckCircle className="w-8 h-8 text-[#14F195]" />
            ) : (
              <XCircle className="w-8 h-8 text-red-500" />
            )}
            <h1 className="text-3xl font-bold">{result.name || 'Certificate'}</h1>
            <Badge className={result.valid ? 'bg-[#14F195]/20 text-[#14F195]' : 'bg-red-500/20 text-red-400'}>
              {result.valid ? 'Valid' : 'Invalid'}
            </Badge>
          </div>

          {result.image && (
            <Card className="overflow-hidden mb-8">
              <img src={result.image} alt={result.name || 'Certificate'} className="w-full h-64 object-cover" />
            </Card>
          )}

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">On-Chain Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Mint Address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{shortenAddress(result.mint, 8)}</span>
                  <Button variant="ghost" size="sm" className="h-7" onClick={handleCopyMint}><Copy className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
              {result.owner && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-mono text-sm">{shortenAddress(result.owner, 8)}</span>
                </div>
              )}
              {result.track && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Track</span>
                  <Badge variant="secondary">{result.track}</Badge>
                </div>
              )}
              {result.level !== undefined && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-bold">{result.level}</span>
                </div>
              )}
              {result.xp !== undefined && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">XP Earned</span>
                  <span className="font-bold">{result.xp.toLocaleString()}</span>
                </div>
              )}
              {result.coursesCompleted !== undefined && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Courses Completed</span>
                  <span className="font-bold">{result.coursesCompleted}</span>
                </div>
              )}
              {result.metadataUri && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Metadata URI</span>
                  <a href={result.metadataUri} target="_blank" rel="noopener noreferrer" className="text-sm text-[#14F195] hover:underline flex items-center gap-1">
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Explorer</span>
                <a href={result.explorerUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#14F195] hover:underline flex items-center gap-1">
                  Solana Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Download
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Link href={`/verify/${result.mint}`}>
              <Button className="gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90">
                <CheckCircle className="w-4 h-4" /> Verify
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
