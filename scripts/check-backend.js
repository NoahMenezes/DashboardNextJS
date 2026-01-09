const http = require('http');

function checkBackend() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET',
      timeout: 2000,
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  console.log('\n🔍 Checking backend connection...\n');

  const isRunning = await checkBackend();

  if (isRunning) {
    console.log('✅ Backend is running on http://localhost:5000');
    console.log('✅ All systems ready!\n');
    process.exit(0);
  } else {
    console.log('❌ Backend is NOT running!\n');
    console.log('⚠️  Please start the backend server:\n');
    console.log('   Option 1: cd backend && npm start');
    console.log('   Option 2: pnpm run dev (starts both)\n');
    console.log('📝 The frontend will show connection errors until backend is running.\n');
    process.exit(1);
  }
}

main();
