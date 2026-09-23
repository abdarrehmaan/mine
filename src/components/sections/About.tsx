'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Code2, Bot, Cpu, Layers, Sparkles } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { WebGLFallback } from '@/components/3d/WebGLFallback';

const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false, loading: () => <WebGLFallback label="HOLOGRAPHIC CORE" /> }
);

const HologramGeometry = dynamic(
  () => import('@/components/3d/HologramGeometry').then((mod) => mod.HologramGeometry),
  { ssr: false }
);

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
  Bot: <Bot className="w-5 h-5 text-purple-400" />,
  Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
  Layers: <Layers className="w-5 h-5 text-blue-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
};

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Profile & Philosophy"
          badgeVariant="purple"
          title="Engineering with Purpose & Intelligence"
          subtitle="Combining high-performance software architecture with modern AI capabilities."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Bio Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg"
          >
            {portfolioData.personal.bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {/* Core Focus Blocks */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {portfolioData.personal.focusPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {ICON_MAP[pillar.icon] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <h3 className="font-semibold text-white text-sm tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-1">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Profile Card, Verified Credential & 3D Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative space-y-6"
          >
            <div className="relative w-full max-w-sm rounded-3xl p-4 sm:p-6 glass-panel border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] group">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.4)] shrink-0">
                  <img
                    src="/images/profile.jpg"
                    alt={portfolioData.personal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-base sm:text-lg tracking-tight truncate">
                    {portfolioData.personal.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 truncate">
                    {portfolioData.personal.title}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                    <span>📍 {portfolioData.personal.location}</span>
                  </p>
                </div>
              </div>

              {/* Education & Academic Credential Badge */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>🎓 Bachelor of Technology</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono">
                    Graduated
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Dr. A.P.J. Abdul Kalam Technical University
                </p>
              </div>

              {/* 3D Holographic Core Viewport */}
              <div className="h-36 sm:h-44 w-full relative rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                <CanvasContainer fallbackLabel="3D HOLOGRAM" camera={{ position: [0, 0, 4.5], fov: 45 }}>
                  <HologramGeometry />
                </CanvasContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-2 sm:pt-4"
        >
          {portfolioData.stats.map((stat) => (
            <TiltCard key={stat.id} maxTilt={6} className="h-full">
              <div className="p-4 sm:p-6 rounded-2xl glass-panel glass-panel-hover h-full flex flex-col justify-between">
                <div className="flex items-baseline gap-1 mb-1.5 sm:mb-2">
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xl sm:text-3xl font-bold text-cyan-400 font-mono">
                    {stat.suffix}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 text-xs sm:text-base mb-1">
                    {stat.label}
                  </h4>
                  {stat.description && (
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
