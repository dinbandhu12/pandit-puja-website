# Complete Render Deployment Guide

## Step-by-Step Process to Deploy on Render Website

### **Step 1: Create Render Account**
1. Go to [https://render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email
4. Verify your email if using email signup

### **Step 2: Connect GitHub Repository**
1. After login, click "New +" in the top right
2. Select "Blueprint" from the dropdown
3. You'll see "Connect a repository" - click it
4. Authorize Render to access your GitHub repositories
5. Find and select your `puja-website` repository
6. Click "Connect"

### **Step 3: Configure Blueprint Deployment**
1. Render will detect your `backend/render.yaml` file
2. You'll see a preview of your service configuration
3. Review the settings:
   - **Service Name**: `puja-blog-backend` (or change if needed)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`

### **Step 4: Set Environment Variables**
1. In the deployment configuration, scroll down to "Environment Variables"
2. Click "Add Environment Variable" for each:
   
   **Required Variables:**
   ```
   NODE_ENV = production
   DATABASE_URL = your-postgresql-connection-string
   FRONTEND_URL = https://your-frontend-domain.vercel.app
   ADMIN_USERNAME = your-admin-username
   ADMIN_PASSWORD = your-secure-password
   ```

3. For `DATABASE_URL`, you have two options:
   
   **Option A: Use Render's Managed PostgreSQL**
   - Click "New +" → "PostgreSQL"
   - Choose "Free" plan
   - Copy the connection string
   - Paste it as `DATABASE_URL`
   
   **Option B: Use External Database**
   - Use your existing database connection string
   - Format: `postgresql://username:password@host:port/database?sslmode=require`

### **Step 5: Deploy**
1. Click "Apply" at the bottom
2. Render will start building your application
3. You'll see build logs in real-time
4. Wait for deployment to complete (usually 2-5 minutes)

### **Step 6: Get Your API URL**
1. Once deployed, you'll see your service dashboard
2. Your API URL will be: `https://puja-blog-backend.onrender.com`
3. Test it by visiting: `https://puja-blog-backend.onrender.com/api/health`
4. You should see: `{"status":"OK","timestamp":"..."}`

### **Step 7: Update Frontend Configuration**
1. Go to your frontend project
2. Update `frontend/env.local`:
   ```bash
   # Comment out local development URL
   # VITE_API_URL=http://localhost:3001/api
   
   # Uncomment and update with your Render URL
   VITE_API_URL=https://puja-blog-backend.onrender.com/api
   ```

3. If deploying frontend to production, set the environment variable in your frontend hosting platform (Vercel/Netlify)

### **Step 8: Test Your Deployment**
1. Visit your frontend website
2. Check if blog posts are loading
3. Test admin login functionality
4. Try creating/editing blog posts

### **Step 9: Monitor Your Service**
1. In Render dashboard, you can:
   - View logs
   - Monitor performance
   - Check health status
   - View metrics

### **Step 10: Clean Up Railway (Optional)**
1. Once everything works on Render
2. Go to your Railway dashboard
3. Delete the old backend service
4. This will save you from paying for unused services

## **Troubleshooting Common Issues**

### **Build Fails**
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### **Database Connection Issues**
- Double-check `DATABASE_URL` format
- Ensure database allows connections from Render's IPs
- Check if SSL is required

### **CORS Issues**
- Verify `FRONTEND_URL` is set correctly
- Check if your frontend domain matches exactly

### **Health Check Fails**
- Ensure `/api/health` endpoint is working
- Check if server starts properly
- Review application logs

## **Render Dashboard Features**

### **Service Management**
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, response times
- **Settings**: Environment variables, scaling
- **Deployments**: Deploy history and rollback

### **Free Tier Limits**
- **750 hours/month** of service time
- **512MB RAM** per service
- **Sleep after 15 minutes** of inactivity
- **Cold start** takes ~30 seconds after sleep

### **Upgrading (Optional)**
- **Starter Plan**: $7/month - No sleep, more resources
- **Standard Plan**: $25/month - Better performance
- **Pro Plan**: $85/month - Production-grade features

## **Success Indicators**
✅ Service shows "Live" status  
✅ Health check returns 200 OK  
✅ Frontend can fetch blog posts  
✅ Admin login works  
✅ Blog CRUD operations function  

Your backend is now successfully deployed on Render! 🎉
