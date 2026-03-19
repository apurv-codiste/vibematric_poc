'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Database, Play, AlertCircle, CheckCircle2, Loader2, 
  ChevronRight, Search, Send, Rocket, LogOut, 
  Settings, Layers, Table, Terminal, ExternalLink, 
  Box, X, User, ChevronDown, Bell, HelpCircle, 
  MessageSquare, MoreVertical, LayoutGrid, List, Plus, 
  Home, Users, HardDrive, Zap, Shield, HelpCircle as SupportIcon,
  Code, Command, Globe, Clock, GitBranch, Key, Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  ref: string;
  organization_id: string;
  region: string;
  created_at: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SchemaColumn {
  table_name: string;
  column_name: string;
  data_type: string;
}

// --- SUB-COMPONENTS ---

const Sidebar = ({ activeTab, onTabChange, isInsideProject }: any) => (
  <aside style={{ width: '50px', background: '#1c1c1c', borderRight: '1px solid #2e2e2e', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: '8px', zIndex: 100 }}>
    <div onClick={() => onTabChange('projects')} style={{ color: 'var(--primary)', marginBottom: '12px', cursor: 'pointer' }}>
      <Database size={24} />
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#a0a0a0', width: '100%' }}>
      <SidebarItem icon={<Home size={18} />} active={activeTab === 'home'} onClick={() => isInsideProject && onTabChange('home')} disabled={!isInsideProject} title="Home" />
      <SidebarItem icon={<Users size={18} />} active={activeTab === 'auth'} onClick={() => isInsideProject && onTabChange('auth')} disabled={!isInsideProject} title="Authentication" />
      <SidebarItem icon={<Database size={18} />} active={activeTab === 'database'} onClick={() => isInsideProject && onTabChange('database')} disabled={!isInsideProject} title="Database" />
      <SidebarItem icon={<HardDrive size={18} />} active={activeTab === 'storage'} onClick={() => isInsideProject && onTabChange('storage')} disabled={!isInsideProject} title="Storage" />
      <SidebarItem icon={<Zap size={18} />} active={activeTab === 'functions'} onClick={() => isInsideProject && onTabChange('functions')} disabled={!isInsideProject} title="Edge Functions" />
      <SidebarItem icon={<Terminal size={18} />} active={activeTab === 'editor'} onClick={() => isInsideProject && onTabChange('editor')} disabled={!isInsideProject} title="SQL Editor" />
    </div>

    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', color: '#a0a0a0', width: '100%' }}>
      <SidebarItem icon={<Settings size={18} />} active={activeTab === 'settings'} onClick={() => isInsideProject && onTabChange('settings')} disabled={!isInsideProject} title="Settings" />
      <SidebarItem icon={<SupportIcon size={18} />} active={false} onClick={() => {}} title="Support" />
    </div>
  </aside>
);

const SidebarItem = ({ icon, active, onClick, disabled, title }: any) => (
  <div 
    onClick={onClick}
    title={title}
    style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '10px 0', 
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.3 : 1,
      color: active ? 'white' : '#a0a0a0',
      background: active ? '#2a2a2a' : 'transparent',
      borderRight: active ? '2px solid var(--primary)' : 'none',
      transition: 'all 0.2s'
    }}
    className={!disabled ? "hover-white-bg" : ""}
  >
    {icon}
  </div>
);

