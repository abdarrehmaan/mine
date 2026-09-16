'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, MessageSquare, Terminal } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050508]/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      {/* Background glow disc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          {/* Left Column: Brand & Tagline */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="font-mono text-base font-bold text-white tracking-wider">
                {portfolioData.personal.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Building intelligent digital experiences. Software developer focused on AI, automation, and high-performance modern web platforms.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              {portfolioData.personal.availabilityStatus}
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section.toLowerCase()}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Social Channels */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.socials.email}`}
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              {portfolioData.personal.socials.whatsapp && (
                <a
                  href={portfolioData.personal.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-all shadow-sm"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 {portfolioData.personal.name}. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
