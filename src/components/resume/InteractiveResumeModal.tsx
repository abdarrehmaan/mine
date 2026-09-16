'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Download,
  Sparkles,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
  Mail,
  Linkedin,
  Github,
  MapPin,
} from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { portfolioData } from '@/data/portfolioData';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

const RESUME_TABS = ['Overview', 'Experience', 'Technical Skills', 'Featured Projects', 'Certifications'] as const;

export function InteractiveResumeModal() {
  const { isResumeModalOpen, setIsResumeModalOpen, setIsJobMatcherOpen } = useOS();
  const [activeTab, setActiveTab] = useState<(typeof RESUME_TABS)[number]>('Overview');

  if (!isResumeModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-2xl overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl my-8 p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header & Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {portfolioData.personal.name}
                </h3>
                <GlowingBadge variant="emerald">Available</GlowingBadge>
              </div>
              <p className="text-xs sm:text-sm font-mono text-cyan-300">
                {portfolioData.personal.title} • {portfolioData.personal.location}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Job Matcher CTA */}
              <button
                type="button"
                onClick={() => {
                  setIsResumeModalOpen(false);
                  setIsJobMatcherOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(157,78,221,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Match Job Description</span>
              </button>

              {/* Download Resume Link */}
              <a
                href={portfolioData.personal.socials.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Export</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Navigation Tabs */}
          <div className="flex items-center gap-2 py-4 border-b border-white/5 overflow-x-auto scrollbar-none">
            {RESUME_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Resume Tab Content Body */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2 scrollbar-thin">
            {activeTab === 'Overview' && (
              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Executive Summary
                  </h4>
                  <p>{portfolioData.recruiterSummary.elevatorPitch}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Core Technical Competencies
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {portfolioData.recruiterSummary.topStrengths.map((str, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Target Roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.recruiterSummary.targetRoles.map((role) => (
                      <span key={role} className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Experience' && (
              <div className="space-y-6">
                {portfolioData.experiences.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-bold text-white text-base">{exp.position}</h4>
                      <span className="font-mono text-xs text-cyan-400">{exp.duration}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">{exp.company} • {exp.location}</div>
                    <p className="text-xs sm:text-sm text-slate-300">{exp.description}</p>
                    <ul className="space-y-1.5 pt-2">
                      {exp.contributions.map((c, cIdx) => (
                        <li key={cIdx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Technical Skills' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.skills.map((skill) => (
                  <div key={skill.name} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{skill.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{skill.category}</div>
                    </div>
                    {skill.proficiency && (
                      <span className="font-mono text-xs font-bold text-cyan-400">{skill.proficiency}%</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Featured Projects' && (
              <div className="space-y-4">
                {portfolioData.projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                      <span className="font-mono text-[10px] text-cyan-400 uppercase">{proj.category}</span>
                    </div>
                    <p className="text-xs text-slate-300">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Certifications' && (
              <div className="space-y-4">
                {portfolioData.achievements.map((ach) => (
                  <div key={ach.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{ach.title}</h4>
                      <p className="text-xs text-slate-400">{ach.organization} • {ach.date}</p>
                    </div>
                    {ach.badgeText && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[10px] font-mono">
                        {ach.badgeText}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
