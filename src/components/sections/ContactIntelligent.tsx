'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  MessageSquare,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { useSessionMemory } from '@/context/SessionMemoryContext';

const INQUIRY_TYPES = [
  'Hire Me (Full-time / Contract)',
  'Build a Product',
  'AI Solution & Chatbots',
  'WhatsApp & Process Automation',
  'Collaboration & Technical Advisory',
  'General Inquiry',
] as const;

export function ContactIntelligent() {
  const [selectedType, setSelectedType] = useState<(typeof INQUIRY_TYPES)[number]>('Hire Me (Full-time / Contract)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeline, setTimeline] = useState('Immediate / Flexible');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { trackEvent } = useSessionMemory();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    trackEvent('cta_click', `contact_submit_${selectedType}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badgeText="Start a Conversation"
          badgeVariant="cyan"
          title="Let's Build Something Intelligent."
          subtitle="Have an idea, project, or role? Select your goal below for a personalized conversation flow."
        />

        {/* Dynamic Goal Selection Pills */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 sm:mb-12 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
          {INQUIRY_TYPES.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 border flex-shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Live Request Summary */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Live Request Summary Card */}
            <div className="p-7 rounded-3xl glass-panel border border-cyan-500/20 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Your Request Summary</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono text-slate-300 border-t border-white/10 pt-4">
                <div>
                  <span className="text-slate-500">Inquiry Scope: </span>
                  <span className="text-cyan-300 font-bold">{selectedType}</span>
                </div>
                <div>
                  <span className="text-slate-500">Timeline: </span>
                  <span className="text-white">{timeline}</span>
                </div>
                <div>
                  <span className="text-slate-500">Preferred Channel: </span>
                  <span className="text-emerald-400">Direct Email / WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Direct Channels & Copy Email */}
            <div className="p-7 rounded-3xl glass-panel space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight">
                Direct Contact Channels
              </h3>

              {/* Copy Email Pill */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono text-xs text-slate-200 truncate">
                    {portfolioData.personal.socials.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors shrink-0"
                  aria-label="Copy Email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={portfolioData.personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all flex items-center gap-2.5 group"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                    LinkedIn
                  </div>
                </a>

                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all flex items-center gap-2.5 group"
                >
                  <Github className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">
                    GitHub
                  </div>
                </a>

                {portfolioData.personal.socials.whatsapp && (
                  <a
                    href={portfolioData.personal.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all flex items-center gap-2.5 group col-span-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      WhatsApp Business Chat
                    </div>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <TiltCard maxTilt={4} className="w-full">
              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 space-y-5 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name Input */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-300"
                    >
                      Your Name / Organization
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-base placeholder:text-slate-600 outline-none transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-base placeholder:text-slate-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Timeline Choice */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-300">
                    Project / Hiring Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Immediate', '1 - 3 Months', 'Exploring Options'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeline(t)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border active:scale-95 ${
                          timeline === t
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                            : 'bg-white/[0.02] text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-300"
                  >
                    Project Details / Requirement
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Describe your vision for ${selectedType.toLowerCase()}...`}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-base placeholder:text-slate-600 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button & Feedback */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {isSubmitted && (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message received. I will reply shortly.</span>
                    </div>
                  )}
                </div>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
