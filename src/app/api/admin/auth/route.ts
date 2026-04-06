import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
