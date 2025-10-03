# 🌐 TextShare - Share Everything, No Cap

A modern, ephemeral, and multi-utility content sharing platform.  
Share text, files, URLs, QR codes, and create bio link pages—all without signing up! 🚀

## 🚀 Live Project & Repository Stats

| **Live App** | **Source Code** |
|--------------|-----------------|
| [textshare.xyz](https://textshare.xyz) | [omdeshpande09012005/textshare](https://github.com/omdeshpande09012005/textshare) |

---

## ✨ Features (The Multi-Tool Utility)

TextShare consolidates multiple sharing needs into one clean, zero-friction interface:

- ✍️ **Text Sharing:** High-fidelity sharing of code snippets with syntax highlighting and markdown-formatted notes.
- 📁 **File Upload:** Supports file uploads (up to 10MB per file, 25MB total across all shares).
- 🔗 **URL Shortener:** Generate custom, clean short codes and view basic analytics.
- 🖼️ **QR Generator:** Instantly create customizable QR codes for any URL or text.
- 🌳 **LinkTree Alternative:** Create and manage modern, minimal bio link pages.
- 🔒 **Secure & Ephemeral:** Password protection, auto-expiry, and built-in rate limiting to maintain stability and privacy.

---

## 🛠️ Tech Stack & Architecture

This is a modern, high-performance, full-stack application leveraging the best tools for speed and scalability.

| Component | Technology | Role in Project |
|-----------|------------|-----------------|
| ⚡ Framework | Next.js 15.5.4 (TypeScript) | Frontend and API routes for optimal full-stack development and serverless deployment. |
| 🗄️ Database | PostgreSQL | Primary persistence layer for secure and reliable data storage. |
| 🔷 ORM | Prisma | Type-safe database access and streamlined schema management/migrations. |
| 🎨 Styling | Tailwind CSS | Utility-first styling for fast, responsive, and maintainable UI design. |
| 📧 External Service | Resend API | Reliable email delivery (e.g., admin/monitoring purposes). |

---

## ⚙️ Quick Start (Local Development)

Follow these steps to get TextShare running on your local machine.

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. **Clone the repository and install dependencies:**

```bash
git clone https://github.com/omdeshpande09012005/textshare.git
cd textshare
npm install
```

2. **Create your environment configuration file (`.env.local`):**

```env
DATABASE_URL="postgresql://user:password@host:5432/textshare"
RESEND_API_KEY="your_resend_api_key"
ADMIN_EMAIL="your-email@gmail.com"
```

3. **Setup the database schema using Prisma:**

```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server:**

```bash
npm run dev
```

Visit `http://localhost:3000` to start developing!

---

## ☁️ Deployment

TextShare is optimized for modern serverless deployment.

| Provider | Cost (Free Tier) | Guide |
|----------|------------------|-------|
| **Vercel** | $0 Monthly Cost | See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |

### Deployment Steps (Vercel)

1. Push your local repository to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the project.
3. Add your environment variables (especially `DATABASE_URL`).
4. Deploy!

---

## 🗄️ Public API

TextShare provides a simple API for seamless integration into other projects and workflows.

**Base URL:** `https://your-app.vercel.app/api`

| Method | Endpoint | Description | Example Payload |
|--------|----------|-------------|-----------------|
| **POST** | `/api/pastes` | Create a new text paste. | `{"content":"Hello","expiresIn":"7d"}` |
| **POST** | `/api/files` | Upload a new file (via FormData). | FormData with file content |
| **POST** | `/api/urls` | Shorten a long URL. | `{"url":"https://long-url.com"}` |

*See [API_FREE_HOSTING_GUIDE.md](./API_FREE_HOSTING_GUIDE.md) for more details on payload and responses.*

---

## 🛡️ Usage Limits & Stability

To ensure service stability and prevent abuse, the following limits are in place:

| Action | Limit |
|--------|-------|
| **API Requests** | 50 requests / 15 minutes |
| **File Uploads** | 10 uploads / hour |
| **Text Pastes** | 20 pastes / hour |
| **URL Shortening** | 30 URLs / hour |
| **Max File Size** | 10MB per file |
| **Max Text Size** | 500KB per paste |

---

## 📄 License

This project is licensed under the MIT License.

Copyright (c) 2025 Om Deshpande

---

**Made with ❤️ | Share Everything, No Cap**
