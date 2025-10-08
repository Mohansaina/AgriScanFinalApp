#!/bin/bash

# AgriScan GitHub Pages Deployment Script for Unix/Linux/macOS

echo "🚀 Starting AgriScan Deployment to GitHub Pages..."
echo "================================================="

echo "🔍 Checking prerequisites..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

if ! command -v git &> /dev/null
then
    echo "❌ Git not found. Please install Git first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo

echo "📁 Navigating to frontend directory..."
cd frontend/agriscan-frontend

echo "📦 Installing gh-pages package..."
npm install gh-pages --save-dev

echo "🔧 Updating package.json..."
echo "This step requires manual editing of package.json:"
echo "1. Add this line to the top level: \"homepage\": \"https://Mohansaina.github.io/AgriScanFinalApp\""
echo "2. Add these lines to \"scripts\":"
echo "   \"predeploy\": \"npm run build\""
echo "   \"deploy\": \"gh-pages -d dist\""
echo

echo "🔨 Building the application..."
npm run build

echo "🚀 Deploying to GitHub Pages..."
echo "To complete deployment:"
echo "1. Manually add the homepage and script entries to package.json"
echo "2. Run: npm run deploy"
echo

echo "📋 Next steps:"
echo "1. Visit your repository settings at https://github.com/Mohansaina/AgriScanFinalApp"
echo "2. Go to Settings > Pages"
echo "3. Select \"GitHub Actions\" as the source"
echo "4. Your site will be available at https://Mohansaina.github.io/AgriScanFinalApp"
echo

echo "🎉 Frontend deployment preparation complete!"
echo "For backend deployment, visit https://dashboard.render.com/ or contact support at ruttalamohan23@gmail.com"