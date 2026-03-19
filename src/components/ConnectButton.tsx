'use client';

import { Database } from 'lucide-react';

export default function ConnectButton() {
  const handleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/callback';
    
    if (!clientId) {
      alert('Please set NEXT_PUBLIC_SUPABASE_CLIENT_ID in your environment variables.');
      return;
    }

    // Redirects the founder to Supabase to grant access
    window.location.href = `https://api.supabase.com/v1/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=all+offline_access+infrastructure.read+organizations.read`;
  };

  return (
    <button onClick={handleConnect} className="btn-primary animate-fade-in delay-2">
      <Database size={20} />
      One-Click Connect Supabase
    </button>
  );
}
