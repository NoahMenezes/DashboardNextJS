# Vercel Deployment Fix Guide

## Problem
You're seeing: "Application error: a client-side exception has occurred" on your Vercel deployment at https://dashboard-next-js-m8t7.vercel.app/

## Root Causes
1. **Missing Backend URL**: The `NEXT_PUBLIC_API_URL` environment variable is not set in Vercel
2. **Hydration Mismatch**: The previous dynamic API URL detection was causing SSR/client mismatch
3. **Backend Not Deployed**: Your Node.js backend needs to be deployed separately

---

## Solution Steps

### Step 1: Deploy Your Backend First

You need to deploy the `backend` folder to a hosting service. Here are your options:

#### Option A: Deploy to Render (Recommended)
1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `dashboard-backend` (or any name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables in Render dashboard:
   ```
   TURSO_DATABASE_URL=your_turso_url
   TURSO_AUTH_TOKEN=your_turso_token
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=612878658844-2kegk8lptok4k091024l39i7bduup1s7.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_secret
   PORT=5000
   NODE_ENV=production
   ```

6. Deploy and copy the service URL (e.g., `https://dashboard-backend.onrender.com`)

#### Option B: Deploy to Railway
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `backend`
5. Add the same environment variables as above
6. Deploy and get your URL

---

### Step 2: Update Vercel Environment Variables

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your `dashboard-next-js-m8t7` project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

   **Variable Name**: `NEXT_PUBLIC_API_URL`  
   **Value**: `https://your-backend-url.onrender.com/api`  
   (Replace with your actual backend URL from Step 1)
   
   **Important**: Make sure to add `/api` at the end!

5. Select all environments (Production, Preview, Development)
6. Click "Save"

---

### Step 3: Redeploy Your Frontend

After adding the environment variable:

1. Go to **Deployments** tab in Vercel
2. Click the three dots (•••) on the latest deployment
3. Click "Redeploy"
4. Select "Use existing Build Cache" (optional, uncheck for clean build)
5. Click "Redeploy"

**OR** push a new commit to trigger automatic redeployment:

```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

---

### Step 4: Update Google OAuth Settings

Since your domain changed, update your Google OAuth credentials:

1. Go to https://console.cloud.google.com/
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized JavaScript origins**, add:
   ```
   https://dashboard-next-js-m8t7.vercel.app
   ```
5. Under **Authorized redirect URIs**, add:
   ```
   https://dashboard-next-js-m8t7.vercel.app
   ```
6. Save changes

---

### Step 5: Verify Deployment

1. Visit https://dashboard-next-js-m8t7.vercel.app/
2. Check browser console (F12) for any errors
3. Try to log in with Google
4. Create a blog post to test functionality
5. Verify edit/delete buttons work

---

## Common Issues & Solutions

### Issue: Still seeing "Application error"
**Solution**: 
- Check Vercel deployment logs: Go to Deployments → Click on latest → View Function Logs
- Verify `NEXT_PUBLIC_API_URL` is set correctly (must start with `https://` and end with `/api`)
- Make sure backend is running (visit your backend URL in browser, should see "Cannot GET /")

### Issue: "Network Error" or "Failed to fetch"
**Solution**:
- Backend is not running or URL is incorrect
- Check CORS settings in `backend/server.js` - make sure your Vercel URL is allowed
- Update CORS origin to include your Vercel URL:
  ```javascript
  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://dashboard-next-js-m8t7.vercel.app'
    ],
    credentials: true
  }));
  ```

### Issue: Google Login not working
**Solution**:
- Update Google OAuth redirect URIs (see Step 4)
- Make sure `GOOGLE_CLIENT_ID` in `components/providers.tsx` matches your credentials
- Consider moving this to environment variable: `process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID`

### Issue: Database connection errors
**Solution**:
- Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set correctly in backend deployment
- Test connection by checking backend logs

---

## Environment Variables Checklist

### Frontend (Vercel)
- [x] `NEXT_PUBLIC_API_URL` - Your deployed backend URL + `/api`
- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (optional, currently hardcoded)

### Backend (Render/Railway)
- [x] `TURSO_DATABASE_URL`
- [x] `TURSO_AUTH_TOKEN`
- [x] `JWT_SECRET`
- [x] `GOOGLE_CLIENT_ID`
- [x] `GOOGLE_CLIENT_SECRET`
- [x] `PORT` (set to 5000 or 10000)
- [x] `NODE_ENV` (set to "production")

---

## Quick Commands

### Test Backend Locally
```bash
cd backend
npm install
npm run dev
```

### Test Frontend Locally with Production Backend
```bash
# In dashboardtsx root
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api npm run dev:next
```

### Check Environment Variables
```bash
# In Vercel CLI (if installed)
vercel env ls
```

---

## Next Steps After Deployment

1. **Monitor Performance**: Check Vercel Analytics and Render/Railway logs
2. **Set Up Custom Domain** (optional): Add your own domain in Vercel settings
3. **Enable Analytics**: Turn on Vercel Analytics for usage insights
4. **Add Error Tracking**: Consider integrating Sentry for error monitoring
5. **Database Backups**: Set up regular backups for your Turso database

---

## Need Help?

If you're still experiencing issues:

1. Check Vercel deployment logs
2. Check backend service logs (Render/Railway dashboard)
3. Open browser DevTools console and network tab
4. Share error messages for more specific help

---

## Summary

The fix involved:
1. ✅ Simplified `lib/config.ts` to use static environment variable (fixed hydration issue)
2. ⏳ Deploy backend to Render/Railway
3. ⏳ Add `NEXT_PUBLIC_API_URL` to Vercel environment variables
4. ⏳ Redeploy frontend on Vercel
5. ⏳ Update Google OAuth redirect URIs

Follow the steps above in order, and your deployment should work!