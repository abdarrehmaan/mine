'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bot,
  Mic,
  FileText,
  Sparkles,
  Code,
  Layers,
  Terminal,
  X,
  ArrowRight,
  UserCheck,
  Compass,
  Command,
} from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { useSessionMemory } from '@/context/SessionMemoryContext';
import { portfolioData } from '@/data/portfolioData';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Modes' | 'AI & Tools' | 'Terminal';
  keywords: string[];
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setIsAIModalOpen,
    setIsVoiceActive,
    setIsResumeModalOpen,
    setIsJobMatcherOpen,
    setIsBusinessIdeaModalOpen,
    setMode,
    triggerNavigation,
  } = useOS();

  const { events, technicalScore, businessScore } = useSessionMemory();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-projects',
      label: 'Navigate to Projects Catalog',
      category: 'Navigation',
      keywords: ['projects', 'work', 'code', 'b2b', 'showcase', '/projects'],
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => triggerNavigation('projects'),
    },
    {
      id: 'nav-skills',
      label: 'Navigate to Skills & 3D Universe',
      category: 'Navigation',
      keywords: ['skills', 'tech', 'stack', 'technologies', 'universe', '/skills'],
      icon: <Code className="w-4 h-4 text-purple-400" />,
      action: () => triggerNavigation('skills'),
    },
    {
      id: 'nav-codelab',
      label: 'Open Live Code Lab',
      category: 'Navigation',
      keywords: ['code', 'lab', 'sandbox', 'run', 'snippets', 'java', 'python', '/codelab'],
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      action: () => triggerNavigation('codelab'),
    },
    {
      id: 'nav-contact',
      label: 'Open Contact & Inquiry',
      category: 'Navigation',
      keywords: ['contact', 'email', 'hire', 'message', 'reach out', '/contact'],
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => triggerNavigation('contact'),
    },

    // AI & Tools
    {
      id: 'tool-ai',
      label: 'Talk to AI Digital Twin',
      category: 'AI & Tools',
      keywords: ['ai', 'twin', 'chat', 'ask', 'assistant', '/ai'],
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      action: () => setIsAIModalOpen(true),
    },
    {
      id: 'tool-voice',
      label: 'Launch Voice Mode (Microphone)',
      category: 'AI & Tools',
      keywords: ['voice', 'speech', 'mic', 'talk', 'listen', '/voice'],
      icon: <Mic className="w-4 h-4 text-emerald-400" />,
      action: () => setIsVoiceActive(true),
    },
    {
      id: 'tool-resume',
      label: 'Explore Interactive Resume',
      category: 'AI & Tools',
      keywords: ['resume', 'cv', 'profile', 'education', 'pdf', '/resume'],
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => setIsResumeModalOpen(true),
    },
    {
      id: 'tool-match',
      label: 'Am I a Fit? (Job Description Matcher)',
      category: 'AI & Tools',
      keywords: ['match', 'job', 'fit', 'description', 'recruiter', '/match'],
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => setIsJobMatcherOpen(true),
    },
    {
      id: 'tool-idea',
      label: 'Describe Your Idea (Architecture Blueprint)',
      category: 'AI & Tools',
      keywords: ['idea', 'blueprint', 'client', 'business', 'estimate', '/idea'],
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => setIsBusinessIdeaModalOpen(true),
    },

    // Modes
    {
      id: 'mode-dev',
      label: 'Switch to Developer Mode',
      category: 'Modes',
      keywords: ['developer', 'mode', 'engineer', 'tech'],
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      action: () => setMode('developer'),
    },
    {
      id: 'mode-recruiter',
      label: 'Switch to Recruiter Mode',
      category: 'Modes',
      keywords: ['recruiter', 'mode', 'hire', 'candidate'],
      icon: <UserCheck className="w-4 h-4 text-emerald-400" />,
      action: () => setMode('recruiter'),
    },
    {
      id: 'mode-client',
      label: 'Switch to Client Mode',
      category: 'Modes',
      keywords: ['client', 'mode', 'services', 'business'],
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => setMode('client'),
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase().trim();
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  // Handle terminal Easter eggs
  const handleTerminalCommand = (text: string) => {
    const cmd = text.toLowerCase().trim();

    if (cmd === 'whoami') {
      setTerminalOutput(`${portfolioData.personal.name} — ${portfolioData.personal.title}. Software developer specializing in AI, automation & modern web systems.`);
      return true;
    }
    if (cmd === 'sudo portfolio' || cmd === 'sudo') {
      setTerminalOutput('ACCESS GRANTED: Developer Operating System Level 0 privilege enabled. All interactive modules active.');
      return true;
    }
    if (cmd === 'help') {
      setTerminalOutput('Available commands: /projects, /skills, /experience, /ai, /voice, /resume, /match, /idea, whoami, sudo portfolio, stats, clear');
      return true;
    }
    if (cmd === 'stats') {
      setTerminalOutput(`SESSION TELEMETRY: Total Events: ${events.length} | Tech Interactions: ${technicalScore} | Business Interactions: ${businessScore}`);
      return true;
    }
    if (cmd === 'clear') {
      setTerminalOutput(null);
      setQuery('');
      return true;
    }
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (handleTerminalCommand(query)) return;

      const cmd = filteredCommands[selectedIndex];
      if (cmd) {
        cmd.action();
        setIsCommandPaletteOpen(false);
      }
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#050508]/80 backdrop-blur-2xl"
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        >
          {/* Search Bar Input */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
                setTerminalOutput(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command (e.g. /projects, whoami, resume, ai)..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500 font-mono"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Output Banner if triggered */}
          {terminalOutput && (
            <div className="p-4 bg-black/80 border-b border-cyan-500/30 font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre-line">
              {terminalOutput}
            </div>
          )}

          {/* Commands List */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-1 scrollbar-thin">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsCommandPaletteOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-white border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                        : 'text-slate-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5">{cmd.icon}</div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold">{cmd.label}</div>
                        <div className="text-[10px] font-mono text-slate-500">{cmd.category}</div>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs font-mono text-slate-500">
                No matching system commands found for "{query}". Try typing 'help' or '/ai'.
              </div>
            )}
          </div>

          {/* Bottom Shortcuts Guide */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Use ↑↓ to navigate • ↵ to select • ESC to close</span>
            <span className="hidden sm:inline text-cyan-400">Ctrl + K / Cmd + K</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
