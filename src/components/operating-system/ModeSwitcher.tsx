'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Sparkles, UserCheck } from 'lucide-react';
import { useOS, OperatingMode } from '@/context/OSContext';
import { useSessionMemory } from '@/context/SessionMemoryContext';

const MODES: { id: OperatingMode; label: string; icon: React.ReactNode }[] = [
  { id: 'developer', label: 'Developer', icon: <Code className="w-3.5 h-3.5" /> },
  { id: 'recruiter', label: 'Recruiter', icon: <UserCheck className="w-3.5 h-3.5" /> },
  { id: 'client', label: 'Client', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

export function ModeSwitcher({ className = '' }: { className?: string }) {
  const { mode, setMode } = useOS();
  const { trackEvent } = useSessionMemory();

  const handleSelect = (newMode: OperatingMode) => {
    setMode(newMode);
    trackEvent('mode_change', newMode);
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md ${className}`}
    >
      {MODES.map((m) => {
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => handleSelect(m.id)}
            className={`relative flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium transition-all duration-200 rounded-lg ${
              isActive
                ? 'text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeModePill"
                className="absolute inset-0 bg-cyan-950/60 border border-cyan-500/40 rounded-lg shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {m.icon}
              <span className="capitalize">{m.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
