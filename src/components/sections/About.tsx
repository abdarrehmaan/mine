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

          {/* Right Column: 3D Hologram profile object */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 h-[340px] sm:h-[420px] w-full flex items-center justify-center relative"
          >
            <div className="w-full h-full">
              <CanvasContainer fallbackLabel="3D HOLOGRAM" camera={{ position: [0, 0, 4.5], fov: 45 }}>
                <HologramGeometry />
              </CanvasContainer>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4"
        >
          {portfolioData.stats.map((stat, idx) => (
            <TiltCard key={stat.id} maxTilt={6} className="h-full">
              <div className="p-6 rounded-2xl glass-panel glass-panel-hover h-full flex flex-col justify-between">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-mono">
                    {stat.value}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">
                    {stat.suffix}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 text-sm sm:text-base mb-1">
                    {stat.label}
                  </h4>
                  {stat.description && (
                    <p className="text-xs text-slate-400 leading-relaxed">
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
