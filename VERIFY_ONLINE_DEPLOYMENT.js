// Verification Script for Online Deployment Readiness
// This script checks if all necessary components are in place for GitHub Pages deployment

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying AgriScan Online Deployment Readiness...\n');

// List of required files and directories for GitHub Pages deployment
const requiredItems = [
  // Core application directories
  'frontend/agriscan-frontend',
  'backend',
  
  // GitHub Actions workflow
  '.github/workflows/deploy.yml',
  
  // Frontend configuration
  'frontend/agriscan-frontend/package.json',
  
  // Deployment scripts
  'deploy-github.bat',
  'deploy-github.sh',
  
  // Documentation
  'GITHUB_DEPLOYMENT_GUIDE.md',
  'ONLINE_DEPLOYMENT_STATUS.md'
];

// Backend files (for completeness)
const backendItems = [
  'backend/server.js',
  'backend/package.json',
  'backend/.env'
];

let allRequiredPresent = true;
let presentCount = 0;
let totalCount = requiredItems.length;

console.log('📋 Checking Required Components for GitHub Pages Deployment:\n');

// Check required items
for (const item of requiredItems) {
  const fullPath = path.join(__dirname, item);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${item}`);
    presentCount++;
  } else {
    console.log(`❌ ${item} (MISSING)`);
    allRequiredPresent = false;
  }
}

console.log(`\n📊 Required Components: ${presentCount}/${totalCount}`);

if (allRequiredPresent) {
  console.log('✅ All required components for GitHub Pages deployment are present!\n');
} else {
  console.log('❌ Some required components for GitHub Pages deployment are missing!\n');
}

console.log('📋 Checking Backend Components:\n');

// Check backend items
let backendPresent = 0;
let backendTotal = backendItems.length;

for (const item of backendItems) {
  const fullPath = path.join(__dirname, item);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${item}`);
    backendPresent++;
  } else {
    console.log(`❌ ${item} (MISSING)`);
  }
}

console.log(`\n📊 Backend Components: ${backendPresent}/${backendTotal}`);

// Check package.json configuration
console.log('\n📋 Checking Frontend Configuration:\n');

try {
  const packageJsonPath = path.join(__dirname, 'frontend', 'agriscan-frontend', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.homepage) {
    console.log(`✅ Homepage configured: ${packageJson.homepage}`);
  } else {
    console.log('❌ Homepage not configured in package.json');
  }
  
  if (packageJson.scripts && packageJson.scripts.predeploy && packageJson.scripts.deploy) {
    console.log('✅ Deploy scripts configured');
  } else {
    console.log('❌ Deploy scripts not configured in package.json');
  }
  
  if (packageJson.devDependencies && packageJson.devDependencies['gh-pages']) {
    console.log('✅ gh-pages dependency installed');
  } else {
    console.log('❌ gh-pages dependency not found');
  }
} catch (error) {
  console.log('❌ Error checking package.json configuration');
}

// Final assessment
console.log('\n' + '='.repeat(60));
if (allRequiredPresent) {
  console.log('🎉 ONLINE DEPLOYMENT READY!');
  console.log('The AgriScan application is fully prepared for GitHub Pages deployment.');
  console.log('Follow the instructions in ONLINE_DEPLOYMENT_STATUS.md to go live.');
} else {
  console.log('⚠️  ONLINE DEPLOYMENT NOT READY');
  console.log('Some required components are missing.');
  console.log('Please check the missing items above.');
}
console.log('='.repeat(60));

// Deployment instructions
console.log('\n🚀 Next Steps:');
console.log('1. Enable GitHub Pages in your repository settings');
console.log('2. Push any change to trigger automatic deployment');
console.log('3. Visit https://Mohansaina.github.io/AgriScanFinalApp after deployment');
console.log('4. Deploy backend separately using Render/Heroku/Railway');

console.log('\n📧 Support: ruttalamohan23@gmail.com');