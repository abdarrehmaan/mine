'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  FileCode,
  Terminal,
  Database,
  Coffee,
  Atom,
  Globe,
  Server,
  Layout,
  Palette,
  Brain,
  Cpu,
  Bot,
  MessageSquare,
  Network,
  Zap,
  ShieldCheck,
  Workflow,
  GitBranch,
  Github,
  Monitor,
  Cloud,
  Box,
  Layers,
  Sparkles,
  Orbit,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { WebGLFallback } from '@/components/3d/WebGLFallback';
import { useOS } from '@/context/OSContext';

const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false, loading: () => <WebGLFallback label="SKILL UNIVERSE" /> }
);

const SkillUniverse3D = dynamic(
  () => import('@/components/3d/SkillUniverse3D').then((mod) => mod.SkillUniverse3D),
  { ssr: false }
);

const ICON_MAP: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-5 h-5 text-amber-400" />,
  Terminal: <Terminal className="w-5 h-5 text-emerald-400" />,
  Code: <Code className="w-5 h-5 text-yellow-400" />,
  FileCode: <FileCode className="w-5 h-5 text-blue-400" />,
  Database: <Database className="w-5 h-5 text-cyan-400" />,
  Atom: <Atom className="w-5 h-5 text-cyan-400" />,
  Globe: <Globe className="w-5 h-5 text-purple-400" />,
  Server: <Server className="w-5 h-5 text-emerald-400" />,
  Layout: <Layout className="w-5 h-5 text-orange-400" />,
  Palette: <Palette className="w-5 h-5 text-teal-400" />,
  Brain: <Brain className="w-5 h-5 text-pink-400" />,
  Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
  Bot: <Bot className="w-5 h-5 text-violet-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-emerald-400" />,
  Network: <Network className="w-5 h-5 text-blue-400" />,
  Zap: <Zap className="w-5 h-5 text-amber-400" />,
  DatabaseZap: <Database className="w-5 h-5 text-blue-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Workflow: <Workflow className="w-5 h-5 text-indigo-400" />,
  GitBranch: <GitBranch className="w-5 h-5 text-orange-400" />,
  Github: <Github className="w-5 h-5 text-slate-200" />,
  Monitor: <Monitor className="w-5 h-5 text-blue-400" />,
  Cloud: <Cloud className="w-5 h-5 text-cyan-400" />,
  Box: <Box className="w-5 h-5 text-blue-500" />,
};

const CATEGORIES = [
  'All',
  'Languages',
  'Web Development',
  'AI / Automation',
  'Database / Backend',
  'Tools',
] as const;

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const { setActiveTechFilter, triggerNavigation } = useOS();

  const filteredSkills = portfolioData.skills.filter(
    (skill) => selectedCategory === 'All' || skill.category === selectedCategory
  );

  const handleSkillCardClick = (skillName: string) => {
    setActiveTechFilter(skillName);
    triggerNavigation('projects');
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Technical Arsenal"
          badgeVariant="cyan"
          title="Skills & 3D Universe"
          subtitle="Explore the interactive 3D skill orbit or matrix grid. Clicking any technology filters matching projects and architectures."
        />

        {/* View Mode Toggle: 3D Universe vs Grid Matrix */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-1 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                viewMode === '3d'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Skill Universe</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'grid'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(157,78,221,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Matrix Grid View</span>
            </button>
          </div>
        </div>

        {viewMode === '3d' ? (
          /* 3D Skill Universe Container */
          <div className="relative w-full h-[480px] sm:h-[580px] rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest pointer-events-none">
              ORBITAL KNOWLEDGE LATTICE // CLICK NODE TO FILTER PROJECTS
            </div>
            <div className="w-full h-full">
              <CanvasContainer fallbackLabel="3D SKILL UNIVERSE" camera={{ position: [0, 0, 5.8], fov: 45 }}>
                <SkillUniverse3D />
              </CanvasContainer>
            </div>
          </div>
        ) : (
          /* Matrix Grid View */
          <div>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Interactive 3D Tilt Skill Cards Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TiltCard maxTilt={8} className="h-full">
                      <div
                        onClick={() => handleSkillCardClick(skill.name)}
                        className="p-5 rounded-2xl glass-panel glass-panel-hover h-full flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          {/* Top: Icon + Category */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                              {ICON_MAP[skill.iconName] || <Layers className="w-5 h-5 text-cyan-400" />}
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 tracking-wider uppercase">
                              {skill.category}
                            </span>
                          </div>

                          {/* Skill Name */}
                          <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {skill.name}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            {skill.description}
                          </p>
                        </div>

                        {/* Proficiency Bar */}
                        {skill.proficiency && (
                          <div className="pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                              <span>Proficiency</span>
                              <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
