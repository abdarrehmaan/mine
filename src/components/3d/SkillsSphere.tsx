import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface TechItem {
  name: string;
  position: [number, number, number];
  color: string;
}

// Individual Tech Node
const TechNode = ({ tech, index }: { tech: TechItem; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.2, 0.2]}
    >
      <group position={tech.position}>
        {/* Glow sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={tech.color}
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.8}
            emissive={tech.color}
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.02, 8, 32]} />
          <meshStandardMaterial
            color={tech.color}
            transparent
            opacity={0.4}
            emissive={tech.color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Tech name */}
        <Text
          ref={textRef}
          position={[0, -0.6, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {tech.name}
        </Text>
      </group>
    </Float>
  );
};

// Central Core
const CentralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#2c2cff"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.9}
          emissive="#2c2cff"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#2c2cff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

// Connection Lines
const ConnectionLines = ({ techs }: { techs: TechItem[] }) => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const positions: number[] = [];
    techs.forEach((tech, i) => {
      // Connect to center
      positions.push(0, 0, 0, ...tech.position);
      
      // Connect to nearby techs
      techs.forEach((otherTech, j) => {
        if (i !== j && i < j) {
          const distance = Math.sqrt(
            Math.pow(tech.position[0] - otherTech.position[0], 2) +
            Math.pow(tech.position[1] - otherTech.position[1], 2) +
            Math.pow(tech.position[2] - otherTech.position[2], 2)
          );
          if (distance < 3) {
            positions.push(...tech.position, ...otherTech.position);
          }
        }
      });
    });
    return new Float32Array(positions);
  }, [techs]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#2c2cff" transparent opacity={0.2} />
    </lineSegments>
  );
};

// Main Scene
const Scene = ({ technologies }: { technologies: string[] }) => {
  // Generate positions on a sphere
  const techs: TechItem[] = useMemo(() => {
    const colors = ['#2c2cff', '#4a4aff', '#1b1bff', '#6b6bff', '#3d3dff'];
    const radius = 3;
    
    return technologies.map((name, i) => {
      const phi = Math.acos(-1 + (2 * i) / technologies.length);
      const theta = Math.sqrt(technologies.length * Math.PI) * phi;
      
      return {
        name,
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ] as [number, number, number],
        color: colors[i % colors.length],
      };
    });
  }, [technologies]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#2c2cff" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffffff" />
      
      <CentralCore />
      <ConnectionLines techs={techs} />
      
      {techs.map((tech, index) => (
        <TechNode
          key={tech.name}
          tech={tech}
          index={index}
        />
      ))}
    </>
  );
};

// Main Component
const SkillsSphere = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="w-full h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene technologies={technologies} />
      </Canvas>
    </div>
  );
};

export default SkillsSphere;
