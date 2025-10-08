// Verification Script for AgriScan Deployment Readiness
// This script checks if all necessary components are in place for deployment

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying AgriScan Deployment Readiness...\n');

// List of required files and directories
const requiredItems = [
  // Core application directories
  'frontend/agriscan-frontend',
  'backend',
  
  // Backend files
  'backend/server.js',
  'backend/package.json',
  'backend/.env',
  
  // Frontend files
  'frontend/agriscan-frontend/src/App.jsx',
  'frontend/agriscan-frontend/src/api.js',
  'frontend/agriscan-frontend/package.json',
  
  // Configuration files
  'render.yaml',
  'frontend/agriscan-frontend/vercel.json',
  
  // Documentation
  'README.md',
  'DEPLOYMENT.md',
  'RENDER_DEPLOYMENT.md',
  'VERCEL_DEPLOYMENT.md',
  'AUTOMATED_DEPLOYMENT_GUIDE.md',
  'DEPLOYMENT_STATUS.md'
];

// Optional but recommended files
const optionalItems = [
  'deploy.bat',
  'deploy.sh',
  'start.bat',
  'start.sh',
  'samples/pesticide_label_sample.txt'
];

let allRequiredPresent = true;
let presentCount = 0;
let totalCount = requiredItems.length;

console.log('📋 Checking Required Components:\n');

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
  console.log('✅ All required components are present!\n');
} else {
  console.log('❌ Some required components are missing!\n');
}

console.log('📋 Checking Optional Components:\n');

// Check optional items
let optionalPresent = 0;
let optionalTotal = optionalItems.length;

for (const item of optionalItems) {
  const fullPath = path.join(__dirname, item);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${item}`);
    optionalPresent++;
  } else {
    console.log(`⚠️  ${item} (Not found, but not critical)`);
  }
}

console.log(`\n📊 Optional Components: ${optionalPresent}/${optionalTotal}`);

// Final assessment
console.log('\n' + '='.repeat(50));
if (allRequiredPresent) {
  console.log('🎉 DEPLOYMENT READY!');
  console.log('The AgriScan application is fully prepared for deployment.');
  console.log('Follow the instructions in AUTOMATED_DEPLOYMENT_GUIDE.md to go live.');
} else {
  console.log('⚠️  DEPLOYMENT NOT READY');
  console.log('Some required components are missing.');
  console.log('Please check the missing items above.');
}
console.log('='.repeat(50));

// Deployment instructions
console.log('\n🚀 Next Steps:');
console.log('1. Visit https://vercel.com/dashboard to deploy the frontend');
console.log('2. Visit https://dashboard.render.com/ to deploy the backend');
console.log('3. Follow the detailed instructions in AUTOMATED_DEPLOYMENT_GUIDE.md');
console.log('4. Contact ruttalamohan23@gmail.com for any deployment issues');

console.log('\n📧 Support: ruttalamohan23@gmail.com');