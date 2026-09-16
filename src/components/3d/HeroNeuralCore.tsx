'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Particle cloud around the neural core
function ParticleCloud({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorCyan = new THREE.Color('#00f0ff');
    const colorPurple = new THREE.Color('#9d4edd');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Generate points on and around a sphere shell
      const radius = 1.8 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 
        ? colorCyan.clone().lerp(colorPurple, Math.random()) 
        : colorWhite.clone().lerp(colorCyan, Math.random());

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Inner Geometric Core & Orbiting Rings
export function HeroNeuralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Damped mouse tracking parallax
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.45;
      const targetY = state.pointer.y * 0.45;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 3, delta);
    }

    // Core rotations
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.z += delta * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.35;
      wireframeRef.current.rotation.x += delta * 0.2;
    }

    // Orbiting rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.25;
      ring2Ref.current.rotation.z -= delta * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.2;
      ring3Ref.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-5, -5, -3]} intensity={1.5} color="#9d4edd" />
        <pointLight position={[0, 4, -4]} intensity={0.8} color="#ffffff" />

        {/* Central Glowing Icosahedron Core */}
        <mesh ref={coreRef} scale={1.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#08081a"
            emissive="#00f0ff"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Lattice */}
        <mesh ref={wireframeRef} scale={1.35}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#9d4edd"
            emissiveIntensity={0.6}
            wireframe={true}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.75, 0.015, 16, 64]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
          </mesh>
          <mesh position={[1.75, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Orbital Ring 2 */}
        <group ref={ring2Ref}>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[2.05, 0.012, 16, 64]} />
            <meshBasicMaterial color="#9d4edd" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-2.05, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Orbital Ring 3 */}
        <group ref={ring3Ref}>
          <mesh rotation={[Math.PI / 2.2, -Math.PI / 6, 0]}>
            <torusGeometry args={[2.35, 0.01, 16, 64]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Dynamic Neural Particles */}
        <ParticleCloud count={140} />
      </group>
    </Float>
  );
}
