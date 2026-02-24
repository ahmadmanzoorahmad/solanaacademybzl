import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
