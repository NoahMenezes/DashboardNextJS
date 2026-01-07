const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!url) {
    console.error("Error: DATABASE_URL is not defined in .env.local");
}

const db = createClient({
    url: url,
    authToken: authToken,
});

async function initDb() {
    try {
        await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await db.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        date TEXT,
        read_time TEXT,
        image_url TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Seed Users
        const usersCount = await db.execute("SELECT COUNT(*) as count FROM users");
        if (usersCount.rows[0].count === 0) {
            console.log("Seeding initial users data...");
            const hashedPassword = await bcrypt.hash('password123', 10);
            const seedUsers = [
                ['John', 'Doe', 'john@example.com', hashedPassword],
                ['Jane', 'Smith', 'jane@example.com', hashedPassword],
                ['Admin', 'User', 'admin@tailark.com', hashedPassword]
            ];
            for (const user of seedUsers) {
                await db.execute({
                    sql: "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
                    args: user
                });
            }
            console.log("Database seeded with users.");
        }

        // Seed Blogs
        const blogsCount = await db.execute("SELECT COUNT(*) as count FROM blogs");
        if (blogsCount.rows[0].count === 0) {
            console.log("Seeding initial blogs data...");
            const blogPosts = [
                {
                    title: 'How to Choose the Right Tech Stack for Your Web Application in 2025',
                    category: 'Startups',
                    date: 'April 4, 2025',
                    readTime: '4 mins read',
                    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
                    content: '<h1>Choosing the Right Tech Stack</h1><p>In 2025, the landscape of web development has evolved...</p><p>Consider factors like scalability, community support, and performance.</p>'
                },
                {
                    title: 'Software Development Practices in 2025 - A guide to improve your software workflows',
                    category: 'Development',
                    date: 'April 3, 2025',
                    readTime: '4 mins read',
                    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcbb9f8?q=80&w=1000&auto=format&fit=crop',
                    content: '<h1>Software Development Best Practices</h1><p>Agile, DevOps, and CI/CD are more critical than ever.</p>'
                },
                {
                    title: 'Modern Tech Services: Transforming Businesses for the Digital Age',
                    category: 'Technology',
                    date: 'April 3, 2025',
                    readTime: '4 mins read',
                    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
                    content: '<h1>Digital Transformation</h1><p>How modern services are reshaping traditional business models.</p>'
                },
                {
                    title: 'The Future of AI in SaaS: What to Expect in the Coming Decade',
                    category: 'AI & Trends',
                    date: 'April 2, 2025',
                    readTime: '6 mins read',
                    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
                    content: '<h1>AI in SaaS</h1><p>Artificial Intelligence is becoming the backbone of Software as a Service...</p>'
                },
                {
                    title: 'Designing for the Unknown: UI Trends that will Define 2026',
                    category: 'Design',
                    date: 'April 1, 2025',
                    readTime: '5 mins read',
                    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
                    content: '<h1>UI Trends for 2026</h1><p>Glassmorphism, Neomorphism, and beyond. Preparing for the next wave of design.</p>'
                }
            ];

            for (const post of blogPosts) {
                await db.execute({
                    sql: "INSERT INTO blogs (title, category, date, read_time, image_url, content) VALUES (?, ?, ?, ?, ?, ?)",
                    args: [post.title, post.category, post.date, post.readTime, post.image, post.content]
                });
            }
            console.log("Database seeded with blogs.");
        }

        console.log("Database initialized.");
    } catch (err) {
        console.error("Database initialization/seeding failed:", err);
    }
}

module.exports = { db, initDb };
