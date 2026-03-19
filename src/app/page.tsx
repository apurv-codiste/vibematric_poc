'use client';

import Link from 'next/link';
import { 
  Database, Zap, Shield, MessageSquare, ArrowRight, 
  Check, Github, Twitter, Globe, Menu, X, Rocket, 
  Terminal, Layers, Code
} from 'lucide-react';
import { useState } from 'react';
import ConnectButton from '@/components/ConnectButton';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ background: '#09090b', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* --- NAVBAR --- */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(9, 9, 11, 0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        height: '70px', display: 'flex', alignItems: 'center'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Database size={22} color="black" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>VIBEMATRIC</span>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {['Product', 'Solutions', 'Pricing', 'Docs'].map(item => (
              <a key={item} href="#" style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="hover-white">
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="desktop-only">
               <ConnectButton />
            </div>
            <button 
              className="mobile-only" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{ 
          position: 'fixed', inset: 0, top: '70px', zIndex: 999, 
          background: '#09090b', padding: '2rem', display: 'flex', 
          flexDirection: 'column', gap: '1.5rem' 
        }}>
          {['Product', 'Solutions', 'Pricing', 'Docs'].map(item => (
            <a key={item} href="#" style={{ fontSize: '1.25rem', fontWeight: 500 }}>{item}</a>
          ))}
          <ConnectButton />
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section style={{ 
        paddingTop: '160px', paddingBottom: '100px', 
        background: 'radial-gradient(circle at 50% -20%, rgba(62, 207, 142, 0.15) 0%, transparent 50%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '100px', background: 'rgba(62, 207, 142, 0.1)', border: '1px solid rgba(62, 207, 142, 0.2)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem' }}>
            <Zap size={14} fill="currentColor" />
            <span>Now with Gemini & OpenAI Support</span>
          </div>
          
          <h1 className="animate-fade-in delay-1" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Chat with your <br />
            <span style={{ background: 'linear-gradient(to right, #fff, #3ecf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Supabase Database
            </span>
          </h1>
          
          <p className="animate-fade-in delay-2" style={{ color: 'var(--muted-foreground)', fontSize: 'clamp(1rem, 4vw, 1.25rem)', maxWidth: '650px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            VibeMatric is the intelligent SQL agent that understands your schema instantly. Ask questions in plain English and get data insights in seconds.
          </p>
          
          <div className="animate-fade-in delay-3" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
             <ConnectButton />
             <button className="glass-hover" style={{ padding: '0.875rem 2rem', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <Github size={18} /> Star on GitHub
             </button>
          </div>

          {/* Visual Mockup */}
          <div className="animate-fade-in delay-3" style={{ marginTop: '5rem', position: 'relative' }}>
             <div style={{ 
               position: 'absolute', inset: 0, 
               background: 'linear-gradient(to top, #09090b, transparent)', 
               zIndex: 2, pointerEvents: 'none' 
             }}></div>
             <div className="glass" style={{ 
               maxWidth: '1000px', margin: '0 auto', height: '500px', 
               border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
               boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
               background: '#0a0a0b'
             }}>
                {/* Simulated UI Header */}
                <div style={{ height: '40px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '0.5rem' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
                   <div style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>VIBEMATRIC-DASHBOARD.EXE</div>
                </div>
                <div style={{ padding: '2rem', textAlign: 'left', display: 'flex', gap: '2rem' }}>
                   <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[1,2,3,4].map(i => <div key={i} style={{ height: '12px', width: (Math.random() * 50 + 50) + '%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>)}
                   </div>
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ alignSelf: 'flex-start', padding: '1rem', background: 'rgba(62, 207, 142, 0.1)', borderRadius: '12px', border: '1px solid rgba(62, 207, 142, 0.2)', maxWidth: '80%' }}>
                         <div style={{ height: '10px', width: '200px', background: 'var(--primary)', borderRadius: '4px', marginBottom: '0.5rem', opacity: 0.5 }}></div>
                         <div style={{ height: '10px', width: '150px', background: 'var(--primary)', borderRadius: '4px', opacity: 0.5 }}></div>
                      </div>
                      <div style={{ alignSelf: 'flex-end', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', maxWidth: '80%' }}>
                         <div style={{ height: '10px', width: '150px', background: 'white', borderRadius: '4px', opacity: 0.2 }}></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
Section Header
      </section>

      {/* --- FEATURES SECTION --- */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Build faster with SQL AI</h2>
             <p style={{ color: 'var(--muted-foreground)', fontSize: '1.125rem' }}>Engineered specifically for the Supabase ecosystem.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
             {[
               { icon: <Globe size={24} />, title: 'One-Click Connect', desc: 'Securely link your entire Supabase organization via OAuth. No database credentials needed.' },
               { icon: <MessageSquare size={24} />, title: 'Natural Language SQL', desc: 'Ask complex questions and get optimized SQL queries instantly. No more hunting for column names.' },
               { icon: <Shield size={24} />, title: 'Read-Only by Design', desc: 'Our agent is strictly read-only. Your data is protected against destructive commands by architectural design.' },
               { icon: <Layers size={24} />, title: 'Schema Intelligence', desc: 'Instant indexing of tables, views, and columns. The agent learns your data structure in milliseconds.' },
               { icon: <Terminal size={24} />, title: 'Real-time Execution', desc: 'Run generated queries directly from the chat and see instant results in a clean table view.' },
               { icon: <Code size={24} />, title: 'Developer Friendly', desc: 'Built by developers for developers. Clean code, open architecture, and high performance.' },
             ].map((f, i) => (
               <div key={i} className="glass card-hover" style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', background: 'rgba(62, 207, 142, 0.1)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex' }}>
                     {f.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{f.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Simple, predictable pricing</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1.125rem' }}>Start for free, scale as your database grows.</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
              {/* Free Tier */}
              <div className="glass" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>Community</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0' }}>$0 <span style={{ fontSize: '1rem', color: 'var(--muted-foreground)', fontWeight: 400 }}>/ month</span></div>
                    <p style={{ color: 'var(--muted-foreground)' }}>Perfect for side projects and learning.</p>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {['1 Project', '100 Queries / mo', 'Schema Explorer', 'Community Support'].map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                         <Check size={16} style={{ color: 'var(--primary)' }} /> {t}
                      </div>
                    ))}
                 </div>
                 <button className="glass-hover" style={{ marginTop: 'auto', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, cursor: 'pointer', background: 'rgba(255,255,255,0.03)' }}>Get Started</button>
              </div>

              {/* Pro Tier */}
              <div className="glass" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem', border: '1px solid var(--primary)', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--primary)', color: 'black', padding: '0.25rem 1rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>MOST POPULAR</div>
                 <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>Pro</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0' }}>$29 <span style={{ fontSize: '1rem', color: 'var(--muted-foreground)', fontWeight: 400 }}>/ month</span></div>
                    <p style={{ color: 'var(--muted-foreground)' }}>For professional developers and startups.</p>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {['Unlimited Projects', '10,000 Queries / mo', 'Priority Agent Speed', 'Advanced Insights', 'Direct Email Support'].map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                         <Check size={16} style={{ color: 'var(--primary)' }} /> {t}
                      </div>
                    ))}
                 </div>
                 <ConnectButton />
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
         <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
               <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Database size={24} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>VIBEMATRIC</span>
                  </div>
                  <p style={{ color: 'var(--muted-foreground)', maxWidth: '300px', lineHeight: 1.6 }}>
                    The intelligent SQL interface for Supabase. Built for speed, security, and simplicity.
                  </p>
               </div>
               <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Product</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                     <a href="#">Database Connect</a>
                     <a href="#">SQL Agent</a>
                     <a href="#">Pricing</a>
                  </div>
               </div>
               <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Company</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                     <a href="#">About</a>
                     <a href="#">Careers</a>
                     <a href="#">Privacy</a>
                  </div>
               </div>
               <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Connect</h4>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted-foreground)' }}>
                     <Twitter size={20} />
                     <Github size={20} />
                     <Globe size={20} />
                  </div>
               </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
               © 2026 VibeMatric. Not affiliated with Supabase Inc.
            </div>
         </div>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .hover-white:hover {
          color: white !important;
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}
