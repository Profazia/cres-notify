import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { kv } from '@vercel/kv';

webpush.setVapidDetails(
  'mailto:cbse-notify@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function GET() {
  const keys = await kv.keys('sub:*');
  
  if (!keys.length) {
    return NextResponse.json({ message: 'No subscriptions' });
  }

  const subscriptions = await kv.mget(...keys);
  const currentYear = new Date().getFullYear().toString();
  
  try {
    const response = await fetch(`https://cbseresults.nic.in/${currentYear}/CBSE10th/CBSE10thLogin?resultType=cbse10`);
    
    if (response.status === 200) {
      const payload = JSON.stringify({
        title: '🎉 CBSE Results Announced!',
        body: `Class 10th results for ${currentYear} are now available. Click to check your results.`
      });

      const notifications = subscriptions
        .filter(sub => sub?.year === currentYear)
        .map(sub => webpush.sendNotification(sub.subscription, payload).catch(err => console.error(err)));

      await Promise.all(notifications);
      
      return NextResponse.json({ message: 'Notifications sent', count: notifications.length });
    }
    
    return NextResponse.json({ message: 'Results not available yet' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
