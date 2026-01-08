const express = require('express');
const router = express.Router();
const { db } = require('../db');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Authentication required' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Get all user blogs (public - anyone can view)
router.get('/', async (req, res) => {
    try {
        const result = await db.execute(`
            SELECT 
                ub.id,
                ub.title,
                ub.category,
                ub.image_url,
                ub.content,
                ub.created_at,
                u.id as author_id,
                u.first_name,
                u.last_name,
                u.email
            FROM user_blogs ub
            JOIN users u ON ub.user_id = u.id
            ORDER BY ub.created_at DESC
        `);

        const blogs = result.rows.map(blog => ({
            id: blog.id,
            title: blog.title,
            category: blog.category || 'User Post',
            imageUrl: blog.image_url,
            content: blog.content,
            createdAt: blog.created_at,
            author: {
                id: blog.author_id,
                firstName: blog.first_name,
                lastName: blog.last_name,
                email: blog.email
            }
        }));

        res.json(blogs);
    } catch (err) {
        console.error('Error fetching user blogs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get blogs by specific user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await db.execute({
            sql: `
                SELECT 
                    ub.id,
                    ub.title,
                    ub.category,
                    ub.image_url,
                    ub.content,
                    ub.created_at,
                    u.first_name,
                    u.last_name
                FROM user_blogs ub
                JOIN users u ON ub.user_id = u.id
                WHERE ub.user_id = ?
                ORDER BY ub.created_at DESC
            `,
            args: [userId]
        });

        const blogs = result.rows.map(blog => ({
            id: blog.id,
            title: blog.title,
            category: blog.category || 'User Post',
            imageUrl: blog.image_url,
            content: blog.content,
            createdAt: blog.created_at,
            author: {
                firstName: blog.first_name,
                lastName: blog.last_name
            }
        }));

        res.json(blogs);
    } catch (err) {
        console.error('Error fetching user blogs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get my blogs (authenticated user's blogs)
router.get('/my-blogs', authenticateToken, async (req, res) => {
    try {
        const result = await db.execute({
            sql: `
                SELECT 
                    id,
                    title,
                    category,
                    image_url,
                    content,
                    created_at,
                    updated_at
                FROM user_blogs
                WHERE user_id = ?
                ORDER BY created_at DESC
            `,
            args: [req.user.id]
        });

        const blogs = result.rows.map(blog => ({
            id: blog.id,
            title: blog.title,
            category: blog.category || 'User Post',
            imageUrl: blog.image_url,
            content: blog.content,
            createdAt: blog.created_at,
            updatedAt: blog.updated_at
        }));

        res.json(blogs);
    } catch (err) {
        console.error('Error fetching my blogs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.execute({
            sql: `
                SELECT 
                    ub.id,
                    ub.title,
                    ub.category,
                    ub.image_url,
                    ub.content,
                    ub.created_at,
                    u.id as author_id,
                    u.first_name,
                    u.last_name,
                    u.email
                FROM user_blogs ub
                JOIN users u ON ub.user_id = u.id
                WHERE ub.id = ?
            `,
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const blog = result.rows[0];
        res.json({
            id: blog.id,
            title: blog.title,
            category: blog.category || 'User Post',
            imageUrl: blog.image_url,
            content: blog.content,
            createdAt: blog.created_at,
            author: {
                id: blog.author_id,
                firstName: blog.first_name,
                lastName: blog.last_name,
                email: blog.email
            }
        });
    } catch (err) {
        console.error('Error fetching blog post:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new blog (authenticated)
router.post('/', authenticateToken, async (req, res) => {
    const { title, category, imageUrl, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = await db.execute({
            sql: `
                INSERT INTO user_blogs (user_id, title, category, image_url, content)
                VALUES (?, ?, ?, ?, ?)
                RETURNING id
            `,
            args: [
                req.user.id,
                title,
                category || 'User Post',
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
                category: category || 'User Post',
                imageUrl: imageUrl || '',
                content
            }
        });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update blog (authenticated, only own blogs)
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, category, imageUrl, content } = req.body;

    try {
        // Check if blog exists and belongs to user
        const existing = await db.execute({
            sql: 'SELECT * FROM user_blogs WHERE id = ? AND user_id = ?',
            args: [id, req.user.id]
        });

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found or unauthorized' });
        }

        await db.execute({
            sql: `
                UPDATE user_blogs
                SET title = ?, category = ?, image_url = ?, content = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ? AND user_id = ?
            `,
            args: [
                title || existing.rows[0].title,
                category || existing.rows[0].category,
                imageUrl !== undefined ? imageUrl : existing.rows[0].image_url,
                content || existing.rows[0].content,
                id,
                req.user.id
            ]
        });

        res.json({ message: 'Blog updated successfully' });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete blog (authenticated, only own blogs)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.execute({
            sql: 'DELETE FROM user_blogs WHERE id = ? AND user_id = ?',
            args: [id, req.user.id]
        });

        if (result.rowsAffected === 0) {
            return res.status(404).json({ error: 'Blog not found or unauthorized' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
