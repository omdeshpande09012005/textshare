# 🚀 Free Deployment Guide for TextShare

## 📋 Overview

This guide explains how to deploy TextShare completely **FREE** with proper limits to prevent abuse.

---

## 🛡️ Implemented Protections

### 1. **Rate Limiting**
All APIs are protected with rate limits to prevent abuse:

| Feature | Limit | Window |
|---------|-------|--------|
| General Requests | 50 requests | 15 minutes |
| File Uploads | 10 uploads | 1 hour |
| Text Pastes | 20 pastes | 1 hour |
| URL Shortening | 30 URLs | 1 hour |

**How it works:**
- Tracks requests by IP address
- Returns `429 Too Many Requests` when limit exceeded
- Includes `Retry-After` header

### 2. **File Size Limits**
```
Single File: 10MB max
Total Upload: 25MB per session
Max Files: 5 files at once
```

### 3. **Content Length Limits**
```
Text/Paste: 500KB (~500 pages)
URL Length: 2,048 characters
Title Length: 200 characters
LinkTree Bio: 200 characters
LinkTree Links: 10 max
```

### 4. **Automatic Expiration**
All content expires automatically (cannot be disabled on free tier):

| Content Type | Default Expiry | Max Expiry |
|-------------|----------------|------------|
| Files | 7 days | 90 days |
| Pastes | 7 days | 90 days |
| URLs | 30 days | 90 days |
| QR Codes | 90 days | - |
| LinkTrees | Never (unless 0 views after 90 days) | - |

**Automatic Cleanup:**
- Runs every 6 hours in production
- Deletes expired content
- Removes physical files from storage
- Frees up database space

---

## 🆓 Free Hosting Options

### Option 1: Vercel (Recommended) ⭐

**Best for:** Quick deployment, serverless, great for Next.js

**Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ No credit card required

**Limitations:**
- 🚫 File storage is ephemeral (files deleted after ~12 hours)
- ⚠️ Need external storage for file uploads (use Option 1B)

**Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add RESEND_API_KEY
vercel env add ADMIN_EMAIL
```

**Option 1B: Vercel + Cloudflare R2 (Files)**
- Use Cloudflare R2 for file storage (10GB free)
- Modify file upload to use S3-compatible API

---

### Option 2: Railway.app

**Best for:** Full-stack apps with database and storage

**Free Tier:**
- ✅ $5 credit/month (enough for small app)
- ✅ PostgreSQL database included
- ✅ Persistent storage
- ✅ File uploads work out of the box

**Deploy:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up

# Set environment variables in Railway dashboard
```

---

### Option 3: Render.com

**Best for:** Simple deployment with database

**Free Tier:**
- ✅ Static sites unlimited
- ✅ Web services (750 hours/month)
- ✅ PostgreSQL database (90 days, then expires)
- ⚠️ Services sleep after 15 min inactivity

**Deploy:**
1. Connect GitHub repo
2. Select "Web Service"
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add PostgreSQL database
6. Set environment variables

---

### Option 4: Fly.io

**Best for:** Global deployment with persistent storage

**Free Tier:**
- ✅ 3 shared-cpu VMs
- ✅ 3GB persistent storage
- ✅ 160GB bandwidth

**Deploy:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch

# Deploy
fly deploy
```

---

### Option 5: Netlify + Supabase

**Best for:** Static hosting with serverless functions

**Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ Serverless functions (125k requests/month)
- ✅ Supabase PostgreSQL (500MB)

---

## 🗄️ Database Options (Free)

### Option A: Neon.tech (Recommended) ⭐
```
✅ 512MB storage free
✅ PostgreSQL
✅ Branching support
✅ Always on
```

**Setup:**
1. Sign up at neon.tech
2. Create project
3. Copy connection string
4. Add to `.env.local`:
```
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname"
```

### Option B: Supabase
```
✅ 500MB database
✅ PostgreSQL
✅ Additional features (auth, storage)
```

### Option C: Railway PostgreSQL
```
✅ Included with Railway
✅ Easy setup
✅ Auto-scaling
```

### Option D: Render PostgreSQL
```
⚠️ Free for 90 days only
✅ Easy setup
```

---

## 📁 File Storage Options (Free)

### Option A: Cloudflare R2 ⭐
```
✅ 10GB storage free
✅ S3-compatible API
✅ Zero egress fees
```

**Setup:**
```bash
npm install @aws-sdk/client-s3

# Update src/app/api/files/route.ts to use S3 API
```

### Option B: Backblaze B2
```
✅ 10GB storage free
✅ 1GB download/day free
✅ S3-compatible
```

### Option C: Local Storage (Not Recommended)
```
⚠️ Works on Railway, Fly.io
🚫 Not on Vercel (ephemeral)
⚠️ Lost on container restart
```

---

## ⚙️ Environment Variables

Add these to your hosting platform:

```env
# Database (required)
DATABASE_URL="postgresql://..."

