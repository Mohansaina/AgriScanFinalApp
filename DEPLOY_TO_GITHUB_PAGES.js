// Alternative Deployment Script for GitHub Pages
// This script will help deploy the frontend to GitHub Pages as an alternative to Vercel

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting AgriScan Deployment to GitHub Pages...\n');

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

// Deploy frontend to GitHub Pages
async function deployToFrontend() {
  console.log('🎨 Deploying Frontend to GitHub Pages...');
  
  try {
    // Navigate to frontend directory
    const frontendPath = path.join(__dirname, 'frontend', 'agriscan-frontend');
    
    // Install gh-pages package if not already installed
    console.log('📦 Installing gh-pages...');
    await executeCommand('npm install gh-pages --save-dev', frontendPath);
    
    // Update package.json with deploy scripts
    const packageJsonPath = path.join(frontendPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add homepage property
    packageJson.homepage = "https://Mohansaina.github.io/AgriScanFinalApp";
    
    // Add deploy scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    };
    
    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    console.log('✅ Updated package.json with GitHub Pages configuration');
    
    // Build the frontend
    console.log('🔨 Building frontend...');
    await executeCommand('npm run build', frontendPath);
    
    // Deploy to GitHub Pages
    console.log('🚀 Deploying to GitHub Pages...');
    await executeCommand('npm run deploy', frontendPath);
    
    console.log('✅ Frontend deployment to GitHub Pages initiated successfully!');
    console.log('📝 Please check your GitHub repository settings for GitHub Pages configuration.');
    console.log('🔗 Your app will be available at: https://Mohansaina.github.io/AgriScanFinalApp');
    
    return true;
  } catch (error) {
    console.log('❌ GitHub Pages deployment failed:', error.message);
    console.log('ℹ️  You may need to configure GitHub Pages in your repository settings manually.');
    return false;
  }
}

// Deploy backend using a different approach
async function deployBackendAlternative() {
  console.log('🔧 Deploying Backend...');
  
  try {
    console.log('📝 For backend deployment, you have these options:');
    console.log('1. Use Render (recommended): https://dashboard.render.com/');
    console.log('2. Use Heroku: https://heroku.com/');
    console.log('3. Use Railway: https://railway.app/');
    console.log('4. Contact support at ruttalamohan23@gmail.com for assistance');
    
    return true;
  } catch (error) {
    console.log('❌ Backend deployment information provided.');
    return false;
  }
}

// Main deployment function
async function deploy() {
  try {
    console.log('📋 Checking deployment prerequisites...');
    
    // Check if required directories exist
    const frontendDir = path.join(__dirname, 'frontend', 'agriscan-frontend');
    const backendDir = path.join(__dirname, 'backend');
    
    if (!fs.existsSync(frontendDir)) {
      console.error('❌ Frontend directory not found!');
      return;
    }
    
    if (!fs.existsSync(backendDir)) {
      console.error('❌ Backend directory not found!');
      return;
    }
    
    console.log('✅ All required directories found.');
    
    // Deploy frontend to GitHub Pages
    const frontendSuccess = await deployToFrontend();
    
    // Provide backend deployment information
    const backendSuccess = await deployBackendAlternative();
    
    console.log('\n🎉 Deployment process completed!');
    console.log('📊 Summary:');
    console.log(`   Frontend: ${frontendSuccess ? '✅ Initiated' : '❌ Failed'}`);
    console.log(`   Backend: ℹ️  Information provided`);
    console.log('\n📧 For support, contact: ruttalamohan23@gmail.com');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
  }
}

// Run deployment
deploy();