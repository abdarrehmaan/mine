'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Sparkles, CheckCircle2, FileText, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { portfolioData } from '@/data/portfolioData';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

export function RecruiterBanner() {
  const { mode, setIsResumeModalOpen, setIsJobMatcherOpen, triggerNavigation } = useOS();

  if (mode !== 'recruiter') return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 z-20 relative"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-blue-950/40 border border-cyan-500/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,240,255,0.15)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GlowingBadge variant="cyan">RECRUITER MODE ACTIVE</GlowingBadge>
                <span className="font-mono text-xs text-slate-400">Executive Candidate Profile</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Why Consider {portfolioData.personal.name}?
              </h3>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                {portfolioData.recruiterSummary.elevatorPitch}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsJobMatcherOpen(true)}
                className="px-5 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(157,78,221,0.2)]"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Test Role Match %</span>
              </button>

              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <FileText className="w-4 h-4" />
                <span>Explore Resume</span>
              </button>
            </div>
          </div>

          {/* Key Competencies & Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {portfolioData.recruiterSummary.topStrengths.map((str, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">{str}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
