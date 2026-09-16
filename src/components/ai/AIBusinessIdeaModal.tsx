'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, CheckCircle2, Layers, Cpu, Clock, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { generateIdeaBlueprint, IdeaBlueprint } from '@/ai/portfolioEngine';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

const SAMPLE_IDEAS = [
  'B2B pharmaceutical inventory & automated WhatsApp ordering system',
  'AI customer support bot with custom document RAG search',
  'Multi-vendor wholesale marketplace with real-time stock sync',
  'Automated invoice extraction and CRM synchronization bridge',
];

export function AIBusinessIdeaModal() {
  const { isBusinessIdeaModalOpen, setIsBusinessIdeaModalOpen, triggerNavigation } = useOS();
  const [ideaText, setIdeaText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<IdeaBlueprint | null>(null);

  const handleGenerate = (textToUse?: string) => {
    const text = textToUse || ideaText;
    if (!text.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const result = generateIdeaBlueprint(text);
      setBlueprint(result);
      setIsGenerating(false);
    }, 650);
  };

  if (!isBusinessIdeaModalOpen) return null;

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
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsBusinessIdeaModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
              AI ARCHITECTURAL BLUEPRINT ENGINE
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Describe Your Business Idea
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Enter your product concept or workflow bottleneck to receive an instant software architecture recommendation, recommended tech stack, development phases, and automation opportunities.
          </p>

          {/* Sample Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SAMPLE_IDEAS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIdeaText(sample);
                  handleGenerate(sample);
                }}
                className="px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-[11px] font-mono text-slate-300 transition-colors text-left"
              >
                + {sample}
              </button>
            ))}
          </div>

          {/* Input Textarea */}
          <div className="space-y-4 mb-6">
            <textarea
              rows={3}
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="E.g., I want to build a real-time order portal with WhatsApp notifications..."
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-sm placeholder:text-slate-600 outline-none transition-all resize-none"
            />

            <button
              type="button"
              disabled={isGenerating || !ideaText.trim()}
              onClick={() => handleGenerate()}
              className="w-full py-3.5 rounded-xl font-bold text-sm font-mono tracking-wider text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <span>ANALYZING ARCHITECTURE...</span>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4" />
                  <span>Generate Architecture Blueprint</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Blueprint View */}
          {blueprint && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6 text-slate-200"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-bold text-lg text-cyan-300">{blueprint.title}</h4>
                  <p className="text-xs text-slate-400">{blueprint.executiveSummary}</p>
                </div>
                <GlowingBadge variant="purple">{blueprint.estimatedComplexity} Complexity</GlowingBadge>
              </div>

              {/* Recommended Stack */}
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Recommended Technology Stack</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blueprint.recommendedStack.map((stack, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[11px] font-mono text-slate-400">{stack.layer}</div>
                      <div className="text-sm font-bold text-white mb-1">{stack.technology}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">{stack.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Phases */}
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Suggested Development Roadmap</span>
                </h5>
                <div className="space-y-2">
                  {blueprint.developmentPhases.map((phase, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] text-xs">
                      <span className="font-bold text-slate-200">{phase.phase}</span>
                      <span className="text-slate-400">{phase.milestone}</span>
                      <span className="font-mono text-cyan-400">{phase.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Opportunities */}
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Automation & Efficiency Opportunities</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {blueprint.automationOpportunities.map((op, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Ready to bring this architecture to life?</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsBusinessIdeaModalOpen(false);
                    triggerNavigation('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center gap-2"
                >
                  <span>Discuss This Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
