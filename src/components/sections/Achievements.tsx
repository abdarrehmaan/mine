'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, GraduationCap, Github, ExternalLink, Sparkles } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Certification: <Award className="w-5 h-5 text-cyan-400" />,
  Hackathon: <Trophy className="w-5 h-5 text-amber-400" />,
  Academic: <GraduationCap className="w-5 h-5 text-purple-400" />,
  'Open Source': <Github className="w-5 h-5 text-emerald-400" />,
  Award: <Sparkles className="w-5 h-5 text-pink-400" />,
};

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Recognition & Milestones"
          badgeVariant="amber"
          title="Achievements & Certifications"
          subtitle="Honors, validated technical certifications, hackathon recognitions, and algorithmic milestones."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard maxTilt={5} className="h-full">
                <div className="p-7 rounded-2xl glass-panel glass-panel-hover h-full flex flex-col justify-between group">
                  <div>
                    {/* Top Row: Icon + Badge + Date */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 group-hover:border-amber-500/40 transition-all duration-300">
                          {CATEGORY_ICONS[ach.category] || <Award className="w-5 h-5 text-amber-400" />}
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {ach.organization}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {ach.badgeText && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[10px] font-mono uppercase tracking-wider">
                            {ach.badgeText}
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-500">
                          {ach.date}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {ach.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {ach.description}
                    </p>
                  </div>

                  {/* Optional Credential Link */}
                  {ach.credentialUrl && (
                    <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                      <a
                        href={ach.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors"
                      >
                        <span>View Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
