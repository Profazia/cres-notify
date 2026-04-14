import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request) {
  const { subscription, year } = await request.json();
  
  const key = `sub:${Date.now()}:${year}`;
  await kv.set(key, { subscription, year, createdAt: new Date().toISOString() });
  
  return NextResponse.json({ success: true });
}
