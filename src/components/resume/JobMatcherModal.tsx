'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Layers, FileText, Check } from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { analyzeJobFit, JobMatchResult } from '@/ai/portfolioEngine';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

const SAMPLE_JDS = [
  'Senior Full-Stack Engineer: Requirements: Next.js, React, TypeScript, Node.js, PostgreSQL, Docker, and REST APIs.',
  'AI / Software Developer: Requirements: Python, FastAPI, Vector Search, LLM Agents, RAG Pipelines, and modern web interfaces.',
  'Automation Engineer: Requirements: WhatsApp Cloud API, webhook dispatchers, CRM integrations, TypeScript, and SQL.',
];

export function JobMatcherModal() {
  const { isJobMatcherOpen, setIsJobMatcherOpen, setSelectedProject, triggerNavigation } = useOS();
  const [jobText, setJobText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  const handleAnalyze = (textToAnalyze?: string) => {
    const text = textToAnalyze || jobText;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeJobFit(text);
      setMatchResult(result);
      setIsAnalyzing(false);
    }, 550);
  };

  if (!isJobMatcherOpen) return null;

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
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsJobMatcherOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
              RESUME INTELLIGENCE & ROLE FIT
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Am I a Fit for Your Role?
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Paste any job description to evaluate real competency compatibility, matching skills, and relevant projects based strictly on verified portfolio experience.
          </p>

          {/* Sample JD Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SAMPLE_JDS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setJobText(sample);
                  handleAnalyze(sample);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-[11px] font-mono text-slate-300 transition-colors text-left truncate max-w-xs"
              >
                + Sample: {sample.slice(0, 35)}...
              </button>
            ))}
          </div>

          {/* JD Input */}
          <div className="space-y-4 mb-6">
            <textarea
              rows={4}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job description requirements and tech stack here..."
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all resize-none"
            />

            <button
              type="button"
              disabled={isAnalyzing || !jobText.trim()}
              onClick={() => handleAnalyze()}
              className="w-full py-3.5 rounded-xl font-bold text-sm font-mono tracking-wider text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAnalyzing ? (
                <span>ANALYZING COMPATIBILITY...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Role Fit & Generate Tailored Highlights</span>
                </>
              )}
            </button>
          </div>

          {/* Match Analysis Results */}
          {matchResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6 text-slate-200"
            >
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Candidate Match Score</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-cyan-400">
                      {matchResult.matchScore}%
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      HIGH ALIGNMENT
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                  {matchResult.fitAssessment}
                </p>
              </div>

              {/* Skills Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Strong Matches */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <div className="text-xs font-bold text-emerald-300 font-mono mb-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Strong Matched Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-emerald-900/40 text-[11px] font-mono text-emerald-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Growth / Adjacent */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
                  <div className="text-xs font-bold text-amber-300 font-mono mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Adjacent / Growth Areas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.partialSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-amber-900/40 text-[11px] font-mono text-amber-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Project */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Most Relevant Portfolio Project</div>
                  <h4 className="text-base font-bold text-white">{matchResult.recommendedProject.title}</h4>
                  <p className="text-xs text-slate-400">{matchResult.recommendedProject.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsJobMatcherOpen(false);
                    setSelectedProject(matchResult.recommendedProject);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold whitespace-nowrap"
                >
                  Inspect Architecture
                </button>
              </div>

              {/* Interview Talking Points */}
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Recommended Interview Talking Points
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {matchResult.talkingPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
