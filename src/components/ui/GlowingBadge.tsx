import React from 'react';

interface GlowingBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'emerald' | 'amber';
  className?: string;
  pulse?: boolean;
}

export function GlowingBadge({
  children,
  variant = 'cyan',
  className = '',
  pulse = true,
}: GlowingBadgeProps) {
  const variantStyles = {
    cyan: {
      bg: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30',
      dot: 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]',
    },
    purple: {
      bg: 'bg-purple-950/40 text-purple-300 border-purple-500/30',
      dot: 'bg-purple-400 shadow-[0_0_8px_#9d4edd]',
    },
    emerald: {
      bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    },
    amber: {
      bg: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
      dot: 'bg-amber-400 shadow-[0_0_8px_#f59e0b]',
    },
  };

  const style = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-full border backdrop-blur-md ${style.bg} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${style.dot} ${
          pulse ? 'animate-pulse' : ''
        }`}
      />
      {children}
    </span>
  );
}
