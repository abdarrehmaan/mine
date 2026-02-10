import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCard3DProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
}

// 3D Card Component
const Card3D = ({ image, technologies }: ProjectCard3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const texture = useTexture(image);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth tilt based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.3,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePosition.y * 0.3,
        0.1
      );
      
      // Floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handlePointerMove = (e: any) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    });
  };

  return (
    <group
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* Main card */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 2.2, 0.1]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Card border glow */}
      <mesh position={[0, 0, -0.06]} scale={hovered ? 1.05 : 1}>
        <boxGeometry args={[3.6, 2.3, 0.02]} />
        <meshStandardMaterial
          color="#2c2cff"
          transparent
          opacity={hovered ? 0.6 : 0.3}
          emissive="#2c2cff"
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Tech badges */}
      {technologies.slice(0, 3).map((tech, i) => (
        <group key={tech} position={[-1.2 + i * 1.2, -1.4, 0.1]}>
          <mesh>
            <planeGeometry args={[1, 0.3]} />
            <meshStandardMaterial
              color="#0f0f1a"
              transparent
              opacity={0.9}
            />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.12}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {tech}
          </Text>
        </group>
      ))}
      
      {/* Hover glow effect */}
      {hovered && (
        <mesh position={[0, 0, -0.2]}>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial
            color="#2c2cff"
            transparent
            opacity={0.1}
            emissive="#2c2cff"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// Scene Component
const Scene = (props: ProjectCard3DProps) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#2c2cff" />
      <Card3D {...props} />
    </>
  );
};

// Main Component
const ProjectCard3D = (props: ProjectCard3DProps) => {
  return (
    <div className="w-full h-[350px] cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
};

export default ProjectCard3D;
