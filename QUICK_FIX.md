# 🚀 Quick Fix Commands

## Run These Commands Now:

```bash
# 1. Generate Prisma client with updated schema
npx prisma generate

# 2. Push schema to Neon database
npx prisma db push

# 3. Commit changes
git add .
git commit -m "Fix: Vercel file storage compatibility"
git push origin main
```

## Vercel Environment Variables Needed:

```
DATABASE_URL=postgresql://[your-neon-connection-string]
NEXT_PUBLIC_BASE_URL=https://[your-app].vercel.app
```

Add these in: **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

## Test After Deployment:

1. ✅ Share Text/Code: `/create`
2. ✅ Upload Files: `/upload`
3. ✅ Check logs in Vercel Dashboard

---

**Full Guide:** See `VERCEL_FIX.md` for detailed instructions.
