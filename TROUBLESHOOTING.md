# Troubleshooting Database Connection Issues

## Current Problem
Pastes/URLs/Files are not saving to database on Vercel deployment.

## Checklist to Debug

### 1. Verify Environment Variables
- [ ] Go to: https://vercel.com/omdeshpande09012005s-projects/textshare/settings/environment-variables
- [ ] Check if all 3 variables exist:
  - DATABASE_URL
  - RESEND_API_KEY  
  - ADMIN_EMAIL
- [ ] Click "Edit" on DATABASE_URL and verify it shows:
  ```
  postgresql://neondb_owner:npg_cnyGoQ4vBhx8@ep-floral-leaf-adregjzu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```

### 2. Check if Variables are Applied
- [ ] After editing DATABASE_URL, did you click "Save"?
- [ ] Did a popup appear saying "Redeploy to apply changes"?
- [ ] Did you click "Redeploy"?
- [ ] Wait 2-3 minutes for deployment to complete
- [ ] Check deployment status at: https://vercel.com/omdeshpande09012005s-projects/textshare/deployments

### 3. Verify Latest Deployment
- [ ] Go to Deployments tab
- [ ] Find the LATEST deployment (should be at the top)
- [ ] Click on it
- [ ] Check "Environment Variables" section
- [ ] Confirm DATABASE_URL is the Neon URL (not localhost)

### 4. Check Runtime Logs
- [ ] Go to: https://vercel.com/omdeshpande09012005s-projects/textshare/logs
- [ ] Try creating a paste on the live site
- [ ] Refresh logs page
- [ ] Look for errors like:
  - "Prisma" errors
  - "Database" errors
  - "Connection" errors
  - "P1001" errors (can't reach database)

### 5. Test Database Connection Locally with Neon URL
Run this in your terminal to test if the Neon database is accessible:

```powershell
$env:DATABASE_URL = "postgresql://neondb_owner:npg_cnyGoQ4vBhx8@ep-floral-leaf-adregjzu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
npx prisma db push
```

If this fails, the Neon database might have issues.

### 6. Common Issues

#### Issue: Environment variables not applied
**Solution:** 
- Delete the DATABASE_URL variable completely
- Add it again from scratch
- Redeploy

#### Issue: Old deployment cached
**Solution:**
- Go to Deployments → Click latest → Click "Redeploy"
- Make sure to select "Use existing Build Cache: OFF"

#### Issue: Neon database sleeping (free tier)
**Solution:**
- Go to https://console.neon.tech
- Check if your project is "Active"
- If it says "Sleeping", click to wake it up

#### Issue: Wrong database selected
**Solution:**
- Make sure DATABASE_URL points to the database where we ran `prisma db push`
- The database should have tables: Paste, Url, File, LinkTree, QRCode

### 7. Force Fresh Deployment
If nothing works, try this:

```powershell
# Make a small change to trigger new deployment
git commit --allow-empty -m "Force redeploy"
git push origin master
```

Then immediately go to Vercel and verify the environment variables are correct.

---

## Next Steps

Tell me:
1. Did you see the "Redeploy" button appear after saving DATABASE_URL?
2. Is the latest deployment "Ready" (green checkmark)?
3. When you click on the latest deployment, what does it show for DATABASE_URL in Environment Variables section?
4. Can you check the Runtime Logs and paste any errors you see?
