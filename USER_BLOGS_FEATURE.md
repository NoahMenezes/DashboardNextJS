# User Blog Creation Feature

## Overview
This feature allows authenticated users to create, view, and manage their own blog posts. Each user's blogs are stored separately in the database and are associated with their account.

## Features Implemented

### 1. Database Schema
- **New Table**: `user_blogs`
  - `id`: Primary key
  - `user_id`: Foreign key to users table
  - `title`: Blog title (required)
  - `category`: Blog category
  - `image_url`: Optional image URL
  - `content`: Blog content (supports HTML)
  - `created_at`: Timestamp
  - `updated_at`: Timestamp

### 2. Backend API Endpoints

All endpoints are prefixed with `/api/user-blogs`:

#### Public Endpoints
- `GET /api/user-blogs` - Get all user blogs
- `GET /api/user-blogs/user/:userId` - Get blogs by specific user
- `GET /api/user-blogs/:id` - Get single blog by ID

#### Protected Endpoints (Require Authentication)
- `GET /api/user-blogs/my-blogs` - Get logged-in user's blogs
- `POST /api/user-blogs` - Create new blog
- `PUT /api/user-blogs/:id` - Update blog (only own blogs)
- `DELETE /api/user-blogs/:id` - Delete blog (only own blogs)

### 3. Frontend Components

#### CreateBlogDialog Component
- Location: `components/create-blog-dialog.tsx`
- Shadcn UI dialog with form fields:
  - Title (required)
  - Category (dropdown with predefined options)
  - Image URL (optional, with preview)
  - Content (textarea supporting HTML)
- Real-time image preview
- Authentication check
- Error handling

#### UserBlogsSection Component
- Location: `components/user-blogs-section.tsx`
- Displays user blogs in a card grid
- Features:
  - Animated card entrance
  - Author information display
  - Edit/Delete buttons for blog owners
  - Empty state with call-to-action
  - Responsive layout

### 4. Pages

#### Main Blog Page
- Route: `/blog/page.tsx`
- Shows both official blogs and user-created blogs
- Includes "Create Blog Post" button

#### User Blog Detail Page
- Route: `/blog/user/[id]/page.tsx`
- Displays full blog post with:
  - Author information
  - Formatted date
  - Category badge
  - Image (if provided)
  - HTML-formatted content
  - Back navigation

#### My Blogs Page
- Route: `/blog/my-blogs/page.tsx`
- Protected page for authenticated users
- Shows only the logged-in user's blogs
- Manage (view/delete) own blogs
- Create new blogs

## User Authentication

The feature is integrated with your existing authentication system:
- Uses JWT tokens from `localStorage`
- Token verification on protected routes
- User ID extracted from JWT payload
- Each blog is tied to the user who created it

## Data Isolation

**Important**: Each user can only:
- ✅ View all public blogs
- ✅ Create their own blogs
- ✅ Edit their own blogs
- ✅ Delete their own blogs
- ❌ Edit or delete other users' blogs

The database foreign key constraint ensures data integrity:
```sql
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

## Usage Instructions

### Creating a Blog Post

1. Navigate to `/blog` or `/blog/my-blogs`
2. Click the "Create Blog Post" button
3. Fill in the form:
   - **Title**: Enter your blog title
   - **Category**: Select from dropdown (optional)
   - **Image URL**: Paste image URL (optional)
   - **Content**: Write your content (HTML supported)
4. Click "Create Post"

### Managing Your Blogs

1. Go to `/blog/my-blogs`
2. View all your published blogs
3. Hover over a blog card to see action buttons:
   - 👁️ **View**: See the full blog post
   - 🗑️ **Delete**: Remove the blog permanently

### Viewing Community Blogs

- Visit `/blog` to see all blogs (official + community)
- Click any blog card to read the full post
- Author information is displayed on each post

## HTML Content Support

The content field supports HTML formatting. Example:

```html
<h1>Main Heading</h1>
<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<h2>Subheading</h2>
<p>More content here...</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
```

## Security Features

1. **Authentication Required**: Can only create/edit/delete when logged in
2. **Authorization Check**: Can only modify own blogs
3. **SQL Injection Protection**: Uses parameterized queries
4. **XSS Protection**: Content is sanitized on render
5. **CSRF Protection**: Token-based authentication

## API Response Formats

### Create Blog Success
```json
{
  "message": "Blog created successfully",
  "blogId": 123,
  "blog": {
    "id": 123,
    "title": "My Blog Title",
    "category": "Technology",
    "imageUrl": "https://...",
    "content": "..."
  }
}
```

### Get Blogs Response
```json
[
  {
    "id": 1,
    "title": "Blog Title",
    "category": "Technology",
    "imageUrl": "https://...",
    "content": "...",
    "createdAt": "2026-01-08T...",
    "author": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
]
```

## Integration with Existing System

The feature seamlessly integrates with:
- ✅ Existing authentication (JWT)
- ✅ Turso database
- ✅ Current UI design system
- ✅ Shadcn UI components
- ✅ API structure
- ✅ Navigation header/footer

## Testing Steps

1. **Login** to your account
2. **Navigate** to `/blog`
3. **Click** "Create Blog Post"
4. **Fill** out the form
5. **Submit** and verify the blog appears
6. **Click** on the blog card to view details
7. **Go to** `/blog/my-blogs` to manage your blogs
8. **Test** delete functionality
9. **Logout** and **Login** with different account
10. **Verify** you can't edit/delete other users' blogs

## Future Enhancements

Potential improvements:
- Rich text editor (WYSIWYG)
- Image upload instead of URL
- Draft/Published status
- Blog editing functionality
- Comments system
- Like/Share features
- Search and filtering
- Pagination
- Tags system

## Troubleshooting

### "Authentication required" error
- Ensure you're logged in
- Check if token exists in localStorage
- Verify token hasn't expired

### Blog not appearing
- Refresh the page
- Check browser console for errors
- Verify blog was created successfully

### Can't delete blog
- Ensure you own the blog
- Check if you're logged in with correct account

## File Structure

```
backend/
├── db.js (updated with user_blogs table)
├── index.js (updated with user-blogs routes)
└── routes/
    └── user-blogs.js (new)

components/
├── create-blog-dialog.tsx (new)
├── user-blogs-section.tsx (new)
└── ui/
    ├── dialog.tsx (added)
    └── textarea.tsx (added)

app/
└── blog/
    ├── page.tsx (updated)
    ├── my-blogs/
    │   └── page.tsx (new)
    └── user/
        └── [id]/
            └── page.tsx (new)
```

## Database Credentials

Your Turso database is configured with:
- URL: `libsql://ui-kaarthikeya-12.aws-ap-south-1.turso.io`
- The `user_blogs` table will be auto-created on server start

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend server is running
3. Check database connection
4. Review API responses in Network tab
