import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('sb_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized: No Supabase token found.' }, { status: 401 });
  }

  const { projectRef, apiKey, apiProvider } = await request.json();

  if (!projectRef || !apiKey) {
    return NextResponse.json({ error: 'Missing projectRef or apiKey' }, { status: 400 });
  }

  try {
    const response = await fetch('http://localhost:8000/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_ref: projectRef,
        supabase_access_token: accessToken,
        api_key: apiKey,
        api_provider: apiProvider || 'gemini'
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Agent setup proxy error:', error);
    return NextResponse.json({ error: 'Failed to connect to Python Backend' }, { status: 500 });
  }
}
