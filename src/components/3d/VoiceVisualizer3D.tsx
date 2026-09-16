'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  isListening: boolean;
  isSpeaking: boolean;
}

export function VoiceVisualizer3D({ isListening, isSpeaking }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isSpeaking ? 2.5 : isListening ? 1.5 : 0.5);
      meshRef.current.rotation.x += delta * (isSpeaking ? 1.8 : 0.3);

      const pulseFreq = isSpeaking ? 12 : isListening ? 8 : 2;
      const amplitude = isSpeaking ? 0.25 : isListening ? 0.15 : 0.05;
      const scale = 1.0 + Math.sin(t * pulseFreq) * amplitude;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * (isSpeaking ? 3 : 1);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={2} color={isSpeaking ? '#10b981' : isListening ? '#00f0ff' : '#9d4edd'} />

        {/* Central Organic Audio Orb */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 3]} />
          <meshStandardMaterial
            color={isSpeaking ? '#064e3b' : isListening ? '#083344' : '#1e1b4b'}
            emissive={isSpeaking ? '#10b981' : isListening ? '#00f0ff' : '#9d4edd'}
            emissiveIntensity={isSpeaking || isListening ? 0.9 : 0.4}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>

        {/* Orbiting Frequency Ring */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial
            color={isSpeaking ? '#10b981' : isListening ? '#00f0ff' : '#ffffff'}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
}
