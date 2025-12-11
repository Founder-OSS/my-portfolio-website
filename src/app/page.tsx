'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// 1. The 3D Object (The "System Core")
function SystemCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Animation Loop: Rotates the object every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial color="#58a6ff" wireframe linewidth={2} />
      </mesh>
    </Float>
  );
}

// 2. The Main Page Component
export default function Home() {
  return (
    <main className="relative w-full h-screen bg-brand-dark overflow-hidden">
      
      {/* LAYER 1: The 3D World (Background) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {/* A massive starfield background */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <SystemCore />
        </Canvas>
      </div>

      {/* LAYER 2: The UI (Foreground) */}
      {/* We use 'pointer-events-none' so you can still drag the 3D scene behind the text if we enable controls later */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        
        <div className="pointer-events-auto p-8 bg-black/60 backdrop-blur-md border border-brand-green/30 rounded-lg shadow-2xl text-center max-w-md mx-4">
          <h1 className="text-5xl font-bold text-brand-blue mb-2 tracking-tighter">
            Founder-OSS
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-green to-transparent my-4"></div>
          <p className="text-gray-300 font-mono text-sm mb-6">
            Systems Engineering • Automation • 3D Web
          </p>
          
          <div className="flex gap-4 justify-center">
             <button className="px-6 py-2 bg-brand-blue/10 border border-brand-blue text-brand-blue rounded hover:bg-brand-blue hover:text-white transition-all duration-300 font-mono text-sm">
               PROJECTS
             </button>
             <button className="px-6 py-2 bg-brand-green/10 border border-brand-green text-brand-green rounded hover:bg-brand-green hover:text-white transition-all duration-300 font-mono text-sm">
               CONTACT
             </button>
          </div>
        </div>

      </div>
    </main>
  );
}
