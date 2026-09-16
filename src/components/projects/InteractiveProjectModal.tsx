'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  ArrowRight,
  Database,
  Server,
  Globe,
  Lock,
  Cpu,
  Zap,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { ArchitectureNode, ProjectItem } from '@/types/portfolio';
import { GlowingBadge } from '@/components/ui/GlowingBadge';

const LAYER_ICONS: Record<string, React.ReactNode> = {
  'UI / Client': <Globe className="w-4 h-4 text-cyan-400" />,
  'Frontend': <Layers className="w-4 h-4 text-purple-400" />,
  'API Gateway': <Zap className="w-4 h-4 text-amber-400" />,
  'Backend Logic': <Server className="w-4 h-4 text-emerald-400" />,
  'Database / Storage': <Database className="w-4 h-4 text-blue-400" />,
  'External Services': <Cpu className="w-4 h-4 text-pink-400" />,
};

export function InteractiveProjectModal() {
  const { selectedProject, setSelectedProject } = useOS();
  const [activeNode, setActiveNode] = useState<ArchitectureNode | null>(null);

  if (!selectedProject) return null;

  const nodes: ArchitectureNode[] = selectedProject.architectureNodes || [
    {
      id: 'default-ui',
      label: 'Client User Interface',
      layer: 'UI / Client',
      tech: 'Next.js 14 / React',
      purpose: 'User interactions, data visualization, and optimistic state updates.',
      dataFlow: 'Captures input events and queries API endpoints.',
    },
    {
      id: 'default-api',
      label: 'REST API & Webhooks',
      layer: 'API Gateway',
      tech: 'Node.js / FastAPI',
      purpose: 'Input validation, JWT authentication, and event queue dispatch.',
      dataFlow: 'Routes verified payloads to backend controllers.',
    },
    {
      id: 'default-db',
      label: 'Relational Database',
      layer: 'Database / Storage',
      tech: 'PostgreSQL / Supabase',
      purpose: 'Stores relational models, indexing, and row-level security policies.',
      dataFlow: 'Executes ACID transactions with persistent integrity.',
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-2xl overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl my-8 p-6 sm:p-10 rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Category & Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <GlowingBadge variant="cyan">{selectedProject.category}</GlowingBadge>
              <span className="font-mono text-xs text-slate-400">Deep-Dive Case Study</span>
            </div>

            <div className="flex items-center gap-2 mr-8">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {selectedProject.title}
          </h3>
          <p className="text-sm sm:text-base text-cyan-200/80 mb-6 font-mono">
            {selectedProject.tagline}
          </p>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-2">
              <div className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider">
                The Problem
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.problem || selectedProject.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
              <div className="text-xs font-bold text-emerald-300 font-mono uppercase tracking-wider">
                The Engineering Solution
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.solution || selectedProject.description}
              </p>
            </div>
          </div>

          {/* Interactive Multi-Tier Architecture Diagram */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Interactive System Architecture (Click a node to inspect)</span>
              </h4>
              <span className="text-[10px] font-mono text-cyan-400">DATA FLOW PIPELINE</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#04050a] border border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nodes.map((node, idx) => {
                  const isNodeActive = activeNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                        isNodeActive
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-[1.02]'
                          : 'bg-white/[0.02] border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {LAYER_ICONS[node.layer] || <Layers className="w-4 h-4 text-cyan-400" />}
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {node.layer}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h5 className="font-bold text-sm text-white mb-1">{node.label}</h5>
                      <span className="text-xs font-mono text-cyan-300">{node.tech}</span>
                    </div>
                  );
                })}
              </div>

              {/* Node Inspector Drawer */}
              {activeNode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs space-y-2 text-slate-200"
                >
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                    <span className="font-bold text-cyan-300 uppercase tracking-wider font-mono">
                      Node Telemetry: {activeNode.label} ({activeNode.tech})
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{activeNode.layer}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Core Purpose: </strong>
                    {activeNode.purpose}
                  </div>
                  <div>
                    <strong className="text-slate-400">Data Flow: </strong>
                    {activeNode.dataFlow}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Tech Pills Footer */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <span className="font-mono text-xs text-slate-500 mr-2">Technologies Used:</span>
            {selectedProject.technologies.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
