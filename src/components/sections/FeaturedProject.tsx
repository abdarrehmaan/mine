'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Layers, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowingBadge } from '@/components/ui/GlowingBadge';
import { TiltCard } from '@/components/ui/TiltCard';

export function FeaturedProject() {
  const project = portfolioData.featuredProject;

  return (
    <section id="featured-project" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Flagship Showcase"
          badgeVariant="cyan"
          title="Featured Engineering Project"
          subtitle="An in-depth look into full-stack architecture, business process optimization, and enterprise scalability."
        />

        <TiltCard maxTilt={5} className="w-full">
          <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl glass-panel border border-cyan-500/20 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            {/* Top Badge & Category */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <GlowingBadge variant="cyan">ENTERPRISE SYSTEM</GlowingBadge>
                <span className="font-mono text-xs text-slate-400">
                  {project.category}
                </span>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono font-medium transition-all active:scale-95"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] active:scale-95"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 sm:mb-3">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-cyan-200/80 font-normal leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* Metrics Row */}
            {project.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10 pb-6 sm:pb-10 border-b border-white/10">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center"
                  >
                    <span className="font-mono text-xl sm:text-3xl font-extrabold text-cyan-400 mb-0.5 sm:mb-1">
                      {metric.value}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Challenge, Solution, Result Grid */}
            {project.caseStudy && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
                {/* Challenge */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>

                {/* Result */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>The Impact</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.result}
                  </p>
                </div>
              </div>
            )}

            {/* Architecture Highlights & Tech Pills */}
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-slate-500 mr-2">Built With:</span>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.caseStudy?.architectureDetails && (
                <div className="text-xs font-mono text-slate-400">
                  <span className="text-slate-500">Architecture: </span>
                  SSR Next.js • PostgreSQL RLS • Webhooks
                </div>
              )}
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
