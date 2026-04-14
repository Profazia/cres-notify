# CBSE Result Notifier

Get instant push notifications when CBSE Class 10th results are announced.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Generate VAPID keys:**
```bash
npx web-push generate-vapid-keys
```

3. **Create `.env.local` file:**
```env
VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Set up a cron job** to hit the check endpoint periodically:
```bash
# Example: Check every 30 minutes
*/30 * * * * curl http://localhost:3000/api/check-results
```

For production, use a service like:
- Vercel Cron Jobs
- GitHub Actions scheduled workflows
- External cron services (cron-job.org, EasyCron)

## How it works

1. Users visit the site and select their result year
2. Click "Enable Notifications" to subscribe
3. A cron job periodically hits `/api/check-results`
4. When CBSE results are live (HTTP 200), all subscribed users get notified
5. Clicking the notification opens the CBSE results website

## API Endpoints

- `POST /api/subscribe` - Subscribe a user to notifications
- `GET /api/check-results` - Check if results are available and send notifications (called by cron)
