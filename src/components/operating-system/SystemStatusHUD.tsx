'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Mic, ChevronUp, ChevronDown } from 'lucide-react';
import { useOS } from '@/context/OSContext';

export function SystemStatusHUD() {
  const { mode, is3DActive } = useOS();
  const [hasSpeech, setHasSpeech] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const speech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setHasSpeech(!!speech);
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-30 hidden sm:block">
      <div className="rounded-2xl glass-panel border border-white/10 p-2 shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-3 px-2 py-1">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SYSTEM TELEMETRY</span>
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
          </button>
        </div>

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 mt-1 border-t border-white/5 space-y-1.5 px-2 pb-1 text-[10px] font-mono"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Core Portfolio:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">AI Assistant:</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                READY (GROUNDED)
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">3D WebGL Engine:</span>
              <span className="text-purple-400 font-bold">
                {is3DActive ? 'ACTIVE (R3F)' : 'FALLBACK'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Speech Audio API:</span>
              <span className={hasSpeech ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {hasSpeech ? 'CONNECTED' : 'UNAVAILABLE'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/5 text-slate-500">
              <span>Active Persona:</span>
              <span className="uppercase text-cyan-300 font-bold">{mode}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
