import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: boolean;
}

export function StatsCard({ icon: Icon, label, value, description, trend, gradient = false }: StatsCardProps) {
  return (
    <Card className="p-6 hover:border-primary transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`text-3xl font-bold ${ 
            gradient 
              ? 'bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent'
              : ''
          }`}>
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
}