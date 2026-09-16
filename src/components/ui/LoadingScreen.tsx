'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('PORTFOLIO LOADED');
          setTimeout(() => {
            setIsDone(true);
            if (onFinish) onFinish();
          }, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 14) + 6;
        if (next > 40 && next < 80) setStatus('LOADING 3D NEURAL CORE...');
        if (next >= 80) setStatus('SYNCHRONIZING INTERFACES...');
        return Math.min(next, 100);
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] text-white select-none"
        >
          <div className="w-full max-w-xs px-6 flex flex-col items-center">
            {/* Minimal High-Tech Logo Symbol */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl border border-cyan-500/40 bg-cyan-950/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <span className="font-mono text-cyan-400 font-bold text-lg">AI</span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            {/* Status Text */}
            <div className="flex items-center justify-between w-full mb-2 font-mono text-xs">
              <span className="text-slate-400 tracking-wider">{status}</span>
              <span className="text-cyan-400 font-semibold">{progress}%</span>
            </div>

            {/* High-Tech Progress Bar */}
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
