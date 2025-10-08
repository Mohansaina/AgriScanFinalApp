#!/bin/bash

# AgriScan Deployment Script for Unix/Linux/macOS

echo "🚀 Starting AgriScan Deployment..."
echo "=================================="

echo "🔍 Checking Node.js installation..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo

echo "📦 Installing deployment dependencies..."
npm install vercel -g >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "⚠️  Failed to install Vercel CLI globally. You may need to use sudo."
fi

echo "🚀 Deploying AgriScan Application..."
echo

echo "🔧 Deploying Backend to Render..."
echo "   Note: You'll need to set up Render deployment manually through their dashboard"
echo "   using the render.yaml file in the project root."
echo

echo "🎨 Deploying Frontend to Vercel..."
cd frontend/agriscan-frontend
vercel deploy --prod
if [ $? -ne 0 ]; then
    echo "⚠️  Vercel deployment failed or Vercel CLI not installed."
    echo "   Please visit https://vercel.com/ to deploy manually."
fi
cd ../../

echo
echo "📋 Deployment Summary:"
echo "======================"
echo "Backend:  Deploy manually using render.yaml file with Render.com"
echo "Frontend: Deploy using Vercel CLI or dashboard"
echo
echo "📧 For support, contact: ruttalamohan23@gmail.com"
echo
echo "🎉 Deployment process completed!"