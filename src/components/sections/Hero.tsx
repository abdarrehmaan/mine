'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Bot, Mic, ChevronDown } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { GlowingBadge } from '@/components/ui/GlowingBadge';
import { WebGLFallback } from '@/components/3d/WebGLFallback';
import { useOS } from '@/context/OSContext';

const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false, loading: () => <WebGLFallback label="3D NEURAL CORE" /> }
);

const HeroNeuralCore = dynamic(
  () => import('@/components/3d/HeroNeuralCore').then((mod) => mod.HeroNeuralCore),
  { ssr: false }
);

export function Hero() {
  const { setIsAIModalOpen, setIsVoiceActive, setIsResumeModalOpen, triggerNavigation } = useOS();

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-hero-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* High-Tech Badge */}
            <GlowingBadge variant="cyan">
              AI • SOFTWARE • OPERATING SYSTEM
            </GlowingBadge>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
              Building{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Intelligent
              </span>{' '}
              Digital Experiences.
            </h1>

            {/* Supporting Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {portfolioData.personal.subheadline}
            </p>

            {/* Interactive Primary CTAs */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-2 w-full sm:w-auto">
              {/* Talk to AI Button */}
              <button
                type="button"
                onClick={() => setIsAIModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] group cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>Talk to My AI</span>
                <Sparkles className="w-3.5 h-3.5 text-black" />
              </button>

              <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                {/* Voice Mode Button */}
                <button
                  type="button"
                  onClick={() => setIsVoiceActive(true)}
                  className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold font-mono text-xs sm:text-sm tracking-wide text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-95"
                  title="Launch Voice Mode"
                >
                  <Mic className="w-4 h-4 text-emerald-400" />
                  <span>Voice</span>
                </button>

                {/* Explore Resume Button */}
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-3 sm:py-3.5 rounded-xl font-semibold font-mono text-xs sm:text-sm tracking-wide text-purple-300 bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 transition-all shadow-[0_0_15px_rgba(157,78,221,0.15)] active:scale-95"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Resume</span>
                </button>
              </div>

              {/* View Projects Link */}
              <button
                type="button"
                onClick={() => triggerNavigation('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl font-semibold font-mono text-xs sm:text-sm tracking-wide text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 transition-all active:scale-95"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Availability Indicator */}
            <div className="pt-2 flex items-center gap-2.5 font-mono text-xs text-slate-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{portfolioData.personal.availabilityStatus}</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative h-[280px] sm:h-[400px] lg:h-[540px] w-full flex items-center justify-center"
          >
            <div className="w-full h-full relative z-10">
              <CanvasContainer fallbackLabel="AI NEURAL CORE" camera={{ position: [0, 0, 5], fov: 45 }}>
                <HeroNeuralCore />
              </CanvasContainer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          triggerNavigation('about');
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-75">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