const TopNav = ({ projects, selectedProject, onLogout }: any) => {
  const [showProfile, setShowProfile] = useState(false);
  const currentProject = projects.find((p: any) => p.id === selectedProject);

  return (
    <nav style={{ height: '50px', borderBottom: '1px solid #2e2e2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: '#1c1c1c', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ededed' }}>
           <div style={{ background: '#2e2e2e', borderRadius: '4px', padding: '4px' }}><Database size={16} /></div>
           <span style={{ fontSize: '13px', fontWeight: 500 }}>VibeMatric Org</span>
           <div style={{ background: '#282828', border: '1px solid #3e3e3e', borderRadius: '2px', padding: '1px 6px', fontSize: '10px', color: '#a0a0a0' }}>FREE</div>
           <ChevronDown size={14} style={{ opacity: 0.5 }} />
        </div>
        
        {currentProject && (
          <>
            <span style={{ color: '#444' }}>/</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ededed' }}>
               <div style={{ background: '#2e2e2e', borderRadius: '4px', padding: '4px' }}><Database size={14} /></div>
               <span style={{ fontSize: '13px', fontWeight: 500 }}>{currentProject.name}</span>
               <ChevronDown size={14} style={{ opacity: 0.5 }} />
            </div>
          </>
        )}
      </div>

      <div style={{ position: 'relative', width: '380px', display: 'flex', alignItems: 'center' }}>
         <Search size={13} style={{ position: 'absolute', left: '12px', color: '#555' }} />
         <input type="text" placeholder="Search..." style={{ width: '100%', background: '#171717', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '6px 40px 6px 34px', fontSize: '12px', outline: 'none', color: 'white' }} />
         <div style={{ position: 'absolute', right: '12px', background: '#2e2e2e', borderRadius: '2px', padding: '2px 6px', fontSize: '10px', color: '#a0a0a0', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Command size={10} /> K
         </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#a0a0a0' }}>
        <span style={{ fontSize: '12px', cursor: 'pointer' }} className="hover-white">Feedback</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
           <HelpCircle size={18} className="hover-white cursor-pointer" />
           <Bell size={18} className="hover-white cursor-pointer" />
           <div onClick={() => setShowProfile(!showProfile)} style={{ position: 'relative' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 700, fontSize: '10px', cursor: 'pointer' }}>A</div>
              {showProfile && (
                <div style={{ position: 'absolute', top: '35px', right: 0, width: '160px', background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '8px', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                   <div style={{ padding: '8px', fontSize: '12px', color: 'white', fontWeight: 600, borderBottom: '1px solid #2e2e2e', marginBottom: '8px' }}>apurv090405</div>
                   <div onClick={onLogout} style={{ padding: '8px', fontSize: '12px', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover-bg-red"><LogOut size={14} /> Log out</div>
                </div>
              )}
           </div>
        </div>
      </div>
    </nav>
  );
};

const ProjectGrid = ({ projects, fetchingProjects, onSelect }: any) => (
  <div className="fade-in" style={{ padding: '0 40px 40px 40px', flex: 1, overflowY: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '24px 0', color: '#ededed' }}>
      <span style={{ fontSize: '20px', fontWeight: 500 }}>Projects</span>
    </div>

    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
       <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
          <input type="text" placeholder="Search for a project" style={{ width: '100%', background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '8px 12px 8px 34px', fontSize: '13px', color: 'white', outline: 'none' }} />
       </div>
       <button style={{ marginLeft: 'auto', background: 'var(--primary)', color: 'black', border: 'none', borderRadius: '4px', padding: '0 16px', height: '32px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> New project
       </button>
    </div>

    {fetchingProjects ? (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--primary)' }} />
      </div>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {projects.map((p: any) => (
          <div key={p.id} onClick={() => onSelect(p.id)} className="supabase-card" style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '6px', padding: '20px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
               <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{p.name}</h4>
               <MoreVertical size={14} style={{ color: '#555' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '16px' }}>AWS | {p.region}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
               <div style={{ background: '#1c2c26', color: '#3ecf8e', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', border: '1px solid #1c3c2e' }}>ACTIVE</div>
               <div style={{ background: '#2a2a2a', color: '#a0a0a0', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>NANO</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProjectDashboard = ({ projects, selectedProject, onStartChat, schema }: any) => {
  const p = projects.find((p: any) => p.id === selectedProject);

  return (
    <div className="fade-in" style={{ padding: '0 40px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '32px 0 24px', flexShrink: 0 }}>
         <h2 style={{ fontSize: '28px', fontWeight: 500 }}>{p?.name}</h2>
         <div style={{ background: '#2a2a2a', color: '#a0a0a0', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>NANO</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', flex: 1, minHeight: 0, paddingBottom: '40px' }}>
         {/* Left Side: Schema Explorer (Isolated Scroll) */}
         <div style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '6px', padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexShrink: 0 }}>
               <Database size={18} style={{ color: 'var(--primary)' }} />
               <h3 style={{ fontSize: '18px', fontWeight: 500 }}>Database Schema</h3>
            </div>
            
            <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
               {Object.entries(schema).length > 0 ? (
                 Object.entries(schema).map(([tableName, columns]: [string, any]) => (
                    <div key={tableName} style={{ marginBottom: '20px', background: '#171717', padding: '12px', borderRadius: '6px', border: '1px solid #2e2e2e' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '10px', fontWeight: 600, fontSize: '13px' }}>
                          <Table size={14} /> {tableName}
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '22px' }}>
                          {columns.map((col: any) => (
                             <div key={col.column_name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                                <span>{col.column_name}</span>
                                <span style={{ opacity: 0.5, fontSize: '10px' }}>{col.data_type}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))
               ) : (
                 <div style={{ textAlign: 'center', padding: '40px', color: '#444' }}>No tables found in this project.</div>
               )}
            </div>
         </div>

         {/* Right Side: AI Messaging & Info */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '6px', padding: '24px' }}>
               <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                     <div style={{ background: 'rgba(62, 207, 142, 0.1)', color: 'var(--primary)', padding: '8px', borderRadius: '6px' }}><Rocket size={20} /></div>
                     <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>VibeAI is ready</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#a0a0a0', lineHeight: '1.6' }}>
                     Your **VibeAI** is ready to talk with your db. Ask anything about your schema or data.
                  </p>
               </div>
               
               <button 
                  onClick={onStartChat}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '14px', borderRadius: '4px' }}
               >
                  <MessageSquare size={16} /> Start Chatting
               </button>
            </div>

            <div style={{ background: '#1c1c1c', border: '1px solid #2e2e2e', borderRadius: '6px', padding: '24px', opacity: 0.8 }}>
               <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={13} /> PROJECT INFO
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#888', display: 'flex', justifyContent: 'space-between' }}>
                     <span>Region</span>
                     <span style={{ color: '#fff' }}>{p?.region}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', display: 'flex', justifyContent: 'space-between' }}>
                     <span>Plan</span>
                     <span style={{ color: '#fff' }}>Free</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2e2e2e', paddingTop: '12px' }}>
                     <span>ID</span>
                     <span style={{ color: '#666' }}>{p?.id}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const SQLAgentView = ({ 
  selectedProject, projects, schema, fetchingSchema, sessionId, 
  messages, chatLoading, chatInput, setChatInput, handleSendMessage, setShowSettings 
}: any) => {
  const currentProject = projects.find((p: any) => p.id === selectedProject);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', height: '100%', overflow: 'hidden' }}>
      <aside style={{ borderRight: '1px solid #2e2e2e', background: '#1c1c1c', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2e2e2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>SQL Editor</h3>
          <X size={14} style={{ color: '#555' }} />
        </div>

        <div style={{ padding: '12px' }}>
           <div style={{ position: 'relative' }}>
              <Search size={12} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
              <input type="text" placeholder="Search queries..." style={{ width: '100%', background: '#171717', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '6px 12px 6px 30px', fontSize: '12px', color: 'white', outline: 'none' }} />
           </div>
        </div>

        <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
           <SidebarSection title="SHARED" items={[]} />
           <SidebarSection title="FAVORITES" items={[]} />
           <SidebarSection title="PRIVATE (1)" items={[ { icon: <div style={{ fontSize: '10px', border: '1px solid #555', padding: '1px 3px', borderRadius: '2px', marginRight: '8px' }}>SQL</div>, label: 'Table Explorer' } ]} active />
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #2e2e2e', background: '#1c1c1c', flexShrink: 0 }}>
          <button onClick={() => setShowSettings(true)} className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '4px', justifyContent: 'center' }}>
            <Settings size={14} /> Configure Agent
          </button>
        </div>
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column', background: '#171717', position: 'relative', minHeight: 0 }}>
        <div style={{ height: '36px', background: '#1c1c1c', borderBottom: '1px solid #2e2e2e', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '8px' }}>
           <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: '#171717', padding: '2px 10px', height: '100%', borderTop: '2px solid var(--primary)' }}>
              <div style={{ fontSize: '9px', border: '1px solid #555', padding: '0px 3px', borderRadius: '2px' }}>SQL</div> Table Explorer <X size={10} style={{ opacity: 0.5 }} />
           </div>
           <Plus size={14} style={{ opacity: 0.5, marginLeft: '8px' }} />
        </div>

        <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px', minHeight: 0 }}>
           <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
                   <Rocket size={40} style={{ margin: '0 auto 16px', color: 'var(--primary)' }} />
                   <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 600 }}>AI Data Agent</h3>
                   <p style={{ maxWidth: '450px', margin: '0 auto', fontSize: '14px' }}>Describe your data needs in natural language. The agent will analyze your schema and provide answers.</p>
                </div>
              )}
              {messages.map((m: any, i: number) => (
                <div key={i} style={{ 
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%', padding: '16px', borderRadius: '8px',
                  background: m.role === 'user' ? 'var(--primary)' : '#2e2e2e',
                  color: m.role === 'user' ? 'black' : 'white',
                  border: '1px solid #2e2e2e',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontWeight: 600, fontSize: '11px', marginBottom: '6px', opacity: 0.6 }}>{m.role === 'user' ? 'You' : 'VibeMatric AI'}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{m.content}</div>
                </div>
              ))}
              {chatLoading && <div style={{ color: '#a0a0a0', fontSize: '13px' }}><Loader2 className="animate-spin" size={14} /> Intelligence working...</div>}
           </div>
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid #2e2e2e', background: '#1c1c1c' }}>
           <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
              <input 
                type="text"
                placeholder={sessionId ? "What would you like to know about your database?" : "Configure your API key to start... "}
                disabled={!sessionId || chatLoading}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ width: '100%', padding: '12px 48px 12px 16px', borderRadius: '6px', background: '#1c1c1c', border: '1px solid #2e2e2e', color: 'white', outline: 'none', fontSize: '14px' }}
              />
              <button onClick={handleSendMessage} disabled={!sessionId || chatLoading || !chatInput} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '6px', borderRadius: '4px', background: 'var(--primary)', color: 'black', border: 'none', cursor: 'pointer', opacity: (!sessionId || chatLoading || !chatInput) ? 0.3 : 1 }}>
                <Send size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ title, items, active }: any) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ fontSize: '10px', fontWeight: 800, color: '#555', padding: '0 20px 8px', letterSpacing: '0.5px' }}>{title}</div>
    {items.map((item: any, i: number) => (
      <div key={i} style={{ padding: '6px 20px', fontSize: '13px', color: active ? 'white' : '#777', background: active ? '#2e2e2e' : 'transparent', display: 'flex', alignItems: 'center' }} className="hover-white-bg">
        {item.icon} {item.label}
      </div>
    ))}
  </div>
);

const SettingsModal = ({ 
  setShowSettings, apiProvider, setApiProvider, apiKey, setApiKey, handleStartAgent, loading 
}: any) => (
  <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
     <div style={{ background: '#1c1c1c', width: '100%', maxWidth: '420px', padding: '32px', position: 'relative', border: '1px solid #2e2e2e', borderRadius: '6px' }}>
        <button onClick={() => setShowSettings(false)} style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}><X size={18} /></button>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
           <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(62, 207, 142, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 16px' }}><Rocket size={28} /></div>
           <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Agent Settings</h2>
           <p style={{ color: '#a0a0a0', fontSize: '14px' }}>Initialize AI for this project</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#a0a0a0', marginBottom: '8px' }}>AI Provider</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                 <button onClick={() => setApiProvider('gemini')} style={{ padding: '10px', borderRadius: '4px', background: apiProvider === 'gemini' ? 'rgba(62, 207, 142, 0.1)' : '#1c1c1c', border: '1px solid', borderColor: apiProvider === 'gemini' ? 'var(--primary)' : '#2e2e2e', color: apiProvider === 'gemini' ? 'var(--primary)' : 'white' }}>Gemini</button>
                 <button onClick={() => setApiProvider('openai')} style={{ padding: '10px', borderRadius: '4px', background: apiProvider === 'openai' ? 'rgba(62, 207, 142, 0.1)' : '#1c1c1c', border: '1px solid', borderColor: apiProvider === 'openai' ? 'var(--primary)' : '#2e2e2e', color: apiProvider === 'openai' ? 'var(--primary)' : 'white' }}>OpenAI</button>
              </div>
           </div>
           <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#a0a0a0', marginBottom: '8px' }}>API Key</label>
              <input type="password" placeholder="Enter API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', background: '#1c1c1c', border: '1px solid #2e2e2e', color: 'white', outline: 'none' }} />
           </div>
           <button onClick={handleStartAgent} disabled={loading} className="btn-primary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Save & Start'}
           </button>
        </div>
     </div>
  </div>
);

// --- MAIN DASHBOARD ---

export default function Dashboard() {
  const router = useRouter();
  const [view, setView] = useState<'projects' | 'home' | 'editor' | 'auth' | 'database' | 'storage' | 'functions' | 'settings'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [schema, setSchema] = useState<Record<string, SchemaColumn[]>>({});
  const [fetchingProjects, setFetchingProjects] = useState<boolean>(true);
  const [fetchingSchema, setFetchingSchema] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [apiKey, setApiKey] = useState<string>('');
  const [apiProvider, setApiProvider] = useState<'gemini' | 'openai'>('gemini');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setFetchingProjects(true);
    try {
      const res = await fetch('/api/projects');
      if (res.status === 401) {
        router.push('/');
        return;
      }
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) { setError('Failed to fetch projects'); }
    finally { setFetchingProjects(false); }
  };

  const handleProjectSelect = (id: string) => {
    setSelectedProject(id);
    setView('home');
    fetchSchema(id);
  };

  const fetchSchema = async (ref: string) => {
    setFetchingSchema(true);
    try {
      const res = await fetch(`/api/schema?projectRef=${ref}`);
      const data = await res.json();
      const grouped: Record<string, SchemaColumn[]> = {};
      data.forEach((col: any) => {
        if (!grouped[col.table_name]) grouped[col.table_name] = [];
        grouped[col.table_name].push(col);
      });
      setSchema(grouped);
    } catch (err) { console.error(err); }
    finally { setFetchingSchema(false); }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
  };

  const handleSendMessage = async () => {
    if (!chatInput || !sessionId) return;
    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/agent/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, query: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) { setError('Response failed'); }
    finally { setChatLoading(true); setChatLoading(false); }
  };

  const handleStartAgent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agent/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectRef: selectedProject, apiKey, apiProvider }),
      });
      const data = await res.json();
      setSessionId(data.session_id);
      setShowSettings(false);
      setMessages([{ role: 'assistant', content: 'Agent ready. How can I help with your data?' }]);
    } catch (err) { setError('Setup failed'); }
    finally { setLoading(false); }
  };

  return (
    <main style={{ height: '100vh', display: 'flex', background: '#1c1c1c', color: '#ededed', overflow: 'hidden' }}>
      <Sidebar 
        activeTab={view} 
        onTabChange={setView} 
        isInsideProject={!!selectedProject} 
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopNav 
          projects={projects} 
          selectedProject={selectedProject} 
          onLogout={handleLogout} 
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {view === 'projects' && (
            <div className="fade-in" style={{ flex: 1, overflowY: 'auto' }}>
               <ProjectGrid projects={projects} fetchingProjects={fetchingProjects} onSelect={handleProjectSelect} />
            </div>
          )}
          {view === 'home' && (
            <ProjectDashboard 
              projects={projects} 
              selectedProject={selectedProject} 
              onStartChat={() => setView('editor')}
              schema={schema}
            />
          )}
          {view === 'editor' && (
            <SQLAgentView 
              selectedProject={selectedProject} projects={projects}
              schema={schema} fetchingSchema={fetchingSchema}
              sessionId={sessionId} messages={messages}
              chatLoading={chatLoading} chatInput={chatInput}
              setChatInput={setChatInput} handleSendMessage={handleSendMessage}
              setShowSettings={setShowSettings}
            />
          )}
          {view === 'database' && (
            <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', height: '100%', overflow: 'hidden' }}>
               <aside style={{ borderRight: '1px solid #2e2e2e', background: '#1c1c1c', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #2e2e2e', color: 'white', fontSize: '13px', fontWeight: 600 }}>Schema Explorer</div>
                  <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                     {Object.entries(schema).map(([tableName, columns]: [string, any]) => (
                       <div key={tableName} style={{ marginBottom: '16px' }}>
                          <div style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                             <Table size={13} /> {tableName}
                          </div>
                          <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                             {columns.map((col: any) => (
                               <div key={col.column_name} style={{ fontSize: '12px', color: '#a0a0a0', display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{col.column_name}</span>
                                  <span style={{ fontSize: '10px', opacity: 0.5 }}>{col.data_type}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
               </aside>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                  <div style={{ textAlign: 'center' }}>
                     <Database size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                     <div style={{ fontSize: '18px', color: '#ededed', marginBottom: '8px' }}>Table Editor</div>
                     <p style={{ fontSize: '14px' }}>Select a table on the left to view data.</p>
                  </div>
               </div>
            </div>
          )}
          {['auth', 'storage', 'functions', 'settings'].includes(view) && (
            <div style={{ padding: '60px', textAlign: 'center', opacity: 0.3 }}>
               <div style={{ fontSize: '24px', marginBottom: '16px' }}>{view.toUpperCase()} Section</div>
               <p>This section is currently under development to match the Supabase spec.</p>
            </div>
          )}
        </div>
      </div>

      {showSettings && <SettingsModal 
        setShowSettings={setShowSettings} apiProvider={apiProvider} setApiProvider={setApiProvider}
        apiKey={apiKey} setApiKey={setApiKey} handleStartAgent={handleStartAgent} loading={loading}
      />}

      <style jsx>{`
        .cursor-pointer { cursor: pointer; }
        .hover-white:hover { color: white !important; }
        .hover-white-bg:hover { background: #2a2a2a !important; color: white !important; }
        .hover-bg-red:hover { background: rgba(255, 68, 68, 0.1) !important; }
        .supabase-card:hover { border-color: #3ecf8e !important; }
      `}</style>
    </main>
  );
}
