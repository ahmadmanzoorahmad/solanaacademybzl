import { useState } from 'react';
import { Button } from './ui/button';
import { Wallet, Check } from 'lucide-react';
import { useLanguage } from '../i18n';

export function WalletButton() {
  const [connected, setConnected] = useState(false);
  const { t } = useLanguage();

  return (
    <Button
      onClick={() => setConnected(!connected)}
      className={connected ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90' : ''}
      size="sm"
    >
      {connected ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          <span className="font-mono hidden sm:inline">7xKX...gAsU</span>
          <span className="font-mono sm:hidden">{t('wallet.connected')}</span>
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{t('wallet.connect')}</span>
          <span className="sm:hidden">{t('wallet.connect')}</span>
        </>
      )}
    </Button>
  );
}