# Production Deployment Checklist

## 1. Create Vercel KV Database
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **KV**
4. Name it (e.g., "cres-notify-kv")
5. Click **Create**
6. Vercel will automatically add `KV_*` env vars to your project

## 2. Environment Variables
Add these to your Vercel project (Settings → Environment Variables):

```
VAPID_PUBLIC_KEY=BCZRoicds4wyk3vIDug3nVIfJ2iBHyTgkzpSzC-y495_2ifcCAnjtMe-PQ2D5OPc8qPc2TEjo6AcYV-9iwTxn-0
VAPID_PRIVATE_KEY=rTDa8s17_PodbEQS-vO55r3TYMIzehc4IAcm9lmhjYo
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BCZRoicds4wyk3vIDug3nVIfJ2iBHyTgkzpSzC-y495_2ifcCAnjtMe-PQ2D5OPc8qPc2TEjo6AcYV-9iwTxn-0
```

## 3. Deploy
```bash
git add .
git commit -m "Switch to Vercel KV storage"
git push
```

## 4. Set Up Cron Job
Create `vercel.json` in project root:
```json
{
  "crons": [{
    "path": "/api/check-results",
    "schedule": "*/30 * * * *"
  }]
}
```

Then redeploy. Vercel will automatically run the cron job every 30 minutes.

## Ready to Deploy ✅
All code is now serverless-compatible with Vercel KV storage.
