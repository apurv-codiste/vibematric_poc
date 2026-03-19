import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('sb_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Diagnostic: Try to list organizations first
    const orgResponse = await fetch('https://api.supabase.com/v1/organizations', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const orgs = await orgResponse.json();
    console.log('Orgs diagnostic:', orgResponse.status, orgs);

    const response = await fetch('https://api.supabase.com/v1/projects', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Supabase API error (${response.status}):`, errBody);
      return NextResponse.json({ 
        error: `Supabase API error: ${response.status}`, 
        details: errBody,
        orgsDiagnostic: orgs 
      }, { status: response.status });
    }

    const projects = await response.json();
    console.log('Fetched projects:', projects);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
