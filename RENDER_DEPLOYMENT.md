# Deploying AgriScan Backend to Render

This guide provides detailed instructions for deploying the AgriScan backend to Render.

## Prerequisites

1. A Render account (https://render.com)
2. A GitHub account
3. The AgriScan repository pushed to GitHub

## Deployment Steps

### 1. Connect GitHub to Render

1. Sign in to your Render account
2. Go to the Dashboard
3. Click "New Web Service"
4. Connect your GitHub account when prompted
5. Select the AgriScan repository

### 2. Configure the Web Service

Fill in the following settings:

- **Name**: `agriscan-backend`
- **Environment**: `Node`
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Configure Environment Variables

In the "Environment Variables" section, add the following:

```
PORT=5000
NODE_ENV=production
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

To get an OpenWeatherMap API key:
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Generate an API key
4. Copy it to the OPENWEATHER_API_KEY variable

### 4. Advanced Settings

- **Instance Type**: Free (for testing) or Standard (for production)
- **Auto-Deploy**: Yes (recommended)

### 5. Deploy

Click "Create Web Service" to begin deployment.

## Monitoring Deployment

1. The deployment will start automatically
2. You can monitor progress in the "Logs" tab
3. Wait for the status to show "Live"
4. Note the URL provided by Render (e.g., `https://agriscan-backend.onrender.com`)

## Post-Deployment Configuration

### Update Frontend API URL

After deployment, update the frontend to use the Render URL:

1. In `frontend/agriscan-frontend/src/api.js`, update the baseURL:
   ```javascript
   const api = axios.create({
     baseURL: 'https://agriscan-backend.onrender.com/api', // Use your Render URL
   });
   ```

2. Rebuild and redeploy the frontend

### Environment Variables Management

For better security, you can manage environment variables directly in the Render dashboard:

1. Go to your web service dashboard
2. Click "Environment" in the sidebar
3. Add or update variables as needed

## Scaling Options

### Manual Scaling

1. Go to your web service dashboard
2. Click "Settings" in the sidebar
3. Under "Instance Count", adjust the number of instances

### Auto Scaling

Render automatically scales based on traffic. You can adjust settings in the "Performance" section.

## Custom Domain (Optional)

To use a custom domain:

1. Go to your web service dashboard
2. Click "Settings" in the sidebar
3. Scroll to "Custom Domains"
4. Add your domain
5. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the logs for specific error messages
   - Ensure all dependencies are in package.json
   - Verify the build command is correct

2. **Application Crashes**
   - Check runtime logs
   - Verify environment variables are set correctly
   - Ensure the PORT variable matches your code

3. **API Key Issues**
   - Confirm the OpenWeatherMap API key is valid
   - Check API key permissions and quotas

### Support

For Render-specific issues:
- Visit https://render.com/docs
- Contact Render support through the dashboard

For AgriScan-specific issues:
- Email: ruttalamohan23@gmail.com