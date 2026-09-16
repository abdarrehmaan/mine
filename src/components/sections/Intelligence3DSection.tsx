'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WebGLFallback } from '@/components/3d/WebGLFallback';

const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false, loading: () => <WebGLFallback label="INTELLIGENCE NEXUS" /> }
);

const IntelligenceSection3D = dynamic(
  () => import('@/components/3d/IntelligenceSection3D').then((mod) => mod.IntelligenceSection3D),
  { ssr: false }
);

export function Intelligence3DSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#080812]/50 to-transparent">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Convergence"
          badgeVariant="purple"
          title="Where Code Meets Intelligence"
          subtitle="A synchronized ecosystem of intelligent algorithms, resilient infrastructure, and automated pipelines."
        />

        {/* 3D Orbiting Interactive Viewport */}
        <div className="relative w-full h-[450px] sm:h-[550px] rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Subtle Corner Markers */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/60 uppercase tracking-widest pointer-events-none">
            SYS::NEURAL_ORBIT // LIVE_SIMULATION
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest pointer-events-none">
            DRAG / HOVER TO ORBIT
          </div>

          <div className="w-full h-full">
            <CanvasContainer fallbackLabel="INTELLIGENCE CORE" camera={{ position: [0, 0, 6], fov: 45 }}>
              <IntelligenceSection3D />
            </CanvasContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
