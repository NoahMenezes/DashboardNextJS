const { db } = require('./db');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env.local'),
  silent: true,
});

console.log('\n🔍 Verifying Backend Setup...\n');

async function verifySetup() {
  const checks = {
    envVariables: false,
    databaseConnection: false,
    usersTable: false,
    blogsTable: false,
    userBlogsTable: false,
    seedData: false,
  };

  try {
    // Check 1: Environment Variables
    console.log('1️⃣  Checking environment variables...');
    const dbUrl = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const jwtSecret = process.env.JWT_SECRET;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;

    if (dbUrl && authToken && jwtSecret) {
      console.log('   ✅ Database URL: Present');
      console.log('   ✅ Auth Token: Present');
      console.log('   ✅ JWT Secret: Present');
      console.log('   ✅ Google Client ID:', googleClientId ? 'Present' : 'Not set (optional)');
      checks.envVariables = true;
    } else {
      console.log('   ❌ Missing required environment variables');
      console.log('      - TURSO_DATABASE_URL:', dbUrl ? '✅' : '❌');
      console.log('      - TURSO_AUTH_TOKEN:', authToken ? '✅' : '❌');
      console.log('      - JWT_SECRET:', jwtSecret ? '✅' : '❌');
      return checks;
    }

    // Check 2: Database Connection
    console.log('\n2️⃣  Testing database connection...');
    try {
      await db.execute('SELECT 1');
      console.log('   ✅ Database connection successful');
      checks.databaseConnection = true;
    } catch (err) {
      console.log('   ❌ Database connection failed:', err.message);
      return checks;
    }

    // Check 3: Users Table
    console.log('\n3️⃣  Checking users table...');
    try {
      const usersResult = await db.execute('SELECT COUNT(*) as count FROM users');
      const userCount = usersResult.rows[0].count;
      console.log(`   ✅ Users table exists (${userCount} users)`);
      checks.usersTable = true;
    } catch (err) {
      console.log('   ❌ Users table issue:', err.message);
    }

    // Check 4: Blogs Table
    console.log('\n4️⃣  Checking blogs table...');
    try {
      const blogsResult = await db.execute('SELECT COUNT(*) as count FROM blogs');
      const blogCount = blogsResult.rows[0].count;
      console.log(`   ✅ Blogs table exists (${blogCount} blogs)`);
      checks.blogsTable = true;
    } catch (err) {
      console.log('   ❌ Blogs table issue:', err.message);
    }

    // Check 5: User Blogs Table
    console.log('\n5️⃣  Checking user_blogs table...');
    try {
      const userBlogsResult = await db.execute('SELECT COUNT(*) as count FROM user_blogs');
      const userBlogCount = userBlogsResult.rows[0].count;
      console.log(`   ✅ User blogs table exists (${userBlogCount} user blogs)`);
      checks.userBlogsTable = true;
    } catch (err) {
      console.log('   ❌ User blogs table issue:', err.message);
    }

    // Check 6: Seed Data
    console.log('\n6️⃣  Checking seed data...');
    try {
      const adminUser = await db.execute({
        sql: 'SELECT * FROM users WHERE email = ?',
        args: ['admin@tailark.com']
      });

      if (adminUser.rows.length > 0) {
        console.log('   ✅ Admin user exists (admin@tailark.com)');
        checks.seedData = true;
      } else {
        console.log('   ⚠️  Admin user not found - run database initialization');
      }
    } catch (err) {
      console.log('   ❌ Seed data check failed:', err.message);
    }

    return checks;

  } catch (err) {
    console.error('\n❌ Verification failed:', err.message);
    return checks;
  }
}

async function testEndpoints() {
  console.log('\n\n🔌 Testing API Endpoints...\n');

  const endpoints = [
    { method: 'GET', path: '/api/blogs', description: 'Get all blogs' },
    { method: 'GET', path: '/api/users', description: 'Get all users' },
    { method: 'GET', path: '/api/user-blogs', description: 'Get user blogs' },
  ];

  console.log('   ℹ️  Note: These endpoints should be tested when server is running');
  console.log('   ℹ️  Start server with: npm start\n');

  endpoints.forEach(endpoint => {
    console.log(`   📡 ${endpoint.method} http://localhost:5000${endpoint.path}`);
    console.log(`      ${endpoint.description}\n`);
  });
}

async function showSummary(checks) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  const checksList = [
    { name: 'Environment Variables', status: checks.envVariables },
    { name: 'Database Connection', status: checks.databaseConnection },
    { name: 'Users Table', status: checks.usersTable },
    { name: 'Blogs Table', status: checks.blogsTable },
    { name: 'User Blogs Table', status: checks.userBlogsTable },
    { name: 'Seed Data', status: checks.seedData },
  ];

  checksList.forEach(check => {
    const icon = check.status ? '✅' : '❌';
    console.log(`${icon} ${check.name}`);
  });

  const totalChecks = checksList.length;
  const passedChecks = checksList.filter(c => c.status).length;
  const percentage = Math.round((passedChecks / totalChecks) * 100);

  console.log('\n' + '-'.repeat(60));
  console.log(`Result: ${passedChecks}/${totalChecks} checks passed (${percentage}%)`);
  console.log('-'.repeat(60) + '\n');

  if (passedChecks === totalChecks) {
    console.log('🎉 All checks passed! Your backend is ready to use.\n');
    console.log('Next steps:');
    console.log('  1. Start the backend: npm start');
    console.log('  2. Start the frontend: cd .. && pnpm run dev:next');
    console.log('  3. Or start both: cd .. && pnpm run dev\n');
  } else {
    console.log('⚠️  Some checks failed. Please review the errors above.\n');
    console.log('Common fixes:');
    console.log('  - Ensure .env.local exists in project root');
    console.log('  - Run: node db.js to initialize database');
    console.log('  - Check database credentials are correct\n');
  }
}

async function main() {
  const checks = await verifySetup();
  await testEndpoints();
  await showSummary(checks);

  process.exit(checks.databaseConnection ? 0 : 1);
}

main();
