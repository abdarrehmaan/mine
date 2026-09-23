'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight, Sparkles, Bot, Search, Command } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useOS } from '@/context/OSContext';
import { ModeSwitcher } from '@/components/operating-system/ModeSwitcher';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'codelab', label: 'Code Lab' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id), 180);

  const {
    setIsAIModalOpen,
    setIsResumeModalOpen,
    setIsCommandPaletteOpen,
    triggerNavigation,
  } = useOS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    triggerNavigation(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2 sm:py-2.5 bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'py-3 sm:py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, 'hero')}
              className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-transparent border border-cyan-500/40 flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.2)] shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider group-hover:text-cyan-400 transition-colors truncate max-w-[140px] xs:max-w-[190px] sm:max-w-none">
                  {portfolioData.personal.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-300/80 font-mono tracking-widest uppercase truncate">
                  AI OS v2.0
                </span>
              </div>
            </a>

            {/* Mode Switcher Pill */}
            <div className="hidden md:block">
              <ModeSwitcher />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`relative px-3 py-1 text-xs font-medium tracking-wide transition-colors rounded-full ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Actions: Command Palette, AI Twin, Resume */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Command Palette Button */}
              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all"
                title="Open Command Palette (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ctrl K</span>
              </button>

              {/* Talk to AI Button */}
              <button
                type="button"
                onClick={() => setIsAIModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold font-mono tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">AI Twin</span>
              </button>

              {/* Resume Intelligence Modal Button */}
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold font-mono tracking-wider text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 rounded-xl transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
              </button>

              {/* Mobile Burger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#08080f]/95 backdrop-blur-2xl border-b border-white/10 p-6 xl:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {/* Mobile Persona Switcher */}
              <div className="pb-3 border-b border-white/10 flex justify-center">
                <ModeSwitcher />
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAIModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 rounded-xl"
                >
                  <Bot className="w-4 h-4" />
                  <span>Talk to AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsResumeModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold font-mono text-slate-200 bg-white/5 border border-white/10 rounded-xl"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
