'use client';

import React, { useState } from 'react';
import { OSProvider } from '@/context/OSContext';
import { SessionMemoryProvider } from '@/context/SessionMemoryContext';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { RecruiterBanner } from '@/components/operating-system/RecruiterBanner';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { Projects } from '@/components/sections/Projects';
import { LiveCodeLab } from '@/components/codelab/LiveCodeLab';
import { Services } from '@/components/sections/Services';
import { Intelligence3DSection } from '@/components/sections/Intelligence3DSection';
import { Achievements } from '@/components/sections/Achievements';
import { ContactIntelligent } from '@/components/sections/ContactIntelligent';
import { Footer } from '@/components/layout/Footer';

// Interactive Operating System Modals & Telemetry
import { AIDigitalTwinModal } from '@/components/ai/AIDigitalTwinModal';
import { VoiceModeController } from '@/components/ai/VoiceModeController';
import { InteractiveResumeModal } from '@/components/resume/InteractiveResumeModal';
import { JobMatcherModal } from '@/components/resume/JobMatcherModal';
import { InteractiveProjectModal } from '@/components/projects/InteractiveProjectModal';
import { AIBusinessIdeaModal } from '@/components/ai/AIBusinessIdeaModal';
import { CommandPalette } from '@/components/operating-system/CommandPalette';
import { SystemStatusHUD } from '@/components/operating-system/SystemStatusHUD';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <OSProvider>
      <SessionMemoryProvider>
        <LoadingScreen onFinish={() => setLoadingComplete(true)} />

        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <Hero />
          <RecruiterBanner />
          <About />
          <Skills />
          <FeaturedProject />
          <Projects />
          <LiveCodeLab />
          <Services />
          <Intelligence3DSection />
          <Achievements />
          <ContactIntelligent />
          <Footer />

          {/* OS Modals & HUD Overlays */}
          <AIDigitalTwinModal />
          <VoiceModeController />
          <InteractiveResumeModal />
          <JobMatcherModal />
          <InteractiveProjectModal />
          <AIBusinessIdeaModal />
          <CommandPalette />
          <SystemStatusHUD />
        </main>
      </SessionMemoryProvider>
    </OSProvider>
  );
}
