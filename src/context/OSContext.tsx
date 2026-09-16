'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProjectItem } from '@/types/portfolio';

export type OperatingMode = 'developer' | 'recruiter' | 'client';

interface OSContextType {
  mode: OperatingMode;
  setMode: (mode: OperatingMode) => void;
  // Modals
  isAIModalOpen: boolean;
  setIsAIModalOpen: (open: boolean) => void;
  isVoiceActive: boolean;
  setIsVoiceActive: (active: boolean) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  isJobMatcherOpen: boolean;
  setIsJobMatcherOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isBusinessIdeaModalOpen: boolean;
  setIsBusinessIdeaModalOpen: (open: boolean) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  // Selected Tech filter for 3D Skill Universe
  activeTechFilter: string | null;
  setActiveTechFilter: (tech: string | null) => void;
  // System Telemetry
  is3DActive: boolean;
  setIs3DActive: (active: boolean) => void;
  // Safe UI Navigation Dispatcher
  triggerNavigation: (sectionId: string, filter?: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<OperatingMode>('developer');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isJobMatcherOpen, setIsJobMatcherOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isBusinessIdeaModalOpen, setIsBusinessIdeaModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);
  const [is3DActive, setIs3DActive] = useState(true);

  // Restore saved mode or default to developer
  useEffect(() => {
    const savedMode = sessionStorage.getItem('portfolio_os_mode') as OperatingMode;
    if (savedMode && ['developer', 'recruiter', 'client'].includes(savedMode)) {
      setModeState(savedMode);
    }
  }, []);

  const setMode = (newMode: OperatingMode) => {
    setModeState(newMode);
    try {
      sessionStorage.setItem('portfolio_os_mode', newMode);
    } catch {}
  };

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsResumeModalOpen(false);
        setIsJobMatcherOpen(false);
        setIsBusinessIdeaModalOpen(false);
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerNavigation = (sectionId: string, filter?: string) => {
    if (filter) {
      setActiveTechFilter(filter);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <OSContext.Provider
      value={{
        mode,
        setMode,
        isAIModalOpen,
        setIsAIModalOpen,
        isVoiceActive,
        setIsVoiceActive,
        isResumeModalOpen,
        setIsResumeModalOpen,
        isJobMatcherOpen,
        setIsJobMatcherOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isBusinessIdeaModalOpen,
        setIsBusinessIdeaModalOpen,
        selectedProject,
        setSelectedProject,
        activeTechFilter,
        setActiveTechFilter,
        is3DActive,
        setIs3DActive,
        triggerNavigation,
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}
