# AgriScan Deployment Guide

This guide provides instructions for deploying the AgriScan application to production environments.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A server or cloud platform account (Vercel, Render, Heroku, etc.)

## Deployment Options

### Option 1: Deploy Frontend and Backend Separately

#### Frontend Deployment (Vercel)

1. **Build the frontend**
   ```bash
   cd frontend/agriscan-frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Push the code to a GitHub repository
   - Connect the repository to Vercel
   - Set the build command to `npm run build`
   - Set the output directory to `dist`
   - Set environment variables if needed

#### Backend Deployment (Render)

1. **Prepare for deployment**
   - Ensure all environment variables are set in the Render dashboard
   - Update the [env] file with production values

2. **Deploy to Render**
   - Push the code to a GitHub repository
   - Create a new Web Service on Render
   - Connect your repository
   - Set the build command to `npm install`
   - Set the start command to `npm start`
   - Add environment variables in the Render dashboard:
     - PORT=5000
     - NODE_ENV=production
     - OPENWEATHER_API_KEY=your_actual_api_key

### Option 2: Deploy as a Single Application

1. **Build the frontend**
   ```bash
   cd frontend/agriscan-frontend
   npm run build
   ```

2. **Copy the build to the backend**
   ```bash
   cp -r dist ../backend/public
   ```

3. **Deploy the backend**
   - The backend server already serves static files from the frontend build
   - Deploy the entire backend directory to your preferred platform

## Environment Variables

### Backend (.env file)
```
PORT=5000
NODE_ENV=production
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

To get an OpenWeatherMap API key:
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Generate an API key
4. Add it to your environment variables

## Database Integration (Optional)

For storing user submissions, you can integrate with MongoDB or Firebase:

### MongoDB Integration
1. Add MongoDB connection string to .env:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

2. Install MongoDB driver:
   ```bash
   cd backend
   npm install mongoose
   ```

3. Add database connection to server.js:
   ```javascript
   const mongoose = require('mongoose');
   
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   ```

### Firebase Integration
1. Add Firebase config to .env:
   ```
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

2. Install Firebase:
   ```bash
   cd backend
   npm install firebase-admin
   ```

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy AgriScan

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: cd frontend/agriscan-frontend && npm install
    - run: cd frontend/agriscan-frontend && npm run build
    # Add deployment steps for your platform
    
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: cd backend && npm install
    # Add deployment steps for your platform
```

## Monitoring and Logging

### Backend Logging
The application uses console.log for basic logging. For production, consider:

1. **Winston for advanced logging**
   ```bash
   cd backend
   npm install winston
   ```

2. **Add to server.js**:
   ```javascript
   const winston = require('winston');
   
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

### Error Tracking
Consider integrating with error tracking services:
- Sentry
- Rollbar
- Bugsnag

## Performance Optimization

### Frontend
1. **Code Splitting**: Implemented by default with Vite
2. **Image Optimization**: Use WebP format and responsive images
3. **Caching**: Implement browser caching strategies

### Backend
1. **Clustering**: Use PM2 for process management
2. **Caching**: Implement Redis for API response caching
3. **Database Indexing**: Properly index database collections

## Security Considerations

1. **CORS**: Configure allowed origins in production
2. **Rate Limiting**: Implement rate limiting for API endpoints
3. **Input Validation**: Validate all user inputs
4. **HTTPS**: Always use HTTPS in production
5. **Environment Variables**: Never commit sensitive data to version control

## Scaling

### Horizontal Scaling
- Use load balancers to distribute traffic
- Implement sticky sessions if needed
- Use Redis for session storage

### Database Scaling
- Implement database connection pooling
- Use read replicas for heavy read operations
- Consider database sharding for large datasets

## Backup and Recovery

1. **Database Backups**: Regular automated backups
2. **Code Backups**: Version control with Git
3. **Environment Variables**: Secure storage and rotation
4. **Disaster Recovery Plan**: Documented recovery procedures

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check allowed origins in backend CORS configuration
   - Ensure frontend and backend URLs match

2. **API Key Issues**
   - Verify API keys are correctly set in environment variables
   - Check API key permissions and quotas

3. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are installed

4. **Performance Issues**
   - Monitor server resources
   - Check database query performance
   - Implement caching where appropriate

### Monitoring Tools

1. **Application Performance Monitoring (APM)**
   - New Relic
   - Datadog
   - AppDynamics

2. **Log Management**
   - ELK Stack (Elasticsearch, Logstash, Kibana)
   - Splunk
   - Graylog

## Support

For issues and support:
- Email: support@agriscan.com
- GitHub Issues: [Repository Issues](https://github.com/yourusername/agriscan/issues)