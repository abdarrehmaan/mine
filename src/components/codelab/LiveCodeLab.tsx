'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Sparkles, Terminal, CheckCircle2, ChevronRight, BookOpen, Clock, Layers } from 'lucide-react';
import { CODE_LAB_SNIPPETS, CodeSnippet } from '@/ai/codeLabSnippets';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useSessionMemory } from '@/context/SessionMemoryContext';

export function LiveCodeLab() {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(CODE_LAB_SNIPPETS[0]);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const { trackEvent } = useSessionMemory();

  const handleRun = () => {
    setIsRunning(true);
    trackEvent('cta_click', `run_code_${selectedSnippet.language}`);
    setTimeout(() => {
      setOutput(selectedSnippet.simulatedOutput);
      setIsRunning(false);
    }, 450);
  };

  const handleReset = () => {
    setOutput('');
    setShowAIExplanation(false);
  };

  const handleExplain = () => {
    setShowAIExplanation(true);
    trackEvent('cta_click', `explain_code_${selectedSnippet.language}`);
  };

  return (
    <section id="codelab" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Interactive Sandbox"
          badgeVariant="cyan"
          title="Live Code Lab"
          subtitle="Explore hands-on algorithmic logic, concurrent systems, and AI vector pipelines. Run snippets and inspect step-by-step AI breakdowns."
        />

        {/* Snippet Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {CODE_LAB_SNIPPETS.map((snippet) => {
            const isSelected = selectedSnippet.id === snippet.id;
            return (
              <button
                key={snippet.id}
                type="button"
                onClick={() => {
                  setSelectedSnippet(snippet);
                  setOutput('');
                  setShowAIExplanation(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">
                  {snippet.language}
                </span>
                <span>{snippet.title.split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Code Lab Workspace Window */}
        <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Top IDE Toolbar */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-slate-400">
                sandbox/{selectedSnippet.language}/{selectedSnippet.id}.{selectedSnippet.language === 'python' ? 'py' : selectedSnippet.language === 'java' ? 'java' : 'ts'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleRun}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'RUNNING...' : 'Run'}</span>
              </button>

              <button
                type="button"
                onClick={handleExplain}
                className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-mono font-semibold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(157,78,221,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Explain with AI</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Reset Console"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Code Editor View */}
            <div className="lg:col-span-7 p-6 bg-[#040407]/90 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto border-b lg:border-b-0 lg:border-r border-white/10">
              <p className="text-slate-500 text-xs mb-3 italic">
                // {selectedSnippet.description}
              </p>
              <pre className="leading-relaxed whitespace-pre font-mono text-cyan-100/90">
                <code>{selectedSnippet.code}</code>
              </pre>
            </div>

            {/* Terminal Output & AI Explanation View */}
            <div className="lg:col-span-5 p-6 bg-[#07070e]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Terminal Output</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/5 font-mono text-xs text-emerald-400/90 min-h-[160px] whitespace-pre-line leading-relaxed overflow-x-auto">
                  {output ? (
                    output
                  ) : (
                    <span className="text-slate-600">Click 'Run' to execute code in sandboxed environment...</span>
                  )}
                </div>
              </div>

              {/* AI Explanation Accordion */}
              {showAIExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3"
                >
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Code Breakdown</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedSnippet.aiExplanation.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedSnippet.aiExplanation.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-purple-900/40 border border-purple-500/20 text-[10px] font-mono text-purple-200"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Time: <span className="text-cyan-300">{selectedSnippet.aiExplanation.timeComplexity}</span></span>
                    <span>Space: <span className="text-cyan-300">{selectedSnippet.aiExplanation.spaceComplexity}</span></span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
