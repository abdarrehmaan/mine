'use client';

import React from 'react';

interface WebGLFallbackProps {
  label?: string;
  type?: 'sphere' | 'hologram' | 'orbit';
}

export function WebGLFallback({ label = 'AI NEURAL SYSTEM', type = 'sphere' }: WebGLFallbackProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[300px] select-none">
      {/* Background glow disc */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-3xl animate-pulse" />

      {/* Orbiting rings */}
      <div className="relative w-56 h-56 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow">
        <div className="absolute top-0 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
        <div className="w-44 h-44 rounded-full border border-purple-500/30 flex items-center justify-center animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
          <div className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#9d4edd]" />
          
          {/* Center core */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-900/60 to-purple-900/60 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
