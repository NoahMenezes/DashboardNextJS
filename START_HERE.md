# 🚀 Dashboard Project - Quick Start Guide

Welcome! This guide will help you get your dashboard running in minutes.

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (npm install -g pnpm)
- **Git**

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
pnpm install
cd backend
npm install
cd ..
```

### Step 2: Verify Environment Variables

Your `.env.local` file is already configured with:
- ✅ Turso Database URL
- ✅ Turso Auth Token
- ✅ Google OAuth Credentials
- ✅ JWT Secret

**File location:** `dashboardtsx/.env.local`

### Step 3: Start the Application

```bash
pnpm run dev
```

This single command will start:
- 🔵 **Frontend** (Next.js) on `http://localhost:3000`
- 🟢 **Backend** (Express) on `http://localhost:5000`

## 🎉 You're Ready!

Open your browser and navigate to:
```
http://localhost:3000
```

## 📡 API Endpoints Reference

### Health Check
- **GET** `http://localhost:5000/health` - Server health status
- **GET** `http://localhost:5000/api/health` - API and database health

### Authentication
- **POST** `/api/signup` - Create new user account
- **POST** `/api/login` - Login with email/password
- **POST** `/api/auth/google` - Google OAuth login
- **GET** `/api/me` - Get current user (requires auth)
- **GET** `/api/users` - Get all users

### Blogs (Admin/Public)
- **GET** `/api/blogs` - Get all blogs
- **GET** `/api/blogs/:id` - Get single blog by ID
- **POST** `/api/blogs` - Create new blog (admin only)
- **PUT** `/api/blogs/:id` - Update blog (admin only)
- **DELETE** `/api/blogs/:id` - Delete blog (admin only)

### User Blogs
- **GET** `/api/user-blogs` - Get all user-created blogs
- **GET** `/api/user-blogs/:id` - Get single user blog
- **GET** `/api/user-blogs/user/:userId` - Get blogs by specific user
- **GET** `/api/user-blogs/my-blogs` - Get my blogs (requires auth)
- **POST** `/api/user-blogs` - Create new blog post (public or auth)
- **PUT** `/api/user-blogs/:id` - Update blog (requires auth)
- **DELETE** `/api/user-blogs/:id` - Delete blog (requires auth)

## ✅ Testing Blog Creation

### Test 1: Create a Blog Post via API

```bash
curl -X POST http://localhost:5000/api/user-blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "category": "Technology",
    "content": "<h1>Hello World</h1><p>This is my first blog post!</p>",
    "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000"
  }'
```

Expected Response:
```json
{
  "message": "Blog created successfully",
  "blogId": 4,
  "blog": {
    "id": 4,
    "title": "My First Blog Post",
    "category": "Technology",
    "imageUrl": "...",
    "content": "..."
  }
}
```

### Test 2: Verify Blog in Database

```bash
curl http://localhost:5000/api/user-blogs/4
```

### Test 3: Create Blog via Frontend

1. Navigate to `http://localhost:3000`
2. Click "Sign Up" or "Login"
3. Go to "My Blogs" section
4. Click "Create New Blog"
5. Fill in the form and submit

## 🗄️ Database Information

**Database Type:** Turso (LibSQL)
**Location:** Remote (AWS ap-south-1)
**Connection:** Configured in `.env.local`

### Default Users
The database is pre-seeded with:
- john@example.com (password: password123)
- jane@example.com (password: password123)
- admin@tailark.com (password: password123) - Admin User

## 🔧 Troubleshooting

### Backend Not Starting?

1. **Check if port 5000 is in use:**
   ```bash
   netstat -ano | findstr :5000
   ```

2. **Kill the process if needed:**
   ```bash
   taskkill /PID <process_id> /F
   ```

3. **Restart the backend:**
   ```bash
   cd backend
   npm start
   ```

### Frontend Not Starting?

1. **Check if port 3000 is in use:**
   ```bash
   netstat -ano | findstr :3000
   ```

2. **Kill and restart:**
   ```bash
   pnpm run kill-ports
   pnpm run dev
   ```

### Database Connection Issues?

1. Verify `.env.local` exists in root directory
2. Check that `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set
3. Test connection:
   ```bash
   cd backend
   node -e "require('./db').initDb().then(() => console.log('✅ Database connected!'))"
   ```

### Blog Posts Not Showing?

1. Check backend is running on port 5000
2. Open browser console (F12) and check for errors
3. Verify API endpoint: `http://localhost:5000/api/blogs`
4. Check network tab for failed requests

## 📝 Alternative Start Commands

### Start Backend Only
```bash
cd backend
npm start
```

### Start Frontend Only
```bash
pnpm run dev:next
```

### Start Both (Recommended)
```bash
pnpm run dev
```

### Start with Full Diagnostics
```bash
pnpm run dev:full
```

## 🎨 Features

- ✨ **Modern UI** - Built with Next.js 16 & React 19
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 🌓 **Dark Mode** - Theme switching support
- 🔐 **Authentication** - Email/Password + Google OAuth
- 📝 **Blog System** - Create, read, update, delete blog posts
- 👥 **User Management** - User profiles and permissions
- 📊 **Analytics Dashboard** - Data visualization
- 🎯 **Responsive Design** - Mobile-first approach

## 📂 Project Structure

```
dashboardtsx/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions & API client
├── backend/               # Express.js backend
│   ├── routes/           # API routes
│   ├── db.js            # Database configuration
│   └── index.js         # Server entry point
├── .env.local            # Environment variables
└── package.json          # Dependencies & scripts
```

## 🔐 Admin Features

Admin users (user ID 3 or email containing 'admin') have special privileges:
- Edit any blog post
- Delete any blog post
- Access to admin dashboard
- User management

## 🌐 Google OAuth Setup

Your Google OAuth is already configured with:
- **Client ID:** 881583500978-biattff098c0pdquegj4sg6rj23nk2j1.apps.googleusercontent.com
- **Authorized Origins:** http://localhost:3000
- **Redirect URIs:** Configured in Google Console

## 📚 Additional Scripts

```bash
# Clean build artifacts
pnpm run clean

# Clean everything including node_modules cache
pnpm run clean:all

# Run linter
pnpm run lint

# Build for production
pnpm run build

# Start production server
pnpm run start
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Turso Database](https://turso.tech/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Tips

1. **Hot Reload:** Changes to frontend code will auto-refresh the browser
2. **Backend Changes:** Restart backend manually or use nodemon (already configured)
3. **Database Changes:** Check `backend/db.js` for schema
4. **API Testing:** Use tools like Postman or Thunder Client for VS Code

## 🆘 Need Help?

If you encounter any issues:
1. Check this guide's Troubleshooting section
2. Verify all environment variables are set
3. Ensure both backend and frontend are running
4. Check browser console for errors
5. Check terminal for server errors

## ✅ Verification Checklist

Before starting development, ensure:
- [ ] pnpm dependencies installed
- [ ] Backend dependencies installed
- [ ] .env.local file exists with all variables
- [ ] Both servers start without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:5000/health
- [ ] Can fetch blogs from http://localhost:5000/api/blogs
- [ ] Can create a test blog post

---

**Happy Coding! 🚀**

*Last Updated: January 9, 2026*