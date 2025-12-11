'use client';

import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  updated_at: string;
  fork: boolean;
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const username = 'Founder-OSS';

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        if (!response.ok) throw new Error('GitHub API Error');
        const data = await response.json();
        const filtered = data.filter((repo: Repo) => !repo.fork).slice(0, 5);
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
    // HARDCODED STYLE: Forces dark mode and monospace font even if CSS fails
    <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0d1117', 
        color: '#c9d1d9', 
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center'
    }}>
      <div style={{ 
          width: '100%', 
          maxWidth: '900px', 
          position: 'relative', 
          paddingBottom: '40px' 
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #30363d' }}>
            <h1 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: '#58a6ff', margin: 0, fontWeight: 'bold' }}>
                <span style={{ color: '#238636', marginRight: '15px' }}>➜</span> 
                Founder-OSS
            </h1>
            <p style={{ color: '#8b949e', fontSize: '0.9rem', marginTop: '10px', marginLeft: '35px' }}>
                // Systems Engineering • Automation • Open Source
            </p>
        </div>

        {/* Section 1: Bio */}
        <div style={{ marginBottom: '30px' }}>
          <div>
            <span style={{color: '#238636', fontWeight: 'bold', marginRight: '10px'}}>➜</span>
            <span style={{color: '#58a6ff', fontWeight: 'bold'}}>~</span>
            <span style={{color: '#fff', marginLeft: '10px'}}>whoami</span>
          </div>
          <div style={{ marginLeft: '25px', marginTop: '10px', lineHeight: '1.6', color: '#e6edf3' }}>
            <p>Web Developer & Aspiring Software Engineer.<br />
            Focusing on Open Source AI, Dev Tools, and CLI workflows.<br />
            Currently learning: Next.js, CI/CD Pipelines, Systems Engineering.</p>
          </div>
        </div>

        {/* Section 2: Projects */}
        <div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{color: '#238636', fontWeight: 'bold', marginRight: '10px'}}>➜</span>
            <span style={{color: '#58a6ff', fontWeight: 'bold'}}>~</span>
            <span style={{color: '#fff', marginLeft: '10px'}}>curl api.github.com/users/{username}/repos</span>
          </div>
          
          <div style={{ marginLeft: '10px', borderLeft: '2px solid #30363d', paddingLeft: '15px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {loading ? (
                <li style={{color: '#8b949e'}}>Scanning GitHub for public repositories...</li>
              ) : (
                repos.map((repo) => (
                  <li key={repo.id} style={{ marginBottom: '25px' }}>
                    
                    {/* GRID LAYOUT: Forces 3 distinct columns. Cannot stack. */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'auto auto 1fr', 
                        gap: '15px', 
                        alignItems: 'baseline',
                        marginBottom: '5px'
                    }}>
                        {/* Column 1: Name */}
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#58a6ff', fontWeight: 'bold', textDecoration: 'none' }}>
                            ./{repo.name}
                        </a>
                        
                        {/* Column 2: Language (If exists) */}
                        {repo.language ? (
                            <span style={{ color: '#8b949e', fontSize: '0.85rem', border: '1px solid #30363d', padding: '0 8px', borderRadius: '12px' }}>
                                {repo.language}
                            </span>
                        ) : <span></span>}
                        
                        {/* Column 3: Date (Pushed to the right) */}
                        <span style={{ fontSize: '0.8rem', color: '#484f58', textAlign: 'right' }}>
                            {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                    </div>

                    <div style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: '1.4', maxWidth: '90%' }}>
                        {repo.description || 'No description provided.'}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Section 3: Contact */}
        <div style={{ marginTop: '30px' }}>
          <div>
            <span style={{color: '#238636', fontWeight: 'bold', marginRight: '10px'}}>➜</span>
            <span style={{color: '#58a6ff', fontWeight: 'bold'}}>~</span>
            <span style={{color: '#fff', marginLeft: '10px'}}>cat contact.txt</span>
          </div>
          <div style={{ marginLeft: '25px', marginTop: '10px', color: '#e6edf3' }}>
            GitHub: <a href={`https://github.com/${username}`} style={{color: '#e6edf3', textDecoration: 'underline'}}>@{username}</a><br />
            Email: <a href="mailto:mgtrahan@student.fullsail.edu" style={{color: '#e6edf3', textDecoration: 'underline'}}>mgtrahan@student.fullsail.edu</a>
          </div>
        </div>

        {/* Cursor */}
        <div style={{ marginTop: '20px' }}>
          <span style={{color: '#238636', fontWeight: 'bold', marginRight: '10px'}}>➜</span>
          <span style={{color: '#58a6ff', fontWeight: 'bold'}}>~</span>
          <span style={{ display: 'inline-block', width: '10px', height: '1.2em', backgroundColor: '#238636', verticalAlign: 'middle' }}></span>
        </div>

      </div>
      
      {/* Status Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30px',
        backgroundColor: '#161b22',
        borderTop: '1px solid #30363d',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.75rem',
        fontFamily: 'sans-serif',
        zIndex: 100
      }}>
        <div style={{ backgroundColor: '#58a6ff', color: '#0d1117', padding: '0 15px', height: '100%', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>NORMAL</div>
        <div style={{ backgroundColor: '#238636', color: '#fff', padding: '0 15px', height: '100%', display: 'flex', alignItems: 'center' }}>main</div>
        <div style={{ padding: '0 15px', color: '#8b949e' }}>founder-oss/portfolio</div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ padding: '0 15px', color: '#8b949e' }}>utf-8</div>
      </div>
    </div>
  );
}
