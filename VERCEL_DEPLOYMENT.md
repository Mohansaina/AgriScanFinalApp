# Deploying AgriScan Frontend to Vercel

This guide provides detailed instructions for deploying the AgriScan frontend to Vercel.

## Prerequisites

1. A Vercel account (https://vercel.com)
2. A GitHub account
3. The AgriScan repository pushed to GitHub
4. Vercel CLI installed (optional but recommended)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Sign in to your Vercel account
2. Go to the Dashboard
3. Click "New Project"
4. Import the AgriScan repository from GitHub
5. Configure the project:
   - **Project Name**: `agriscan-frontend`
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend/agriscan-frontend`
   - **Build and Output Settings**:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend/agriscan-frontend
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to configure the deployment

### Option 3: Deploy via GitHub Actions (CI/CD)

Vercel automatically deploys when you push to your GitHub repository after the initial setup.

## Environment Variables

The frontend doesn't require environment variables for basic functionality. However, if you need to configure API endpoints:

1. In the Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add variables as needed:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

## Monitoring and Analytics

Vercel provides built-in monitoring:

1. **Real-time Logs**: View deployment logs in the dashboard
2. **Performance Analytics**: Monitor page load times and performance
3. **Error Tracking**: Automatic error detection and reporting

## Optimization Features

### Automatic Optimization

Vercel automatically optimizes your deployment:
- Image optimization
- Automatic HTTPS
- Global CDN distribution
- Serverless functions

### Manual Optimizations

1. **Caching**: Configure caching headers in `vercel.json`
2. **Compression**: Vercel automatically compresses assets
3. **Minification**: Vercel minifies CSS and JavaScript

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs for specific error messages
   - Ensure all dependencies are in package.json
   - Verify the build command is correct

2. **Routing Issues**
   - For SPA routing, add a rewrite rule to vercel.json:
     ```json
     {
       "rewrites": [
         { "source": "/(.*)", "destination": "/index.html" }
       ]
     }
     ```

3. **Asset Loading Problems**
   - Check that paths in your code are relative
   - Verify the output directory is set to `dist`

### Support

For Vercel-specific issues:
- Visit https://vercel.com/docs
- Contact Vercel support through the dashboard

For AgriScan-specific issues:
- Email: ruttalamohan23@gmail.com

## Post-Deployment Configuration

### Update Backend API URL

After deploying the backend, update the frontend to use the correct API URL:

1. In `frontend/agriscan-frontend/src/api.js`, update the baseURL:
   ```javascript
   const api = axios.create({
     baseURL: 'https://your-backend-url.onrender.com/api', // Use your actual Render URL
   });
   ```

2. Redeploy the frontend:
   ```bash
   cd frontend/agriscan-frontend
   vercel --prod
   ```

## Redeployment

To redeploy after making changes:

### Via Vercel Dashboard
1. Push changes to your GitHub repository
2. Vercel will automatically deploy the changes

### Via Vercel CLI
```bash
cd frontend/agriscan-frontend
vercel --prod
```

## Rollback

To rollback to a previous deployment:

1. Go to your project dashboard
2. Click "Deployments"
3. Find the deployment you want to rollback to
4. Click the "..." menu and select "Rollback"