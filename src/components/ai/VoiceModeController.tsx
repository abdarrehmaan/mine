'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, AlertCircle } from 'lucide-react';
import { useOS } from '@/context/OSContext';
import { useSessionMemory } from '@/context/SessionMemoryContext';
import { queryPortfolioAI } from '@/ai/portfolioEngine';
import { WebGLFallback } from '@/components/3d/WebGLFallback';

const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false, loading: () => <WebGLFallback label="VOICE CORE" /> }
);

const VoiceVisualizer3D = dynamic(
  () => import('@/components/3d/VoiceVisualizer3D').then((mod) => mod.VoiceVisualizer3D),
  { ssr: false }
);

export function VoiceModeController() {
  const { isVoiceActive, setIsVoiceActive, triggerNavigation, setSelectedProject, setIsResumeModalOpen, setMode } = useOS();
  const { addMessage, trackEvent } = useSessionMemory();

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiSpeechText, setAiSpeechText] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setVoiceSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          handleVoiceInput(currentTranscript);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech Recognition notice:', err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      setTranscript('');
      try {
        recognitionRef.current.start();
      } catch {}
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleVoiceInput = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    addMessage('user', spokenText);
    trackEvent('ai_query', `voice: ${spokenText}`);

    // Query portfolio AI
    const result = queryPortfolioAI(spokenText);
    setAiSpeechText(result.answer);
    addMessage('ai', result.answer, result.action?.type);

    // Speak response using SpeechSynthesis
    speakResponse(result.answer);

    // Execute navigation action if returned
    if (result.action) {
      if (result.action.type === 'NAVIGATE' && result.action.target) {
        triggerNavigation(result.action.target, result.action.payload);
      } else if (result.action.type === 'OPEN_MODAL') {
        if (result.action.target === 'resume') setIsResumeModalOpen(true);
        if (result.action.target === 'project' && result.action.payload) setSelectedProject(result.action.payload);
      } else if (result.action.type === 'SET_MODE' && result.action.target) {
        setMode(result.action.target as any);
      }
    }
  };

  const speakResponse = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 280)); // Clean concise speech
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Automatically listen again after speaking for seamless hands-free conversation
        setTimeout(() => startListening(), 600);
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const closeVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopListening();
    setIsVoiceActive(false);
  };

  if (!isVoiceActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/85 backdrop-blur-2xl"
      >
        <div className="relative w-full max-w-lg p-8 rounded-3xl glass-panel border border-cyan-500/30 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          {/* Close Button */}
          <button
            onClick={closeVoice}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
              AI VOICE OPERATING INTERFACE
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">
            {isSpeaking ? 'AI Speaking...' : isListening ? 'Listening to You...' : 'Tap Mic to Speak'}
          </h3>

          {/* 3D Voice Reactive Visualizer */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative mb-6">
            <CanvasContainer fallbackLabel="VOICE ORB" camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <VoiceVisualizer3D isListening={isListening} isSpeaking={isSpeaking} />
            </CanvasContainer>
          </div>

          {/* Live Transcript / Speech readout */}
          <div className="w-full min-h-[70px] p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-center text-center">
            {transcript ? (
              <p className="text-sm font-mono text-cyan-300">"{transcript}"</p>
            ) : aiSpeechText ? (
              <p className="text-sm text-slate-300 leading-relaxed max-h-24 overflow-y-auto">
                {aiSpeechText}
              </p>
            ) : (
              <p className="text-xs font-mono text-slate-500">
                Try saying: "Show me your AI projects", "Tell me about Java", or "Why should I hire you?"
              </p>
            )}
          </div>

          {/* Controls */}
          {voiceSupported ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-5 rounded-full border transition-all duration-300 shadow-lg ${
                  isListening
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_30px_#00f0ff] animate-pulse'
                    : 'bg-white/5 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20'
                }`}
                aria-label={isListening ? 'Stop Listening' : 'Start Listening'}
              >
                {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Speech recognition is not supported in this browser. Please use text chat mode.</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
