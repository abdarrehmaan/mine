'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function HologramGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.5;
      wireRef.current.rotation.z += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.8;
      const scale = 0.5 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[0, 0, 0]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-3, -3, -2]} intensity={1.2} color="#9d4edd" />

        {/* Outer Translucent Octahedron */}
        <mesh ref={meshRef} scale={1.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#00f0ff"
            emissive="#0a2540"
            roughness={0.1}
            metalness={0.1}
            transmission={0.8}
            thickness={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Wireframe Octahedron */}
        <mesh ref={wireRef} scale={1.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9d4edd"
            emissive="#9d4edd"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerRef} scale={0.5}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00f0ff"
            emissiveIntensity={1}
            roughness={0}
          />
        </mesh>

        {/* Orbit Ring */}
        <group ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.9, 0.015, 16, 64]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
          </mesh>
          <mesh position={[1.9, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#9d4edd" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
