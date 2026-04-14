# Production Deployment Checklist

## Environment Variables (Required)
Add these to your hosting platform:

```
VAPID_PUBLIC_KEY=BCZRoicds4wyk3vIDug3nVIfJ2iBHyTgkzpSzC-y495_2ifcCAnjtMe-PQ2D5OPc8qPc2TEjo6AcYV-9iwTxn-0
VAPID_PRIVATE_KEY=rTDa8s17_PodbEQS-vO55r3TYMIzehc4IAcm9lmhjYo
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BCZRoicds4wyk3vIDug3nVIfJ2iBHyTgkzpSzC-y495_2ifcCAnjtMe-PQ2D5OPc8qPc2TEjo6AcYV-9iwTxn-0
```

## Deploy Commands
- Build: `npm run build`
- Start: `npm run start`

## Set Up Cron Job
After deployment, configure a cron job to check results:

**URL to hit:** `https://your-domain.com/api/check-results`

**Recommended schedule:** Every 30 minutes during result season
```
*/30 * * * * curl https://your-domain.com/api/check-results
```

**Options:**
- Vercel Cron (add `vercel.json` with cron config)
- GitHub Actions (scheduled workflow)
- External: cron-job.org, EasyCron

## Important Notes
- `subscriptions.json` stores user data locally
- For Vercel/serverless: File won't persist - consider switching to a database
- For VPS/traditional hosting: Works perfectly as-is

## Ready to Deploy ✅
All code is production-ready. Just add env vars and set up the cron job.
