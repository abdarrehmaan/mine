'use client';

import React, { Component, ReactNode, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { WebGLFallback } from './WebGLFallback';

interface Props {
  children: ReactNode;
  fallbackLabel?: string;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
}

interface State {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, State> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('WebGL Rendering fallback triggered:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function CanvasContainer({
  children,
  fallbackLabel = '3D EXPERIENCE',
  className = 'w-full h-full min-h-[300px]',
  camera = { position: [0, 0, 5], fov: 45 },
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLAvailable(false);
      }
    } catch {
      setIsWebGLAvailable(false);
    }
  }, []);

  if (!mounted) {
    return <WebGLFallback label={fallbackLabel} />;
  }

  if (!isWebGLAvailable) {
    return <WebGLFallback label={fallbackLabel} />;
  }

  return (
    <div className={`relative ${className}`}>
      <CanvasErrorBoundary fallback={<WebGLFallback label={fallbackLabel} />}>
        <Suspense fallback={<WebGLFallback label="LOADING 3D..." />}>
          <Canvas
            camera={camera}
            dpr={[1, 1.5]} // Limit pixel ratio for crisp rendering without battery drain
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            style={{ width: '100%', height: '100%' }}
          >
            {children}
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
