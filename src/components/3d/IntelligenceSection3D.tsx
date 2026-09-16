'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const NODES = [
  { text: 'AI', angle: 0, radius: 2.6, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/80' },
  { text: 'CODE', angle: (Math.PI / 3) * 1, radius: 2.8, color: 'text-purple-400 border-purple-500/40 bg-purple-950/80' },
  { text: 'DATA', angle: (Math.PI / 3) * 2, radius: 2.5, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80' },
  { text: 'AUTOMATION', angle: (Math.PI / 3) * 3, radius: 2.9, color: 'text-amber-400 border-amber-500/40 bg-amber-950/80' },
  { text: 'CLOUD', angle: (Math.PI / 3) * 4, radius: 2.7, color: 'text-blue-400 border-blue-500/40 bg-blue-950/80' },
  { text: 'WEB', angle: (Math.PI / 3) * 5, radius: 2.6, color: 'text-pink-400 border-pink-500/40 bg-pink-950/80' },
];

function OrbitingNode({
  node,
  speedOffset = 0,
}: {
  node: (typeof NODES)[0];
  speedOffset?: number;
}) {
  const nodeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.3 + node.angle;
    const x = Math.cos(t) * node.radius;
    const z = Math.sin(t) * node.radius;
    const y = Math.sin(t * 1.5 + node.angle) * 0.6;

    if (nodeRef.current) {
      nodeRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={nodeRef}>
      {/* 3D tiny glowing anchor sphere */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Floating crisp HTML billboard */}
      <Html distanceFactor={8} center position={[0, 0.25, 0]}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`cursor-pointer px-3 py-1.5 rounded-xl border backdrop-blur-md font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-lg select-none whitespace-nowrap ${
            node.color
          } ${hovered ? 'scale-125 shadow-[0_0_20px_rgba(0,240,255,0.6)]' : 'scale-100 opacity-90'}`}
        >
          {node.text}
        </div>
      </Html>
    </group>
  );
}

export function IntelligenceSection3D() {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle pointer parallax
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 2, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 2, delta);
    }

    // Torus knot core rotation
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.4;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[-4, -4, -4]} intensity={1.8} color="#9d4edd" />

        {/* Central Complex Torus Knot Structure */}
        <mesh ref={coreRef} scale={1.1}>
          <torusKnotGeometry args={[0.9, 0.25, 128, 32, 2, 3]} />
          <meshStandardMaterial
            color="#090a18"
            emissive="#00f0ff"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.9}
            wireframe={true}
          />
        </mesh>

        {/* Inner Core Ball */}
        <mesh scale={0.65}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#9d4edd"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Orbital Grid Ring */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>

        {/* Orbiting Keywords */}
        {NODES.map((node) => (
          <OrbitingNode key={node.text} node={node} />
        ))}
      </group>
    </Float>
  );
}
