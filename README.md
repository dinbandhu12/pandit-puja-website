# 🕉️ Puja Website - Spiritual Blog Platform

A beautiful, modern spiritual blog website built with React and Node.js, dedicated to Hindu traditions, puja procedures, and spiritual wisdom.

## 🌟 Features

- **Beautiful Blog Interface** with modern design
- **Rich Text Editor** with drag-and-drop image upload
- **Admin Dashboard** for content management
- **Featured Images** with hero banners
- **Responsive Design** for all devices
- **SEO Optimized** blog posts
- **Simple Admin Authentication**

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + PostgreSQL
- **Database**: Neon PostgreSQL (serverless)
- **Styling**: Tailwind CSS + shadcn/ui components

## 📁 Project Structure

```
puja-website/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   └── services/   # API services
│   └── public/         # Static assets
└── backend/           # Node.js backend
    ├── server.js      # Main server file
    └── package.json   # Dependencies
```

## 🚀 Deployment

### Backend (Railway)
- Deployed on Railway
- PostgreSQL database on Neon
- Auto-deploys from GitHub

### Frontend (Vercel)
- Deployed on Vercel
- Custom domain support
- Auto-deploys from GitHub

## 🛠️ Local Development

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Admin Access

- Navigate to `/admin-login`
- Default credentials: `admin` / `admin`
- Access admin dashboard at `/admin-blog-page`

*Built with ❤️ for the spiritual community*
