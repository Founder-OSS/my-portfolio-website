'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- DATA TYPES ---
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  updated_at: string;
  fork: boolean;
}

// --- 3D COMPONENT: Precision Gyroscope ---
function ScientificCore() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    outerRef.current.rotation.y += delta * 0.15;
    outerRef.current.rotation.x += delta * 0.05;
    innerRef.current.rotation.y -= delta * 0.25;
    innerRef.current.rotation.z += delta * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Outer Shell */}
      <mesh ref={outerRef} scale={2.2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#58a6ff" wireframe transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Core */}
      <mesh ref={innerRef} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#58a6ff" emissiveIntensity={0.5} roughness={0} metalness={0.9} clearcoat={1} transparent opacity={0.9} />
      </mesh>
    </Float>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const username = 'Founder-OSS';

  // LIVE DATA CONNECTION
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        if (!response.ok) throw new Error('Uplink Failed');
        const data = await response.json();
        const filtered = data.filter((repo: Repo) => !repo.fork).slice(0, 4); // Limit to top 4 for cleaner UI
        setRepos(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <main className="relative w-full h-screen bg-[#050505] overflow-hidden font-mono text-sm text-gray-300">
      
      {/* LAYER 1: 3D Environment */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -5, -10]} intensity={1} color="#58a6ff" />
          <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
          <ScientificCore />
        </Canvas>
      </div>

      {/* LAYER 2: HUD Interface */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-12 pointer-events-none">
        
        {/* Top Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-xl font-bold text-white tracking-[0.2em] mb-1">FOUNDER-OSS</h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-emerald-400/80 tracking-widest uppercase">Uplink Active</span>
            </div>
          </div>
          <div className="text-right opacity-50 text-[10px]">
            <p>ID: {username}</p>
            <p>SECURE_MODE: ON</p>
          </div>
        </div>

        {/* Center: Data Grid */}
        <div className="flex-grow flex items-center justify-center pointer-events-auto">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {loading ? (
               <div className="col-span-2 text-center text-brand-blue animate-pulse">SCANNING REPOSITORIES...</div>
            ) : (
              repos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-brand-blue/50 p-6 transition-all duration-300 hover:bg-white/10"
                >
                  {/* Decorative Corner Markers */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-brand-blue"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-brand-blue"></div>

                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-white font-bold tracking-tight group-hover:text-brand-blue transition-colors">
                      ./{repo.name}
                    </h2>
                    {repo.language && (
                      <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded text-white/60">
                        {repo.language.toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {repo.description || "No description provided."}
                  </p>
                  
                  <div className="text-[10px] text-brand-blue/60 tracking-widest uppercase">
                    LAST_UPDATE: {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                </a>
              ))
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-between items-end opacity-40 text-[10px] uppercase tracking-widest mt-8">
          <p>System Architecture: Next.js + R3F</p>
          <p>Render: v2.2.0</p>
        </div>

      </div>
    </main>
  );
}
