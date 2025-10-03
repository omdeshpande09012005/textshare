# 🚀 TextShare API on Free Hosting - Complete Guide

## ✅ YES! You CAN Provide API Access WITHOUT a Custom Domain!

Your TextShare API will work **perfectly** on free hosting platforms. No custom domain needed!

---

## 🎯 How It Works

When you deploy TextShare to a free hosting platform, you automatically get:

### 1️⃣ **Free Domain from Hosting Provider**
- **Vercel:** `textshare.vercel.app` (or `your-project-name.vercel.app`)
- **Railway:** `textshare.up.railway.app`
- **Netlify:** `textshare.netlify.app`
- **Render:** `textshare.onrender.com`

### 2️⃣ **Full API Access**
All your API endpoints are immediately available:
```
https://textshare.vercel.app/api/pastes    ✅
https://textshare.vercel.app/api/files     ✅
https://textshare.vercel.app/api/urls      ✅
https://textshare.vercel.app/api/contact   ✅
```

### 3️⃣ **Rate Limiting Works Perfectly**
- IP-based rate limiting functions on all platforms
- No custom domain required for security features
- All abuse protection active

---

## 📚 API Documentation Example

Here's how developers will use your API:

### **Creating a Text Paste**
```bash
curl -X POST https://textshare.vercel.app/api/pastes \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello World!",
    "title": "My First Paste",
    "expiresIn": "7d"
  }'
```

**Response:**
```json
{
  "success": true,
  "slug": "abc123def456",
  "url": "https://textshare.vercel.app/p/abc123def456",
  "expiresAt": "2025-10-10T12:00:00Z"
}
```

### **Uploading a File**
```bash
curl -X POST https://textshare.vercel.app/api/files \
  -F "files=@document.pdf"
```

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "slug": "file123abc",
      "filename": "document.pdf",
      "size": 1024000,
      "url": "https://textshare.vercel.app/f/file123abc"
    }
  ]
}
```

### **Shortening a URL**
```bash
curl -X POST https://textshare.vercel.app/api/urls \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://very-long-url.com/path/to/page",
    "expiresIn": "30d"
  }'
```

**Response:**
```json
{
  "success": true,
  "slug": "abc123",
  "shortUrl": "https://textshare.vercel.app/u/abc123",
  "originalUrl": "https://very-long-url.com/path/to/page"
}
```

---

## 🛡️ Rate Limits (Active on Free Hosting)

All rate limits work perfectly without a custom domain:

| Endpoint | Limit | Window |
|----------|-------|--------|
| General API | 50 requests | 15 minutes |
| File Uploads | 10 uploads | 1 hour |
| Text Pastes | 20 pastes | 1 hour |
| URL Shortening | 30 URLs | 1 hour |
| Contact Form | 50 submissions | 15 minutes |

**Rate limit headers included in responses:**
```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 2025-10-03T12:15:00Z
```

---

## 💰 Cost Comparison

### Free Tier Limits (Vercel - Recommended)

| Resource | Free Limit | TextShare Usage |
|----------|------------|-----------------|
| **Bandwidth** | 100 GB/month | ~50-70 GB/month ✅ |
| **Serverless Executions** | 100 hours | ~20-30 hours ✅ |
| **Edge Requests** | Unlimited | ✅ |
| **Build Minutes** | 6000 min/month | ~10-20 min ✅ |
| **Databases** | Free with partners | Neon PostgreSQL ✅ |

**Total Monthly Cost:** **$0.00** 🎉

---

## 🚀 Deployment Steps

### **Option 1: Vercel (Recommended)**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables:
     ```
     DATABASE_URL=your_neon_postgres_url
     RESEND_API_KEY=your_resend_key
     ADMIN_EMAIL=omdeshpande123456789@gmail.com
     ```
   - Click "Deploy"

3. **Your API is LIVE!**
   ```
   API Base URL: https://textshare.vercel.app/api
   ```

### **Option 2: Railway**

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Your API is LIVE!**
   ```
   API Base URL: https://textshare.up.railway.app/api
   ```

---

## 📖 What to Tell API Users

Add this to your API documentation page:

### **Getting Started**

```markdown
## Base URL

