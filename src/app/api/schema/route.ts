import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('sb_access_token')?.value;
  const projectRef = request.nextUrl.searchParams.get('projectRef');

  if (!accessToken || !projectRef) {
    return NextResponse.json({ error: 'Unauthorized or Missing projectRef' }, { status: 401 });
  }

  try {
    const query = `
      SELECT 
        table_name, 
        column_name, 
        data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      ORDER BY table_name, ordinal_position;
    `;

    const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`Supabase API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch schema error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
