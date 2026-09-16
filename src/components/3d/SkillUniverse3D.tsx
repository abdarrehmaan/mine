'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useOS } from '@/context/OSContext';
import { useSessionMemory } from '@/context/SessionMemoryContext';

const SKILL_NODES = [
  { id: 'ai', label: 'AI & LLMS', angle: 0, radius: 2.8, color: 'text-cyan-300 border-cyan-500/50 bg-cyan-950/90 shadow-cyan-500/30' },
  { id: 'java', label: 'JAVA', angle: (Math.PI / 5) * 1, radius: 2.5, color: 'text-amber-300 border-amber-500/50 bg-amber-950/90 shadow-amber-500/30' },
  { id: 'python', label: 'PYTHON', angle: (Math.PI / 5) * 2, radius: 2.9, color: 'text-emerald-300 border-emerald-500/50 bg-emerald-950/90 shadow-emerald-500/30' },
  { id: 'nextjs', label: 'NEXT.JS', angle: (Math.PI / 5) * 3, radius: 2.6, color: 'text-purple-300 border-purple-500/50 bg-purple-950/90 shadow-purple-500/30' },
  { id: 'react', label: 'REACT', angle: (Math.PI / 5) * 4, radius: 2.7, color: 'text-cyan-300 border-cyan-500/50 bg-cyan-950/90 shadow-cyan-500/30' },
  { id: 'supabase', label: 'SUPABASE', angle: (Math.PI / 5) * 5, radius: 2.8, color: 'text-emerald-300 border-emerald-500/50 bg-emerald-950/90 shadow-emerald-500/30' },
  { id: 'automation', label: 'AUTOMATION', angle: (Math.PI / 5) * 6, radius: 3.1, color: 'text-pink-300 border-pink-500/50 bg-pink-950/90 shadow-pink-500/30' },
  { id: 'api', label: 'REST APIS', angle: (Math.PI / 5) * 7, radius: 2.5, color: 'text-blue-300 border-blue-500/50 bg-blue-950/90 shadow-blue-500/30' },
  { id: 'database', label: 'POSTGRESQL', angle: (Math.PI / 5) * 8, radius: 2.9, color: 'text-indigo-300 border-indigo-500/50 bg-indigo-950/90 shadow-indigo-500/30' },
  { id: 'cloud', label: 'DOCKER / CLOUD', angle: (Math.PI / 5) * 9, radius: 2.7, color: 'text-teal-300 border-teal-500/50 bg-teal-950/90 shadow-teal-500/30' },
];

function OrbitingSkillNode({
  node,
  isSelected,
  onClick,
}: {
  node: (typeof SKILL_NODES)[0];
  isSelected: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.2 + node.angle;
    const x = Math.cos(t) * node.radius;
    const z = Math.sin(t) * node.radius;
    const y = Math.sin(t * 1.8 + node.angle) * 0.5;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={isSelected ? '#00f0ff' : '#ffffff'} />
      </mesh>

      <Html distanceFactor={8.5} center position={[0, 0.28, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`cursor-pointer px-3 py-1.5 rounded-xl border backdrop-blur-md font-mono text-[11px] font-bold tracking-widest transition-all duration-300 select-none whitespace-nowrap shadow-lg ${
            node.color
          } ${
            isSelected
              ? 'ring-2 ring-cyan-400 scale-125 bg-cyan-900 shadow-[0_0_25px_#00f0ff]'
              : hovered
              ? 'scale-120 opacity-100 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'scale-100 opacity-85'
          }`}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

export function SkillUniverse3D() {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { activeTechFilter, setActiveTechFilter, triggerNavigation } = useOS();
  const { trackEvent } = useSessionMemory();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.4;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 2.5, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 2.5, delta);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
  });

  const handleNodeClick = (label: string) => {
    trackEvent('skill_explore', label);
    if (activeTechFilter === label) {
      setActiveTechFilter(null);
    } else {
      setActiveTechFilter(label);
      triggerNavigation('projects');
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-5, -5, -3]} intensity={1.5} color="#9d4edd" />

        {/* Central Core: "ME / ARCHITECT" */}
        <mesh ref={coreRef} scale={1.0}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#070914"
            emissive="#00f0ff"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>

        <mesh scale={0.65}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#9d4edd"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Central Center HTML Badge */}
        <Html distanceFactor={8} center position={[0, 0, 0]}>
          <div className="pointer-events-none px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400 font-mono text-[11px] font-extrabold text-cyan-300 shadow-[0_0_20px_#00f0ff] tracking-widest uppercase select-none">
            ENGINEER CORE
          </div>
        </Html>

        {/* Orbit Rings */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.7, 0.012, 16, 80]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[3.0, 0.01, 16, 80]} />
          <meshBasicMaterial color="#9d4edd" transparent opacity={0.25} />
        </mesh>

        {/* 10 Orbiting Skill Nodes */}
        {SKILL_NODES.map((node) => (
          <OrbitingSkillNode
            key={node.id}
            node={node}
            isSelected={activeTechFilter === node.label}
            onClick={() => handleNodeClick(node.label)}
          />
        ))}
      </group>
    </Float>
  );
}
