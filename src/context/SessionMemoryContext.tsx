'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface JourneyEvent {
  id: string;
  type: 'section_view' | 'project_open' | 'skill_explore' | 'ai_query' | 'resume_view' | 'mode_change' | 'cta_click';
  target: string;
  timestamp: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actionTaken?: string;
  timestamp: number;
}

interface SessionMemoryContextType {
  events: JourneyEvent[];
  trackEvent: (type: JourneyEvent['type'], target: string) => void;
  messages: AIMessage[];
  addMessage: (sender: 'user' | 'ai', text: string, actionTaken?: string) => void;
  clearMessages: () => void;
  // Adaptive UI indicators
  technicalScore: number;
  businessScore: number;
  preferredIntent: 'technical' | 'business' | 'balanced';
}

const SessionMemoryContext = createContext<SessionMemoryContextType | undefined>(undefined);

export function SessionMemoryProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<JourneyEvent[]>([]);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "Hello! I am the portfolio's AI Digital Twin. Ask me anything about skills, projects, architecture, or have me navigate the website for you.",
      timestamp: Date.now(),
    },
  ]);

  const trackEvent = (type: JourneyEvent['type'], target: string) => {
    const newEvent: JourneyEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      target,
      timestamp: Date.now(),
    };
    setEvents((prev) => [...prev.slice(-99), newEvent]);
  };

  const addMessage = (sender: 'user' | 'ai', text: string, actionTaken?: string) => {
    const newMsg: AIMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender,
      text,
      actionTaken,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'Session memory refreshed. How can I assist you now?',
        timestamp: Date.now(),
      },
    ]);
  };

  // Compute adaptive UI intent score from event patterns
  const technicalEvents = events.filter((e) =>
    ['codelab', 'architecture', 'projects', 'languages', 'ast', 'python', 'java', 'sql'].some((term) =>
      e.target.toLowerCase().includes(term)
    )
  ).length;

  const businessEvents = events.filter((e) =>
    ['services', 'client', 'automation', 'idea', 'pricing', 'contact', 'consulting'].some((term) =>
      e.target.toLowerCase().includes(term)
    )
  ).length;

  const preferredIntent: 'technical' | 'business' | 'balanced' =
    technicalEvents > businessEvents + 2
      ? 'technical'
      : businessEvents > technicalEvents + 2
      ? 'business'
      : 'balanced';

  return (
    <SessionMemoryContext.Provider
      value={{
        events,
        trackEvent,
        messages,
        addMessage,
        clearMessages,
        technicalScore: technicalEvents,
        businessScore: businessEvents,
        preferredIntent,
      }}
    >
      {children}
    </SessionMemoryContext.Provider>
  );
}

export function useSessionMemory() {
  const context = useContext(SessionMemoryContext);
  if (!context) {
    throw new Error('useSessionMemory must be used within a SessionMemoryProvider');
  }
  return context;
}