# Email (optional but recommended)
RESEND_API_KEY="re_xxx"
ADMIN_EMAIL="your@email.com"

# App URL (auto-set on most platforms)
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"

# Node environment
NODE_ENV="production"
```

---

## 🔧 Pre-Deployment Checklist

### 1. Update Database Schema
```bash
npx prisma generate
npx prisma db push
```

### 2. Build Locally First
```bash
npm run build
```

### 3. Test Production Build
```bash
npm start
```

### 4. Check Environment Variables
- ✅ DATABASE_URL set
- ✅ RESEND_API_KEY set (if using contact form)
- ✅ ADMIN_EMAIL set
- ✅ NEXT_PUBLIC_BASE_URL set

### 5. Verify Limits Are Active
The limits are automatically active once deployed. Test by:
- Uploading a file > 10MB (should fail)
- Making 51+ requests in 15 min (should rate limit)
- Creating content without expiry (should auto-expire)

---

## 🎯 Recommended Configuration

**For Zero Cost:**
```
Hosting: Vercel
Database: Neon.tech
File Storage: Cloudflare R2 (or disable file uploads)
Email: Resend (100 emails/day free)
```

**Total Cost: $0/month** ✨

**For Better File Support:**
```
Hosting: Railway ($5 credit/month)
Database: Railway PostgreSQL (included)
File Storage: Railway volume (included)
Email: Resend
```

**Total Cost: ~$0-3/month** (depending on usage)

---

## 🚨 Monitoring & Alerts

### Check Storage Usage
```sql
-- Check total file storage
SELECT 
  COUNT(*) as total_files,
  SUM(size) / 1024 / 1024 as total_mb,
  SUM(size) / 1024 / 1024 / 1024 as total_gb
FROM "File";

-- Check database size
SELECT pg_size_pretty(pg_database_size('your_database_name'));
```

### Alert Thresholds
- Database > 400MB (80% of 500MB limit)
- Files > 8GB (80% of 10GB limit)
- Average requests > 80/15min (80% of rate limit)

---

## 🎉 Deployment Steps

### Vercel (Easiest)
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Import in Vercel
# - Go to vercel.com
# - Click "New Project"
# - Import your GitHub repo
# - Add environment variables
# - Deploy!

# 3. Set up database
# - Create Neon.tech database
# - Add DATABASE_URL to Vercel
# - Run migrations from local:
npx prisma db push
```

### Railway
```bash
# 1. Install CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Initialize
railway init

# 4. Add PostgreSQL
railway add --database postgresql

# 5. Deploy
railway up

# 6. Set environment variables
railway variables set RESEND_API_KEY=re_xxx
railway variables set ADMIN_EMAIL=your@email.com
```

---

## 📊 Expected Usage on Free Tier

With the limits implemented:

| Metric | Free Tier Capacity |
|--------|-------------------|
| Daily Active Users | ~500-1000 |
| Files Stored | ~100-200 (auto-cleanup) |
| URLs/Pastes | ~500-1000 (auto-cleanup) |
| Monthly Bandwidth | <100GB |
| Database Size | <500MB |
| Storage | <10GB |

**Perfect for:**
- ✅ Personal use
- ✅ Portfolio projects
- ✅ Small communities
- ✅ Learning/testing

**Not suitable for:**
- ❌ High-traffic production sites
- ❌ Long-term file storage
- ❌ Commercial use with many users

---

## 🔄 Post-Deployment

### Monitor Your App
```bash
# Vercel logs
vercel logs

# Railway logs
railway logs

# Check cleanup job
# Should see "[Cleanup] ..." messages every 6 hours
```

### Test Limits
```bash
# Test rate limiting
for i in {1..60}; do curl https://yourapp.com/api/pastes; done

# Test file size limit
curl -F "file=@large_file.bin" https://yourapp.com/api/files
```

---

## 🆘 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db push

# Check connection string format
# Should be: postgresql://user:pass@host:port/dbname?sslmode=require
```

### File Upload Issues on Vercel
```
Problem: Files disappear after deploy
Solution: Use Cloudflare R2 or disable file uploads
```

### Rate Limit Too Aggressive
```typescript
// Adjust in src/lib/limits.ts
RATE_LIMIT: {
  MAX_REQUESTS_PER_WINDOW: 100, // Increase from 50
  MAX_UPLOADS_PER_HOUR: 20, // Increase from 10
}
```

---

## ✅ Final Checklist

Before going live:

- [ ] All environment variables set
- [ ] Database connected and migrated
- [ ] Rate limiting tested
- [ ] File size limits tested
- [ ] Auto-cleanup running
- [ ] Contact form working
- [ ] Custom domain set up (optional)
- [ ] Analytics added (optional)
- [ ] Monitoring set up

---

**You're ready to deploy! 🚀**

Your TextShare app is now protected against abuse and ready for free hosting!
