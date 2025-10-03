# 🔧 Fix Database Connection Error (Status 500)

## Problem
Your Vercel deployment shows "fetch failed Status 500" because the DATABASE_URL environment variable is incorrect or outdated.

## Solution

### Step 1: Go to Vercel Environment Variables
Visit: https://vercel.com/omdeshpande09012005s-projects/textshare/settings/environment-variables

### Step 2: Edit DATABASE_URL
1. Find **DATABASE_URL** in the list
2. Click the **⋮ (three dots)** → **Edit**
3. Replace the entire value with:
   ```
   postgresql://neondb_owner:npg_cnyGoQ4vBhx8@ep-floral-leaf-adregjzu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Click **Save**

### Step 3: Redeploy
- Vercel will show a prompt: **"Redeploy to apply changes"**
- Click **Redeploy**
- Wait 2-3 minutes for deployment to complete

### Step 4: Test
After redeployment:
- ✅ Create Paste should work
- ✅ Upload Files should work  
- ✅ Shorten URL should work
- ✅ QR Generator should work
- ✅ LinkTree should work

---

## Why This Happened
The DATABASE_URL was set before the Neon database was created, so it was pointing to the wrong database or an empty one. We've now pushed the schema to Neon, so updating the URL will fix everything.
