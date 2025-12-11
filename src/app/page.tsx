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
    <div className="terminal-window" style={{ position: 'relative', paddingBottom: '30px' }}>
      <div className="terminal-header">
        <div className="dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="title">guest@portfolio: ~/projects</div>
      </div>

      <div className="terminal-body">
        
        {/* NEW HEADER: Matches the image above. Simple and unbreakable. */}
        <div style={{ marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px dashed #333' }}>
            <h1 style={{ fontSize: '1.8rem', color: '#58a6ff', margin: 0, fontFamily: 'monospace' }}>
                <span style={{ color: '#4af626', marginRight: '15px' }}>➜</span> 
                Founder-OSS
            </h1>
            <p style={{ color: '#8b949e', fontSize: '0.9rem', marginTop: '8px', marginLeft: '35px' }}>
                // Systems Engineering • Automation • Open Source
            </p>
        </div>

        {/* Section 1: Bio */}
        <div>
          <span className="prompt">➜</span>
          <span className="path">~</span>
          <span className="command">whoami</span>
        </div>
        <div className="output">
          <p>Web Developer & Aspiring Software Engineer.<br />
          Focusing on Open Source AI, Dev Tools, and CLI workflows.<br />
          Currently learning: Next.js, CI/CD Pipelines, Systems Engineering.</p>
        </div>

        {/* Section 2: Projects */}
        <div>
          <span className="prompt">➜</span>
          <span className="path">~</span>
          <span className="command">curl api.github.com/users/{username}/repos</span>
        </div>
        <div className="output">
          <ul className="project-list">
            {loading ? (
              <li className="project-entry">Scanning GitHub for public repositories...</li>
            ) : (
              repos.map((repo) => (
                <li key={repo.id} className="project-entry">
                  <span className="project-name">./{repo.name}</span>
                  
                  {/* FIXED: Added marginRight to stop the squishing */}
                  {repo.language && <span className="tech-tag" style={{ marginRight: '12px' }}>{repo.language}</span>}
                  
                  <span className="tech-tag" style={{ background: 'none', color: '#666', paddingLeft: 0 }}>
                    [Last commit: {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}]
                  </span>
                  <div style={{ color: '#8b949e', marginTop: '4px' }}>{repo.description || 'No description provided.'}</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>[View Code]</a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer">[Live Demo]</a>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <span className="prompt">➜</span>
          <span className="path">~</span>
          <span className="command">cat contact.txt</span>
        </div>
        <div className="output">
          GitHub: <a href={`https://github.com/${username}`}>@{username}</a><br />
          Email: <a href="mailto:mgtrahan@student.fullsail.edu">mgtrahan@student.fullsail.edu</a>
        </div>

        {/* Cursor */}
        <div>
          <span className="prompt">➜</span>
          <span className="path">~</span>
          <span className="command"><span className="cursor"></span></span>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '25px',
        backgroundColor: '#30363d',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8rem',
        borderTop: '1px solid #333'
      }}>
        <div style={{ backgroundColor: '#58a6ff', color: '#000', padding: '0 10px', height: '100%', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>NORMAL</div>
        <div style={{ backgroundColor: '#3fb950', color: '#000', padding: '0 10px', height: '100%', display: 'flex', alignItems: 'center' }}>main</div>
        <div style={{ padding: '0 10px', color: '#8b949e' }}>next.js backend connected</div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ padding: '0 10px', color: '#8b949e' }}>utf-8</div>
        <div style={{ backgroundColor: '#30363d', color: '#ccc', padding: '0 10px', height: '100%', display: 'flex', alignItems: 'center' }}>100%</div>
      </div>
    </div>
  );
}
