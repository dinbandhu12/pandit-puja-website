# Puja Website Backend API - Render Deployment

This is the backend API for the Puja website, built with Express.js and PostgreSQL, now configured for deployment on Render.

## Deployment on Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository with this code
- PostgreSQL database (can use Render's managed PostgreSQL)

### Environment Variables
Set these in Render dashboard under your service's "Environment" tab:

```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
```

### Deployment Steps

#### Option 1: Using render.yaml (Recommended)
1. Connect your GitHub repository to Render
2. Select "Blueprint" deployment
3. Render will automatically detect the `render.yaml` file
4. Set environment variables in Render dashboard
5. Deploy!

#### Option 2: Manual Setup
1. Go to Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `puja-blog-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
5. Set environment variables
6. Deploy!

### Database Setup
You can use Render's managed PostgreSQL:
1. Go to Render dashboard
2. Click "New +" → "PostgreSQL"
3. Choose a plan (Free tier available)
4. Copy the connection string to your `DATABASE_URL` environment variable

### Your API will be available at:
`https://puja-blog-backend.onrender.com` (or your custom domain)

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

### Migration from Railway
1. Deploy to Render using the steps above
2. Update your frontend's `VITE_API_URL` to point to your new Render URL
3. Test the new deployment
4. Once confirmed working, you can delete your Railway deployment

### Render vs Railway Comparison
- **Render**: Better free tier, more generous limits, easier setup
- **Railway**: More modern interface, faster deployments
- **Both**: Support PostgreSQL, automatic deployments, environment variables
