'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Layers, Sparkles, Code2, Bot, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { useOS } from '@/context/OSContext';
import { useSessionMemory } from '@/context/SessionMemoryContext';

const CATEGORIES = ['All', 'AI / ML', 'Automation', 'Full Stack', 'Enterprise'] as const;

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { setSelectedProject, activeTechFilter, setActiveTechFilter } = useOS();
  const { trackEvent } = useSessionMemory();

  const filteredProjects = portfolioData.projects.filter((proj) => {
    // If category filter applied
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;

    // If active 3D tech filter applied
    if (activeTechFilter) {
      const filterLower = activeTechFilter.toLowerCase();
      const matchesTech = proj.technologies.some((t) => t.toLowerCase().includes(filterLower));
      return matchesCategory && matchesTech;
    }

    return matchesCategory;
  });

  const handleCardClick = (project: any) => {
    trackEvent('project_open', project.id);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Work & Innovations"
          badgeVariant="cyan"
          title="Selected Projects"
          subtitle="Click any project to open the interactive system architecture explorer, problem-solution breakdown, and live data flow diagrams."
        />

        {/* Active 3D Tech Filter indicator if applied */}
        {activeTechFilter && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <span>Filtered by 3D Universe Tech: <strong>{activeTechFilter}</strong></span>
              <button
                type="button"
                onClick={() => setActiveTechFilter(null)}
                className="hover:text-white font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard maxTilt={7} className="h-full">
                  <div
                    onClick={() => handleCardClick(project)}
                    className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover h-full flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Top Row: Category + Links */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wider uppercase">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 transition-colors"
                              aria-label={`View ${project.title} Live Demo`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Project Image Preview */}
                      {project.image && (
                        <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent pointer-events-none" />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm text-cyan-200/80 font-mono mb-3">
                        {project.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom: Metrics & Tech Pills */}
                    <div>
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4 pt-3 border-t border-white/5">
                          {project.metrics.map((m: any, idx: number) => (
                            <div key={idx} className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                              <div className="text-xs font-mono font-bold text-cyan-400">{m.value}</div>
                              <div className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[11px] font-mono text-slate-400 border border-white/5 group-hover:border-cyan-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 text-[11px] font-mono text-cyan-400/80 group-hover:text-cyan-300 flex items-center gap-1">
                        <span>Click to inspect architecture & data flow</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore All on GitHub Button */}
        <div className="mt-16 text-center">
          <a
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-mono text-sm font-semibold transition-all duration-300 shadow-sm group"
          >
            <Github className="w-4 h-4" />
            <span>Explore All Repositories on GitHub</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
