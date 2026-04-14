import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { subscription, year } = await request.json();
  
  const dataPath = path.join(process.cwd(), 'subscriptions.json');
  let subscriptions = [];
  
  if (fs.existsSync(dataPath)) {
    subscriptions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }
  
  subscriptions.push({ subscription, year, createdAt: new Date().toISOString() });
  fs.writeFileSync(dataPath, JSON.stringify(subscriptions, null, 2));
  
  return NextResponse.json({ success: true });
}
