import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { code } = await request.json();
  const validCode = process.env.PREMIUM_ACCESS_CODE;

  if (!validCode) {
    return new Response(JSON.stringify({ error: 'Premium access not configured' }), { status: 500 });
  }

  if (code === validCode) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ ok: false }), { status: 401 });
}
