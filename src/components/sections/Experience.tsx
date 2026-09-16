'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

export function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Career Roadmap"
          badgeVariant="emerald"
          title="Professional Experience"
          subtitle="A track record of engineering scalable applications, integrating AI pipelines, and solving complex business challenges."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 pl-6 sm:pl-8 border-l border-white/10 space-y-12">
          {portfolioData.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  exp.current
                    ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_12px_#00f0ff]'
                    : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400 group-hover:bg-cyan-500/40'
                }`}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel glass-panel-hover transition-all duration-300">
                {/* Top Meta: Position + Company + Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.position}
                      </h3>
                      {exp.current && (
                        <GlowingBadge variant="emerald" pulse={true}>
                          Current
                        </GlowingBadge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.duration}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Key Contributions */}
                <div className="space-y-2.5 mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    Key Deliverables & Impact
                  </h4>
                  <ul className="space-y-2">
                    {exp.contributions.map((contrib, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used Pills */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-slate-500 mr-2">Tech Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
