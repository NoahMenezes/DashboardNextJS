# Deployment Checklist

## Pre-Deployment Verification ✅

### Local Testing
- [x] Build completes successfully (`pnpm build`)
- [x] No TypeScript errors
- [x] No ESLint warnings (critical ones fixed)
- [x] Application runs locally (`pnpm dev`)
- [x] All pages render correctly
- [x] API endpoints respond correctly
- [x] Database connection works

### Code Quality
- [x] Removed unused imports
- [x] Fixed TypeScript type issues
- [x] Console errors handled appropriately
- [x] No hardcoded secrets in code
- [x] Environment variables properly configured

### Documentation
- [x] README.md updated with comprehensive information
- [x] Backend documentation consolidated
- [x] Setup instructions clear and complete
- [x] Deployment guides included

## Frontend Deployment (Vercel)

### Prerequisites
- [ ] GitHub repository created and code pushed
- [ ] Vercel account created

### Environment Variables Required
```env
TURSO_DATABASE_URL=your-turso-database-url
TURSO_AUTH_TOKEN=your-turso-auth-token
JWT_SECRET=your-strong-jwt-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Steps
1. [ ] Push code to GitHub
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. [ ] Import project in Vercel
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

3. [ ] Configure Build Settings
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `pnpm build` (default)
   - Output Directory: `.next` (default)

4. [ ] Add Environment Variables
   - Add all required env vars listed above
   - Note: Add `NEXT_PUBLIC_API_URL` after backend is deployed

5. [ ] Deploy
   - Click "Deploy"
   - Wait for build completion
   - Note the deployment URL

6. [ ] Post-Deployment
   - [ ] Test homepage loads
   - [ ] Test navigation works
   - [ ] Test dark/light theme toggle
   - [ ] Verify images load correctly
   - [ ] Check animations work

## Backend Deployment (Railway/Render/Fly.io)

### Environment Variables Required
```env
TURSO_DATABASE_URL=your-turso-database-url
TURSO_AUTH_TOKEN=your-turso-auth-token
JWT_SECRET=your-strong-jwt-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
PORT=5000
```

### Option 1: Railway
1. [ ] Install Railway CLI
   ```bash
   npm install -g @railway/cli
   ```

2. [ ] Login and Deploy
   ```bash
   railway login
   cd backend
   railway init
   railway up
   ```

3. [ ] Set Environment Variables
   ```bash
   railway variables set TURSO_DATABASE_URL=...
   railway variables set TURSO_AUTH_TOKEN=...
   railway variables set JWT_SECRET=...
   railway variables set GOOGLE_CLIENT_ID=...
   railway variables set PORT=5000
   ```

4. [ ] Get Backend URL
   ```bash
   railway open
   ```

5. [ ] Update Frontend
   - Add backend URL to Vercel env vars as `NEXT_PUBLIC_API_URL`
   - Redeploy frontend

### Option 2: Render
1. [ ] Create Web Service
   - Go to https://render.com
   - New → Web Service
   - Connect GitHub repository

2. [ ] Configure Service
   - Name: `dashboardtsx-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Instance Type: Free

3. [ ] Add Environment Variables
   - Add all required env vars in Render dashboard

4. [ ] Deploy
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the provided URL

5. [ ] Update Frontend
   - Add backend URL to Vercel as `NEXT_PUBLIC_API_URL`
   - Redeploy frontend

### Option 3: Fly.io
1. [ ] Install Fly CLI
   ```powershell
   # Windows
   iwr https://fly.io/install.ps1 -useb | iex
   
   # Mac/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. [ ] Login and Launch
   ```bash
   cd backend
   fly auth login
   fly launch --name dashboardtsx-backend
   ```

3. [ ] Set Secrets
   ```bash
   fly secrets set TURSO_DATABASE_URL=...
   fly secrets set TURSO_AUTH_TOKEN=...
   fly secrets set JWT_SECRET=...
   fly secrets set GOOGLE_CLIENT_ID=...
   ```

4. [ ] Deploy
   ```bash
   fly deploy
   ```

5. [ ] Get URL
   ```bash
   fly status
   ```

6. [ ] Update Frontend
   - Add backend URL to Vercel as `NEXT_PUBLIC_API_URL`
   - Redeploy frontend

## Post-Deployment Verification

### Frontend
- [ ] Homepage loads correctly
- [ ] All images display properly
- [ ] Navigation works
- [ ] Features page renders
- [ ] Blog page accessible
- [ ] Dark/light theme toggle works
- [ ] Animations play smoothly
- [ ] Mobile responsive design works
- [ ] No console errors in browser

### Backend
- [ ] Health check endpoint responds: `GET /health`
- [ ] API health check works: `GET /api/health`
- [ ] Database connection verified
- [ ] CORS allows frontend domain
- [ ] Authentication endpoints work
- [ ] Blog endpoints return data
- [ ] No server errors in logs

### Integration
- [ ] Frontend can fetch blog posts
- [ ] Frontend can fetch users (if enabled)
- [ ] Authentication flow works end-to-end
- [ ] Google OAuth works (if configured)
- [ ] All API calls succeed
- [ ] Error handling works properly

## Security Checklist

- [ ] All environment variables secured (not in code)
- [ ] JWT secret is strong and unique
- [ ] CORS configured for production domain only
- [ ] HTTPS enabled on both frontend and backend
- [ ] Database credentials rotated from defaults
- [ ] Google OAuth redirect URIs updated for production
- [ ] Rate limiting configured (if applicable)
- [ ] SQL injection protection verified (parameterized queries)
- [ ] XSS protection enabled
- [ ] Security headers configured

## Performance Optimization

- [ ] Images optimized and using Next.js Image component
- [ ] Lazy loading implemented where appropriate
- [ ] Build size is reasonable
- [ ] Core Web Vitals measured and acceptable
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] Caching strategy implemented (if applicable)

## Monitoring & Maintenance

- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configure log aggregation
- [ ] Create alerts for critical errors
- [ ] Document rollback procedure
- [ ] Create backup strategy for database

## Final Checks

- [ ] Custom domain configured (optional)
- [ ] SSL certificate valid
- [ ] DNS records propagated
- [ ] SEO meta tags verified
- [ ] Social sharing images working
- [ ] Analytics installed (optional)
- [ ] Contact information updated
- [ ] Legal pages added (Privacy, Terms - if needed)

## Rollback Plan

If deployment fails:

1. **Immediate Actions**
   - Check Vercel/Railway/Render logs
   - Verify environment variables
   - Check database connectivity

2. **Rollback Steps**
   - Vercel: Revert to previous deployment from dashboard
   - Railway/Render: Redeploy previous version
   - Database: Restore from backup if needed

3. **Debug Locally**
   - Pull production env vars to local `.env.local`
   - Test build locally: `pnpm build`
   - Test production build: `pnpm start`
   - Fix issues and redeploy

## Success Criteria

✅ Frontend deployed and accessible  
✅ Backend deployed and responding  
✅ Database connected and functional  
✅ All environment variables configured  
✅ No critical errors in logs  
✅ Application fully functional  
✅ Performance metrics acceptable  
✅ Security measures in place  

---

## Notes

- Default port for backend: 5000
- Default port for frontend dev: 3000
- Build time: ~10-30 seconds
- Startup time: ~1-2 seconds

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Fly.io Documentation](https://fly.io/docs)
- [Turso Documentation](https://docs.turso.tech)

---

**Last Updated:** January 7, 2026  
**Status:** Ready for Deployment ✅
