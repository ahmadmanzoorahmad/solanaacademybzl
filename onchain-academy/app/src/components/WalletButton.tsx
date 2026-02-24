'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/i18n/provider';
import { useCallback, useState } from 'react';

export function WalletButton() {
  const { t } = useTranslation();
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const shortenedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : '';

  const handleCopy = useCallback(async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [publicKey]);

  const handleExplorer = useCallback(() => {
    if (publicKey) {
      window.open(
        `https://explorer.solana.com/address/${publicKey.toBase58()}?cluster=devnet`,
        '_blank'
      );
    }
  }, [publicKey]);

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 font-mono text-xs"
          onClick={handleCopy}
          title={copied ? t('wallet.copied') : t('wallet.copyAddress')}
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">{shortenedAddress}</span>
          <Copy className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleExplorer} title={t('wallet.explorer')}>
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => disconnect()} title={t('wallet.disconnect')}>
          <LogOut className="w-3.5 h-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      onClick={() => setVisible(true)}
      className="gap-2 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">{t('wallet.connect')}</span>
    </Button>
  );
}
