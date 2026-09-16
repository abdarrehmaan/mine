'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlowingBadge } from './GlowingBadge';

interface SectionHeadingProps {
  badgeText: string;
  badgeVariant?: 'cyan' | 'purple' | 'emerald' | 'amber';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badgeText,
  badgeVariant = 'cyan',
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}
    >
      <div className={`mb-3 ${isCenter ? 'flex justify-center' : ''}`}>
        <GlowingBadge variant={badgeVariant}>{badgeText}</GlowingBadge>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
