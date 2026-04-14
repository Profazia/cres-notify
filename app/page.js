'use client';
import { useState } from 'react';

export default function Home() {
  const [year, setYear] = useState('2026');
  const [status, setStatus] = useState('');

  const enableNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('Push notifications not supported');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setStatus('Notification permission denied');
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        setStatus('Configuration error: VAPID key missing');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      });

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription, year })
      });

      if (!res.ok) throw new Error('Subscription failed');

      setStatus('Notifications enabled! You\'ll be notified when results are out.');
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative backdrop-blur-2xl bg-white/5 p-10 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full mx-4 animate-float">
        <div className="relative">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            CBSE Result Notifier
          </h1>
          <p className="text-center text-blue-200/60 text-sm mb-8">Get instant alerts when results drop</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-blue-100/80">Select Year</label>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="2026" className="bg-slate-900">2026</option>
              <option value="2027" className="bg-slate-900">2027</option>
              <option value="2028" className="bg-slate-900">2028</option>
            </select>
          </div>

          <button 
            onClick={enableNotifications}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02]"
          >
            🔔 Enable Notifications
          </button>

          {status && (
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <p className="text-center text-sm text-blue-100/90">{status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}
