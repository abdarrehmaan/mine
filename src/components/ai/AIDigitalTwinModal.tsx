'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Mic,
  X,
  Sparkles,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Compass,
} from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { useSessionMemory } from '@/context/SessionMemoryContext';
import { queryPortfolioAI } from '@/ai/portfolioEngine';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

const SUGGESTED_PROMPTS = [
  'Show me your AI projects',
  'Tell me about WhatsApp automation',
  'Why should I hire you?',
  'Do you know Java?',
  'Explore your resume',
  'What can you build for my company?',
];

export function AIDigitalTwinModal() {
  const {
    isAIModalOpen,
    setIsAIModalOpen,
    setIsVoiceActive,
    triggerNavigation,
    setSelectedProject,
    setIsResumeModalOpen,
    setMode,
  } = useOS();

  const { messages, addMessage, clearMessages, trackEvent } = useSessionMemory();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAIModalOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAIModalOpen, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    setInputValue('');
    addMessage('user', query);
    trackEvent('ai_query', query);
    setIsTyping(true);

    // Simulate real AI latency
    setTimeout(() => {
      const result = queryPortfolioAI(query);
      setIsTyping(false);
      addMessage('ai', result.answer, result.action?.type);

      // Execute AI UI Actions
      if (result.action) {
        if (result.action.type === 'NAVIGATE' && result.action.target) {
          triggerNavigation(result.action.target, result.action.payload);
        } else if (result.action.type === 'OPEN_MODAL') {
          if (result.action.target === 'resume') setIsResumeModalOpen(true);
          if (result.action.target === 'project' && result.action.payload) setSelectedProject(result.action.payload);
        } else if (result.action.type === 'SET_MODE' && result.action.target) {
          setMode(result.action.target as any);
        }
      }
    }, 450);
  };

  return (
    <>
      {/* Floating Persistent AI Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAIModalOpen(!isAIModalOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 backdrop-blur-xl text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] group transition-all"
        >
          <div className="w-6 h-6 rounded-lg bg-cyan-400 text-black flex items-center justify-center font-bold">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">Talk to My AI</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </motion.button>
      </div>

      {/* Main AI Modal / Drawer */}
      <AnimatePresence>
        {isAIModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] h-[580px] max-h-[85vh] rounded-3xl glass-panel border border-cyan-500/30 flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Portfolio AI Twin</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE • GROUNDED KNOWLEDGE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Voice Mode Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAIModalOpen(false);
                    setIsVoiceActive(true);
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
                  title="Open Voice Mode"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Reset Context */}
                <button
                  type="button"
                  onClick={clearMessages}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Reset Memory"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setIsAIModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium rounded-br-none shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">{msg.text}</p>
                  </div>

                  {msg.actionTaken && (
                    <span className="mt-1 font-mono text-[10px] text-cyan-400/80 flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      <span>Action: {msg.actionTaken}</span>
                    </span>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 w-20 text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Quick Prompts */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 overflow-x-auto flex items-center gap-2 scrollbar-none">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-[11px] font-mono text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects, or command navigation..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-xs placeholder:text-slate-500 outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold disabled:opacity-30 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
