import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Floating Cube Component
const FloatingCube = ({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh position={position} scale={1.01}>
        <boxGeometry args={[1, 1, 1]} />
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

// Floating Sphere Component
const FloatingSphere = ({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={1.5}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

// Floating Torus Component
const FloatingTorus = ({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={1.5}
      floatIntensity={2}
      floatingRange={[-0.4, 0.4]}
    >
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.2, 16, 50]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Distorted Sphere - Main centerpiece
const DistortedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, -5]}>
        <MeshDistortMaterial
          color="#2c2cff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          emissive="#2c2cff"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
};

// Particle Field
const ParticleField = ({ count = 100 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#2c2cff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Main Scene
const Scene = () => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Directional lights */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#2c2cff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#2c2cff" />
      
      {/* Main distorted sphere */}
      <DistortedSphere />
      
      {/* Floating shapes */}
      <FloatingCube position={[-4, 2, -3]} color="#2c2cff" speed={1.5} />
      <FloatingCube position={[4, -2, -4]} color="#4a4aff" speed={2} />
      <FloatingCube position={[-3, -3, -2]} color="#1b1bff" speed={1.8} />
      
      <FloatingSphere position={[3, 3, -5]} color="#2c2cff" speed={1.2} />
      <FloatingSphere position={[-2, -1, -6]} color="#4a4aff" speed={1.6} />
      
      <FloatingTorus position={[5, 1, -4]} color="#2c2cff" speed={1.3} />
      <FloatingTorus position={[-5, -1, -3]} color="#4a4aff" speed={1.7} />
      
      {/* Particle field */}
      <ParticleField count={150} />
    </>
  );
};

// Main Component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
