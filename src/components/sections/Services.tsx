'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layout, Cpu, Code2, Check, ArrowRight, Lightbulb } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { useOS } from '@/context/OSContext';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6 text-cyan-400" />,
  Layout: <Layout className="w-6 h-6 text-purple-400" />,
  Cpu: <Cpu className="w-6 h-6 text-emerald-400" />,
  Code2: <Code2 className="w-6 h-6 text-blue-400" />,
};

export function Services() {
  const { setIsBusinessIdeaModalOpen, triggerNavigation } = useOS();

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Capabilities & Solutions"
          badgeVariant="purple"
          title="What I Can Build"
          subtitle="Full-cycle engineering from AI integration and business automation to full-stack web applications."
        />

        {/* Client Mode "Describe Your Idea" Interactive Banner */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-amber-950/30 via-purple-950/20 to-cyan-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Have a Project or Business Idea in Mind?</h4>
              <p className="text-xs text-slate-300">Generate an instant AI software architecture blueprint and tech stack estimate.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsBusinessIdeaModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0 cursor-pointer"
          >
            <span>Describe Your Idea</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {portfolioData.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard maxTilt={6} className="h-full">
                <div className="p-8 rounded-3xl glass-panel glass-panel-hover h-full flex flex-col justify-between group relative overflow-hidden">
                  <div
                    className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${service.gradient} blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  <div>
                    {/* Top Icon & Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300 shadow-sm">
                        {SERVICE_ICONS[service.iconName] || <Code2 className="w-6 h-6 text-cyan-400" />}
                      </div>

                      {service.complexity && (
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                          {service.complexity} Complexity • {service.timelineEstimate}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400">
                          <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-cyan-400" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Discuss CTA */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => triggerNavigation('contact')}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 transition-colors group/link cursor-pointer"
                    >
                      <span>Discuss a project</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
