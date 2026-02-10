import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated Ring
const AnimatedRing = ({ 
  radius, 
  tube, 
  color, 
  speed, 
  position 
}: { 
  radius: number; 
  tube: number; 
  color: string; 
  speed: number;
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[radius, tube, 16, 100]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// Floating Cubes
const FloatingCube = ({ 
  position, 
  size, 
  color, 
  speed 
}: { 
  position: [number, number, number]; 
  size: number; 
  color: string; 
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={1}
    >
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Wireframe */}
      <mesh position={position} scale={1.01}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

// Particle Sphere
const ParticleSphere = ({ count = 50 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2 + Math.random() * 0.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Blue color variations
      colors[i * 3] = 0.17 + Math.random() * 0.1;
      colors[i * 3 + 1] = 0.17 + Math.random() * 0.1;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Central Glow Sphere
const GlowSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#2c2cff"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.5}
        emissive="#2c2cff"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
};

// Scene Component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#2c2cff" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />
      
      {/* Central glow */}
      <GlowSphere />
      
      {/* Particle sphere */}
      <ParticleSphere count={80} />
      
      {/* Animated rings */}
      <AnimatedRing radius={2.5} tube={0.02} color="#2c2cff" speed={0.5} position={[0, 0, 0]} />
      <AnimatedRing radius={3} tube={0.015} color="#4a4aff" speed={-0.3} position={[0, 0, 0]} />
      <AnimatedRing radius={3.5} tube={0.01} color="#6b6bff" speed={0.2} position={[0, 0, 0]} />
      
      {/* Floating cubes */}
      <FloatingCube position={[-3, 2, -2]} size={0.4} color="#2c2cff" speed={0.8} />
      <FloatingCube position={[3, -2, -1]} size={0.3} color="#4a4aff" speed={1} />
      <FloatingCube position={[-2, -3, 1]} size={0.35} color="#1b1bff" speed={0.6} />
      <FloatingCube position={[2.5, 2.5, -3]} size={0.25} color="#6b6bff" speed={1.2} />
    </>
  );
};

// Main Component
const ContactDecoration = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ContactDecoration;