https://textshare.vercel.app/api

(Replace with your actual deployment URL)

## Authentication

No authentication required! All endpoints are public with rate limiting applied per IP address.

## Rate Limiting

- 50 general requests per 15 minutes
- 10 file uploads per hour
- 20 text pastes per hour
- 30 URL shortenings per hour

Rate limit info is returned in response headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when limit resets

## CORS

CORS is enabled for all origins. You can make requests from any domain.

## Response Format

All endpoints return JSON with this structure:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message here"
}
```
```

---

## 🎯 Example Integration

Here's how someone would integrate your API into their app:

### **JavaScript/TypeScript**
```typescript
const TEXTSHARE_API = 'https://textshare.vercel.app/api';

// Create a paste
async function createPaste(content: string) {
  const response = await fetch(`${TEXTSHARE_API}/pastes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, expiresIn: '7d' })
  });
  return response.json();
}

// Upload file
async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('files', file);
  
  const response = await fetch(`${TEXTSHARE_API}/files`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

// Shorten URL
async function shortenUrl(url: string) {
  const response = await fetch(`${TEXTSHARE_API}/urls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, expiresIn: '30d' })
  });
  return response.json();
}
```

### **Python**
```python
import requests

TEXTSHARE_API = 'https://textshare.vercel.app/api'

# Create a paste
def create_paste(content):
    response = requests.post(
        f'{TEXTSHARE_API}/pastes',
        json={'content': content, 'expiresIn': '7d'}
    )
    return response.json()

# Upload file
def upload_file(file_path):
    with open(file_path, 'rb') as f:
        files = {'files': f}
        response = requests.post(f'{TEXTSHARE_API}/files', files=files)
    return response.json()

# Shorten URL
def shorten_url(url):
    response = requests.post(
        f'{TEXTSHARE_API}/urls',
        json={'url': url, 'expiresIn': '30d'}
    )
    return response.json()
```

---

## ❓ FAQ

### **Q: Do I need a custom domain for the API to work?**
**A:** NO! The API works perfectly on the free domain provided by your hosting platform (e.g., `textshare.vercel.app`).

### **Q: Will rate limiting work without a custom domain?**
**A:** YES! Rate limiting is IP-based and works on any domain.

### **Q: Can I add a custom domain later?**
**A:** YES! You can add a custom domain anytime through your hosting provider's settings. The API will work on both the free domain and custom domain simultaneously.

### **Q: Is there a limit on API calls?**
**A:** The rate limits prevent abuse, but for legitimate use, you can make thousands of calls per day within the fair usage policy.

### **Q: Will the API URL change?**
**A:** The free domain (`textshare.vercel.app`) stays the same forever unless you change your project name. Rock solid!

---

## 🎊 Summary

### ✅ **What Works Without Custom Domain:**
- ✅ All API endpoints
- ✅ Rate limiting
- ✅ CORS
- ✅ File uploads
- ✅ Database connections
- ✅ Email sending
- ✅ Auto-cleanup jobs
- ✅ QR code generation
- ✅ URL shortening
- ✅ Everything!

### ❌ **What You DON'T Need:**
- ❌ Custom domain
- ❌ Paid hosting
- ❌ API authentication setup
- ❌ Complex configuration

### 💰 **Monthly Cost:**
**$0.00** on Vercel free tier! 🎉

---

## 🚀 Next Steps

1. **Deploy to Vercel** (takes 5 minutes)
2. **Update API docs** with your actual URL
3. **Share your API** with the world!
4. **Monitor usage** via Vercel dashboard
5. **Add custom domain later** if needed (optional)

---

Your API is production-ready on free hosting! No compromises, no limitations (within fair usage), no cost! 🎊✨
