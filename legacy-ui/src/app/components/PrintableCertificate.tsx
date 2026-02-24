import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Award, Sparkles, Shield } from 'lucide-react';
import { forwardRef } from 'react';
import { Certificate } from '../data/mockData';

interface PrintableCertificateProps {
  certificate: Certificate;
}

export const PrintableCertificate = forwardRef<HTMLDivElement, PrintableCertificateProps>(
  ({ certificate }, ref) => {
    return (
      <Card 
        ref={ref}
        className="relative overflow-hidden border-2 bg-card print:shadow-none"
        style={{
          borderImage: 'linear-gradient(135deg, #14F195, #9945FF) 1',
        }}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-[2px] bg-card rounded-lg" />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} 
          />
        </div>

        {/* Gradient Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#14F195]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#9945FF]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="relative p-12 md:p-16 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#14F195]/20 to-[#9945FF]/20 border-2 border-primary/30 mb-4">
              <Award className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-heading">
                Certificate of Completion
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[#14F195] to-[#9945FF] mx-auto rounded-full" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge 
              variant="outline" 
              className="bg-[#14F195]/10 text-[#14F195] border-[#14F195]/30 px-3 py-1"
            >
              <Shield className="w-3 h-3 mr-1.5" />
              Soulbound (Non-transferable)
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-[#9945FF]/10 text-[#9945FF] border-[#9945FF]/30 px-3 py-1"
            >
              <Sparkles className="w-3 h-3 mr-1.5" />
              Metaplex Core NFT
            </Badge>
          </div>

          {/* Recipient */}
          <div className="text-center space-y-3">
            <p className="text-lg text-muted-foreground">This certifies that</p>
            <p className="text-4xl md:text-5xl font-heading gradient-solana-text">
              {certificate.recipientName}
            </p>
          </div>

          {/* Course Name */}
          <div className="text-center space-y-3">
            <p className="text-lg text-muted-foreground">has successfully completed</p>
            <p className="text-2xl md:text-3xl font-heading">
              {certificate.courseName}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Completion Date</p>
              <p className="font-heading text-lg">
                {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Level Achieved</p>
              <p className="font-heading text-lg gradient-solana-text">
                {certificate.level}
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Total XP Earned</p>
              <p className="font-heading text-lg gradient-solana-text">
                {certificate.xpEarned.toLocaleString()} XP
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground mb-1">Issued by</p>
                <p className="font-heading text-lg">Superteam Solana Academy</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                <p className="font-mono text-sm">{certificate.id.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

PrintableCertificate.displayName = 'PrintableCertificate';