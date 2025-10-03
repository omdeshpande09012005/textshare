# 🔧 Vercel Deployment Fix Guide

## ⚠️ Issues Fixed

1. **File Upload Not Working** - Fixed by storing files in database instead of filesystem
2. **Database Schema Sync** - Added `prisma db push` to build process
3. **Missing Environment Variables** - Added required environment variables

---

## 📋 Steps to Fix Your Deployment

### Step 1: Update Database Schema

Run these commands in your terminal:

```bash
# Navigate to project
cd W:\PROJECTS\textshare

# Generate Prisma client with new schema
npx prisma generate

# Push schema changes to Neon database
npx prisma db push
```

### Step 2: Set Environment Variables in Vercel

1. **Go to your Vercel dashboard**: https://vercel.com/dashboard
2. **Select your textshare project**
3. **Go to Settings** → **Environment Variables**
4. **Add these variables:**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Your Neon database connection string |
| `NEXT_PUBLIC_BASE_URL` | `https://your-app.vercel.app` | Your Vercel app URL |
| `RESEND_API_KEY` | `re_...` | (Optional) For contact form |
| `ADMIN_EMAIL` | `your@email.com` | (Optional) For contact form |

**Important:** 
- For `NEXT_PUBLIC_BASE_URL`, use your actual Vercel URL (e.g., `https://textshare.vercel.app`)
- Don't include trailing slash

### Step 3: Commit and Push Changes

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Fix: Update file storage for Vercel compatibility"

# Push to GitHub (this will trigger Vercel deployment)
git push origin main
```

### Step 4: Verify Deployment

1. **Wait for Vercel to deploy** (check dashboard)
2. **Test Share Text/Code feature**:
   - Go to your site
   - Click "Share Text/Code" or go to `/create`
   - Try creating a paste
3. **Test Upload Files feature**:
   - Click "Upload Files" or go to `/upload`
   - Try uploading a small file (< 10MB)

---

## 🔍 What Changed?

### Files Modified:

1. **`prisma/schema.prisma`**
   - Added `fileData` field to store base64-encoded files in database
   - This works on Vercel's read-only filesystem

2. **`package.json`**
   - Updated build script to run `prisma db push` automatically
   - Ensures database schema is always in sync

3. **`src/app/api/files/route.ts`**
   - Changed from saving to filesystem → saving to database
   - Converts files to base64 before storing

4. **`src/app/api/files/[slug]/route.ts`**
   - Changed from reading filesystem → reading from database
   - Decodes base64 when serving files

---

## 🚨 Troubleshooting

### If uploads still fail:

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → View Function Logs
   - Look for errors in `/api/files` endpoint

2. **Check Database Connection:**
   - Verify `DATABASE_URL` is correct in Vercel
   - Test connection: https://your-app.vercel.app/api/debug

3. **File Size Limits:**
   - Vercel has 4.5MB body size limit on Hobby plan
   - Consider using Vercel Pro or external storage for larger files

### If pastes (text/code) fail:

1. **Check API logs** for `/api/pastes` endpoint
2. **Verify DATABASE_URL** is set correctly
3. **Check Prisma client** is generated properly

---

## 📈 Next Steps (Optional Improvements)

### For Better File Handling:

Consider using external storage for files > 5MB:

**Option 1: Cloudinary (Free Tier - 25GB)**
```bash
npm install cloudinary
```

**Option 2: AWS S3 (Free Tier - 5GB)**
```bash
npm install @aws-sdk/client-s3
```

**Option 3: Vercel Blob (Paid)**
```bash
npm install @vercel/blob
```

### For Better Performance:

1. **Add Redis for caching** (Upstash - Free Tier)
2. **Enable compression** for large pastes
3. **Add CDN** for static assets

---

## ✅ Success Checklist

- [ ] Ran `npx prisma generate` locally
- [ ] Ran `npx prisma db push` to update Neon
- [ ] Set all environment variables in Vercel
- [ ] Pushed code to GitHub
- [ ] Waited for Vercel deployment to complete
- [ ] Tested Share Text/Code feature
- [ ] Tested Upload Files feature
- [ ] Checked Vercel function logs for errors

---

## 🆘 Still Not Working?

If you're still having issues:

1. **Check the browser console** for error messages
2. **Check Vercel function logs** for backend errors
3. **Verify your Neon database** is active and has correct schema
4. **Test locally** first with `npm run dev`

Need help? Open an issue with:
- Error message from browser console
- Error from Vercel logs
- What feature is failing (paste/upload/etc.)
