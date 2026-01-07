#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Running pre-flight checks...\n');

let hasErrors = false;
let hasWarnings = false;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  log('📄 Checking .env.local file...', 'cyan');
  const envPath = path.join(__dirname, '..', '.env.local');

  if (!fs.existsSync(envPath)) {
    log('  ❌ .env.local file not found!', 'red');
    log('  ⚠️  Backend will not work without database credentials', 'yellow');
    log('  💡 Create .env.local file with your Turso credentials', 'yellow');
    hasWarnings = true;
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN'];
  const missingVars = [];

  requiredVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.match(new RegExp(`${varName}=\\s*$`, 'm'))) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    log(`  ⚠️  Missing or empty variables: ${missingVars.join(', ')}`, 'yellow');
    log('  💡 Add these to your .env.local file', 'yellow');
    hasWarnings = true;
    return false;
  }

  log('  ✅ .env.local configured correctly', 'green');
  return true;
}

function checkPorts() {
  log('\n🔌 Checking ports 3000 and 5000...', 'cyan');

  const ports = [3000, 5000];
  let portsInUse = [];

  ports.forEach(port => {
    try {
      if (process.platform === 'win32') {
        const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
        if (output) {
          portsInUse.push(port);
        }
      } else {
        execSync(`lsof -ti:${port}`, { encoding: 'utf8', stdio: 'pipe' });
        portsInUse.push(port);
      }
    } catch (e) {
      // Port is not in use (which is good)
    }
  });

  if (portsInUse.length > 0) {
    log(`  ⚠️  Ports in use: ${portsInUse.join(', ')}`, 'yellow');
    log('  💡 Run "npm run kill-ports" to free them up', 'yellow');
    hasWarnings = true;
    return false;
  }

  log('  ✅ Ports 3000 and 5000 are available', 'green');
  return true;
}

function checkNodeModules() {
  log('\n📦 Checking dependencies...', 'cyan');

  // Check root node_modules
  const rootNodeModules = path.join(__dirname, '..', 'node_modules');
  if (!fs.existsSync(rootNodeModules)) {
    log('  ❌ Root node_modules not found!', 'red');
    log('  💡 Run "pnpm install" or "npm install"', 'yellow');
    hasErrors = true;
    return false;
  }

  // Check backend node_modules
  const backendNodeModules = path.join(__dirname, '..', 'backend', 'node_modules');
  if (!fs.existsSync(backendNodeModules)) {
    log('  ❌ Backend node_modules not found!', 'red');
    log('  💡 Run "cd backend && npm install"', 'yellow');
    hasErrors = true;
    return false;
  }

  log('  ✅ All dependencies installed', 'green');
  return true;
}

function checkBackendFiles() {
  log('\n🔧 Checking backend files...', 'cyan');

  const requiredFiles = [
    'backend/index.js',
    'backend/db.js',
    'backend/package.json',
    'backend/routes/blogs.js',
  ];

  const missingFiles = [];

  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });

  if (missingFiles.length > 0) {
    log(`  ❌ Missing files: ${missingFiles.join(', ')}`, 'red');
    hasErrors = true;
    return false;
  }

  log('  ✅ All backend files present', 'green');
  return true;
}

function checkNextConfig() {
  log('\n⚙️  Checking Next.js configuration...', 'cyan');

  const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
  if (!fs.existsSync(nextConfigPath)) {
    log('  ❌ next.config.ts not found!', 'red');
    hasErrors = true;
    return false;
  }

  log('  ✅ Next.js configuration found', 'green');
  return true;
}

function printSummary() {
  console.log('\n' + '='.repeat(50));

  if (hasErrors) {
    log('❌ Pre-flight checks FAILED!', 'red');
    log('Please fix the errors above before starting the dev server.', 'yellow');
    console.log('='.repeat(50));
    process.exit(1);
  } else if (hasWarnings) {
    log('⚠️  Pre-flight checks completed with warnings', 'yellow');
    log('Your app may not work fully without addressing warnings.', 'yellow');
    console.log('='.repeat(50));
    console.log('');
  } else {
    log('✅ All checks passed!', 'green');
    log('Your development environment is ready.', 'green');
    console.log('='.repeat(50));
    console.log('');
  }
}

function printQuickCommands() {
  log('📝 Quick Commands:', 'cyan');
  log('  pnpm dev           - Start both frontend & backend', 'blue');
  log('  pnpm run dev:next  - Start frontend only (port 3000)', 'blue');
  log('  pnpm run dev:backend - Start backend only (port 5000)', 'blue');
  log('  pnpm run kill-ports - Kill processes on ports 3000 & 5000', 'blue');
  log('  pnpm build         - Build for production', 'blue');
  console.log('');
}

// Run all checks
function runChecks() {
  checkNodeModules();
  checkBackendFiles();
  checkNextConfig();
  checkEnvFile();
  checkPorts();

  printSummary();

  if (!hasErrors) {
    printQuickCommands();
  }
}

// Execute checks
runChecks();
