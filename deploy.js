// Automated deployment script for AgriScan
// This script will deploy the application to Render (backend) and Vercel (frontend)

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting AgriScan deployment...');

// Function to execute shell commands
function executeCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    const options = cwd ? { cwd } : {};
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing command: ${command}`);
        console.error(stderr);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

// Deploy backend to Render
async function deployBackend() {
  console.log('🔧 Deploying backend to Render...');
  
  try {
    // Check if Render CLI is installed
    await executeCommand('render --version');
    
    // Deploy to Render
    console.log('📦 Deploying backend...');
    await executeCommand('render deploy', path.join(__dirname, 'backend'));
    
    console.log('✅ Backend deployment initiated successfully!');
    console.log('📝 Please check your Render dashboard for deployment status.');
  } catch (error) {
    console.log('ℹ️  Render CLI not found or deployment failed. Please deploy manually using the render.yaml file.');
    console.log('🔗 Visit https://dashboard.render.com/ to deploy manually.');
  }
}

// Deploy frontend to Vercel
async function deployFrontend() {
  console.log('🎨 Deploying frontend to Vercel...');
  
  try {
    // Check if Vercel CLI is installed
    await executeCommand('vercel --version');
    
    // Deploy to Vercel
    console.log('📦 Deploying frontend...');
    await executeCommand('vercel deploy --prod', path.join(__dirname, 'frontend', 'agriscan-frontend'));
    
    console.log('✅ Frontend deployment initiated successfully!');
    console.log('📝 Please check your Vercel dashboard for deployment status.');
  } catch (error) {
    console.log('ℹ️  Vercel CLI not found or deployment failed. Please deploy manually using the Vercel dashboard.');
    console.log('🔗 Visit https://vercel.com/ to deploy manually.');
  }
}

// Main deployment function
async function deploy() {
  try {
    console.log('📋 Checking deployment prerequisites...');
    
    // Check if required files exist
    const renderConfig = path.join(__dirname, 'render.yaml');
    const vercelConfig = path.join(__dirname, 'frontend', 'agriscan-frontend', 'vercel.json');
    
    if (!fs.existsSync(renderConfig)) {
      console.error('❌ Render configuration file not found!');
      return;
    }
    
    if (!fs.existsSync(vercelConfig)) {
      console.error('❌ Vercel configuration file not found!');
      return;
    }
    
    console.log('✅ All configuration files found.');
    
    // Deploy both frontend and backend
    await deployBackend();
    await deployFrontend();
    
    console.log('\n🎉 Deployment process completed!');
    console.log('📊 Please monitor your deployment dashboards for final status.');
    console.log('📧 You will receive email notifications when deployments are complete.');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
  }
}

// Run deployment
deploy();