const express = require('express');
const router = express.Router();
const { db } = require('../db');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const result = await db.execute("SELECT * FROM blogs ORDER BY created_at DESC");
        const blogs = result.rows.map(blog => ({
            id: blog.id,
            title: blog.title,
            category: blog.category,
            date: blog.date,
            readTime: blog.read_time,
            image: blog.image_url,
            // We might not send content here to save bandwidth if it's large, but for simplicity sending all
        }));
        res.json(blogs);
    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.execute({
            sql: "SELECT * FROM blogs WHERE id = ?",
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        const blog = result.rows[0];
        res.json({
            id: blog.id,
            title: blog.title,
            category: blog.category,
            date: blog.date,
            readTime: blog.read_time,
            image: blog.image_url,
            content: blog.content
        });
    } catch (err) {
        console.error("Error fetching blog post:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create new blog post
router.post('/', async (req, res) => {
    const { title, category, imageUrl, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        // Generate current date and read time
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const wordCount = content.split(/\s+/).length;
        const readTime = `${Math.ceil(wordCount / 200)} min read`;

        const result = await db.execute({
            sql: `INSERT INTO blogs (title, category, date, read_time, image_url, content) 
                  VALUES (?, ?, ?, ?, ?, ?) RETURNING id`,
            args: [
                title,
                category || 'General',
                currentDate,
                readTime,
                imageUrl || '',
                content
            ]
        });

        const blogId = result.rows[0].id;

        res.status(201).json({
            message: 'Blog created successfully',
            blogId: blogId,
            blog: {
                id: blogId,
                title,
                category: category || 'General',
                date: currentDate,
                readTime,
                image: imageUrl || '',
                content
            }
        });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
