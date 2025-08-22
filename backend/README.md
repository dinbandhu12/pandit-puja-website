# Puja Website Backend API

This is the backend API for the Puja website, built with Express.js and PostgreSQL.

## Deployment on Railway

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository with this code

### Environment Variables
Set these in Railway dashboard:

```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
```

### Deployment Steps
1. Connect your GitHub repository to Railway
2. Select this backend folder as the root
3. Railway will auto-deploy using the railway.toml configuration
4. Set environment variables in Railway dashboard
5. Your API will be available at: https://your-app.railway.app

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single blog post
- `POST /api/admin/posts` - Create blog post (admin only)
- `PUT /api/admin/posts/:id` - Update blog post (admin only)
- `DELETE /api/admin/posts/:id` - Delete blog post (admin only)
- `POST /api/admin/login` - Admin login

### Database Schema
The application will automatically create the `posts` table with the following structure:
- id (SERIAL PRIMARY KEY)
- title (VARCHAR(255) NOT NULL)
- subtitle (VARCHAR(255))
- content (TEXT NOT NULL)
- tags (TEXT)
- links (TEXT)
- featured_image (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)