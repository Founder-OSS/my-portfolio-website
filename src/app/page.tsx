'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Float, Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D COMPONENT: Precision Gyroscope ---
function ScientificCore() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    // Stable, calculated rotation
    outerRef.current.rotation.y += delta * 0.15;
    outerRef.current.rotation.x += delta * 0.05;
    
    // Inner core rotates faster in reverse (Counter-balance)
    innerRef.current.rotation.y -= delta * 0.25;
    innerRef.current.rotation.z += delta * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Outer Shell: Wireframe Sphere (Protection/Stability) */}
      <mesh ref={outerRef} scale={2.2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial 
          color="#58a6ff" 
          wireframe 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Core: Solid Crystal (The Data) */}
      <mesh ref={innerRef} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          emissive="#58a6ff"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={0.9}
          clearcoat={1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  return (
    <main className="relative w-full h-screen bg-[#050505] overflow-hidden font-mono text-sm text-gray-300">
      
      {/* LAYER 1: The 3D Environment (Clean Deep Space) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
          {/* Scientific Lighting: Clean and cool */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -5, -10]} intensity={1} color="#58a6ff" />
          
          {/* Subtle Background Stars */}
          <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
          
          <ScientificCore />
        </Canvas>
      </div>

      {/* LAYER 2: The Interface (Glassmorphism / HUD) */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 pointer-events-none">
        
        {/* Top Header: System Status */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-white tracking-[0.2em] mb-1">FOUNDER-OSS</h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-emerald-400/80 tracking-widest uppercase">Systems Normal</span>
            </div>
          </div>
          <div className="text-right opacity-50 text-[10px]">
            <p>LAT: 33.5207° N</p>
            <p>LNG: 86.8025° W</p>
          </div>
        </div>

        {/* Center: Main Content Card */}
        <div className="self-center text-center pointer-events-auto">
          <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-sm shadow-2xl max-w-lg">
            
            {/* Geometric Decorative Line */}
            <div className="flex justify-center mb-6 opacity-30">
              <div className="h-px w-12 bg-white"></div>
              <div className="h-px w-12 bg-transparent border-t border-white border-dashed"></div>
              <div className="h-px w-12 bg-white"></div>
            </div>

            <h2 className="text-4xl font-light text-white mb-2 tracking-tight">
              Systems Engineering
            </h2>
            <p className="text-brand-blue/80 mb-6 text-xs uppercase tracking-[0.3em]">
              Research & Development
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm mx-auto text-xs">
              Designing scalable automated workflows and high-performance computational tools. 
              Bridging the gap between theoretical architecture and deployed reality.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button className="px-6 py-3 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-xs tracking-widest uppercase">
                View Research
              </button>
              <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all duration-300 text-xs tracking-widest uppercase font-bold">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer: Tech Stack */}
        <div className="flex justify-between items-end opacity-40 text-[10px] uppercase tracking-widest">
          <div className="space-y-1">
            <p>Architecture: Next.js / React</p>
            <p>Render Engine: Three Fiber</p>
          </div>
          <div className="text-right">
            <p>Secure Connection</p>
            <p>v2.1.0 Stable</p>
          </div>
        </div>

      </div>
    </main>
  );
}

