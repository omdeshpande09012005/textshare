#  TextShare - Share Everything, No Cap

> A modern, ephemeral content sharing platform. Share text, files, URLs, QR codes, and create bio link pages - all without signing up!

##  Features

-  **Text Sharing** - Code snippets with syntax highlighting
-  **File Upload** - Up to 10MB per file, 25MB total
-  **URL Shortener** - Custom short codes + analytics
-  **QR Generator** - Customizable QR codes
-  **LinkTree** - Bio link pages
-  **Secure** - Password protection, auto-expiry, rate limiting

##  Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone and install:
```bash
git clone https://github.com/omdeshpande09012005/textshare.git
cd textshare
npm install
```

2. Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host:5432/textshare"
RESEND_API_KEY="your_resend_api_key"
ADMIN_EMAIL="your-email@gmail.com"
```

3. Setup database:
```bash
npx prisma generate
npx prisma db push
```

4. Run:
```bash
npm run dev
```

Visit `http://localhost:3000`

##  Deploy to Vercel (FREE)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)  Import Project
3. Add environment variables
4. Deploy!

**Monthly Cost:** $0 (Free tier)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for details.

##  API

Base URL: `https://your-app.vercel.app/api`

```bash
# Create paste
POST /api/pastes
{"content":"Hello","expiresIn":"7d"}

# Upload file  
POST /api/files
FormData with files

# Shorten URL
POST /api/urls
{"url":"https://long-url.com"}
```

See [API_FREE_HOSTING_GUIDE.md](./API_FREE_HOSTING_GUIDE.md)

##  Usage Limits

- 50 requests/15min
- 10 uploads/hour
- 20 pastes/hour
- 30 URLs/hour
- 10MB per file, 500KB text

##  Tech Stack

- Next.js 15.5.4 + TypeScript
- PostgreSQL + Prisma
- Tailwind CSS
- Resend API (emails)

##  License

MIT  Om Deshpande

---

**Made with  | Share Everything, No Cap** 
