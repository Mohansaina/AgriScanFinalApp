# Deploy AgriScan to GitHub Pages

This guide will help you deploy your AgriScan application to GitHub Pages, making it accessible online directly from your GitHub repository.

## Prerequisites

1. GitHub account (ruttalamohan23@gmail.com)
2. Node.js installed on your computer
3. Git installed on your computer

## Deployment Steps

### 1. Prepare Your Repository

1. Ensure your code is pushed to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

### 2. Configure GitHub Pages in Repository Settings

1. Go to your GitHub repository: https://github.com/Mohansaina/AgriScanFinalApp
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. In "Source" section:
   - Select "GitHub Actions" from the dropdown
   - Click "Save"

### 3. Set Up GitHub Actions Workflow

Create a GitHub Actions workflow to automatically deploy your app:

1. In your repository, create a new file at `.github/workflows/deploy.yml`
2. Add the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: |
        cd frontend/agriscan-frontend
        npm install
        
    - name: Build
      run: |
        cd frontend/agriscan-frontend
        npm run build
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/agriscan-frontend/dist
        cname: ''
```

### 4. Alternative: Manual Deployment Using gh-pages

If you prefer to deploy manually from your computer:

1. Navigate to the frontend directory:
   ```bash
   cd frontend/agriscan-frontend
   ```

2. Install gh-pages package:
   ```bash
   npm install gh-pages --save-dev
   ```

3. Update package.json:
   Add these lines to your package.json:
   ```json
   {
     "homepage": "https://Mohansaina.github.io/AgriScanFinalApp",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### 5. Configure Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository Settings → Pages
2. In the "Custom domain" section, enter your domain
3. Follow GitHub's instructions for DNS configuration

## Access Your Deployed Application

After deployment is complete, your application will be available at:
```
https://Mohansaina.github.io/AgriScanFinalApp
```

## Important Notes

### Frontend-Backend Communication

Since GitHub Pages only serves static files, your frontend will need to communicate with a separately deployed backend. For the backend, you have these options:

1. **Render** (Recommended):
   - Visit https://dashboard.render.com/
   - Create a new Web Service
   - Connect to your GitHub repository
   - Set root directory to `backend`
   - Build command: `npm install`
   - Start command: `npm start`

2. **Heroku**:
   - Visit https://heroku.com/
   - Create a new app
   - Connect to GitHub
   - Enable automatic deploys

3. **Railway**:
   - Visit https://railway.app/
   - Create a new project
   - Connect to GitHub repository

### Environment Variables

After deploying your backend, update the frontend API URL:

1. In `frontend/agriscan-frontend/src/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: 'https://your-backend-url.com/api', // Replace with your actual backend URL
   });
   ```

2. Redeploy the frontend:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check the GitHub Actions logs
   - Ensure all dependencies are in package.json
   - Verify the build command is correct

2. **Page Not Found**:
   - Ensure GitHub Pages is enabled in repository settings
   - Check that the workflow completed successfully
   - Verify the publish directory is correct

3. **API Connection Issues**:
   - Ensure the backend URL is correct
   - Check CORS settings in the backend
   - Verify the backend is running

## Support

For deployment assistance:
- Email: ruttalamohan23@gmail.com
- GitHub Repository: https://github.com/Mohansaina/AgriScanFinalApp

## Next Steps

1. Deploy the frontend using GitHub Pages
2. Deploy the backend using Render/Heroku/Railway
3. Update the frontend API URL
4. Test the complete application
5. Share with users

Your AgriScan application will help farmers:
- Scan pesticide labels using OCR
- Calculate precise dosages
- Check weather conditions for safe spraying
- Join the waitlist for updates