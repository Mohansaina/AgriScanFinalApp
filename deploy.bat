@echo off
REM AgriScan Deployment Script for Windows

echo 🚀 Starting AgriScan Deployment...
echo ==================================

echo 🔍 Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

echo 📦 Installing deployment dependencies...
npm install vercel -g >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Failed to install Vercel CLI globally. You may need to run as administrator.
)

echo 🚀 Deploying AgriScan Application...
echo.

echo 🔧 Deploying Backend to Render...
echo    Note: You'll need to set up Render deployment manually through their dashboard
echo    using the render.yaml file in the project root.
echo.

echo 🎨 Deploying Frontend to Vercel...
cd frontend\agriscan-frontend
vercel deploy --prod
if %errorlevel% neq 0 (
    echo ⚠️  Vercel deployment failed or Vercel CLI not installed.
    echo    Please visit https://vercel.com/ to deploy manually.
)
cd ..\..

echo.
echo 📋 Deployment Summary:
echo ======================
echo Backend:  Deploy manually using render.yaml file with Render.com
echo Frontend: Deploy using Vercel CLI or dashboard
echo.
echo 📧 For support, contact: ruttalamohan23@gmail.com
echo.
echo 🎉 Deployment process completed!
pause