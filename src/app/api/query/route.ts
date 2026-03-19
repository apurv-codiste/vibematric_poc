import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('sb_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { projectRef, query } = await request.json();

  if (!projectRef || !query) {
    return NextResponse.json({ error: 'Missing projectRef or query' }, { status: 400 });
  }

  // Security Guardrail: Read-Only Enforcement
  const destructiveCommands = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'ALTER', 'TRUNCATE', 'CREATE', 'GRANT', 'REVOKE'];
  const upperQuery = query.toUpperCase();
  
  const isDestructive = destructiveCommands.some(cmd => 
    upperQuery.includes(cmd) && 
    (upperQuery.indexOf(cmd) === 0 || /\s/.test(upperQuery[upperQuery.indexOf(cmd) - 1]))
  );

  if (isDestructive) {
    return NextResponse.json({ 
      error: 'Query blocked for security reasons. This POC only allows SELECT queries.' 
    }, { status: 403 });
  }

  try {
    const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('SQL execution error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
