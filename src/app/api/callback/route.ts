import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const clientId = process.env.SUPABASE_CLIENT_ID;
  const clientSecret = process.env.SUPABASE_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/callback';

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'OAuth credentials not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.supabase.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokens = await response.json();

    if (tokens.error) {
      return NextResponse.json({ error: tokens.error_description || tokens.error }, { status: 400 });
    }

    // In a real app, you would save these tokens to a secure database/session
    // For this POC, we'll pass them to the dashboard via a (hacky) cookie or URL param
    // WARNING: Do NOT do this in production.
    const responseRedirect = NextResponse.redirect(new URL('/dashboard', request.url));
    responseRedirect.cookies.set('sb_access_token', tokens.access_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expires_in
    });
    
    return responseRedirect;
  } catch (error) {
    console.error('OAuth exchange error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
