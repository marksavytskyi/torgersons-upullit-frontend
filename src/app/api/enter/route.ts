import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.SITE_PASSWORD ?? 'upullit2024';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('site_access', PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}
