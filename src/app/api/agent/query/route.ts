import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { sessionId, query } = await request.json();

  if (!sessionId || !query) {
    return NextResponse.json({ error: 'Missing sessionId or query' }, { status: 400 });
  }

  try {
    const response = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        query: query
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Agent query proxy error:', error);
    return NextResponse.json({ error: 'Failed to connect to Python Backend' }, { status: 500 });
  }
}
