import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(request) {
  const { subscription, year } = await request.json();
  await redis.set(`sub:${Date.now()}:${year}`, { subscription, year });
  return NextResponse.json({ success: true });
}
