'use client';

import React from 'react';

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Neural Glows */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-glow-pulse" />
      <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 left-1/3 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[180px]" />
    </div>
  );
}
