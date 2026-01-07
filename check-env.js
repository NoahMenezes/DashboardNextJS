const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('Checking .env.local file...\n');
console.log('Expected path:', envPath);
console.log('File exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('\nFile content length:', content.length, 'bytes');
    console.log('\nFirst 200 characters:');
    console.log(content.substring(0, 200));
    console.log('\n---');
    
    // Try to parse it
    require('dotenv').config({ path: envPath, debug: true });
    
    console.log('\nEnvironment variables loaded:');
    console.log('TURSO_DATABASE_URL:', process.env.TURSO_DATABASE_URL ? '✅ Found' : '❌ Not found');
    console.log('TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN ? '✅ Found' : '❌ Not found');
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Found' : '❌ Not found');
} else {
    console.log('\n❌ .env.local file not found!');
    console.log('Please create it in the project root with your credentials.');
}
