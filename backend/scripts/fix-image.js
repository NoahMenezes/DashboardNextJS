const { createClient } = require('@libsql/client');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });

const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

const db = createClient({
    url: url,
    authToken: authToken,
});

async function fixImage() {
    try {
        // Using a generic coding image that works
        const newImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
        const title = 'Software Development Practices in 2025 - A guide to improve your software workflows';

        await db.execute({
            sql: "UPDATE blogs SET image_url = ? WHERE title = ?",
            args: [newImage, title]
        });
        console.log("Image updated successfully.");
    } catch (err) {
        console.error("Failed to update image:", err);
    }
}

fixImage();
