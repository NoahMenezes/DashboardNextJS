# 🚀 Quick Start Guide - Dashboard Project

## ⚡ TL;DR - Just Run This

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
pnpm run dev
```

Then open: **http://localhost:3000**

---

## 📋 Prerequisites

✅ Node.js v18+ installed  
✅ pnpm installed (`npm install -g pnpm`)  
✅ Dependencies installed  

---

## 🎯 Step-by-Step Instructions

### Step 1: Install Dependencies (First Time Only)

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Start Backend Server

**Option A: Using npm (Recommended)**
```bash
cd backend
npm start
```

**Option B: Using pnpm from root**
```bash
pnpm run dev:backend
```

You should see:
```
Backend server running on http://localhost:5000
Database initialized.
```

### Step 3: Start Frontend (New Terminal)

```bash
pnpm run dev:next
```

Or use the combined command:
```bash
pnpm run dev
```

This starts both backend and frontend simultaneously!

### Step 4: Open Your Browser

Navigate to: **http://localhost:3000**

---

## 🔍 Verify Everything Works

### Check Backend
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"ok","timestamp":"...","service":"dashboard-backend","port":5000}
```

### Check Frontend
Open http://localhost:3000 - you should see the dashboard homepage

---

## ⚠️ Troubleshooting

### "Failed to fetch" Error in Browser

**Problem:** Frontend can't connect to backend

**Solution:**
1. Check if backend is running: `curl http://localhost:5000/health`
2. If not running, start it: `cd backend && npm start`
3. Refresh your browser

### Port 5000 Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Port 3000 Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Backend Database Errors

Run the verification script:
```bash
cd backend
npm run verify
```

### Dependencies Issues

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
pnpm install

cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## 🎮 Available Scripts

```bash
# Start everything
pnpm run dev                    # Both frontend + backend

# Start separately
pnpm run dev:next              # Frontend only
pnpm run dev:backend           # Backend only
cd backend && npm start        # Backend (direct)

# Build for production
pnpm run build

# Verify backend setup
cd backend && npm run verify

# Check backend connection
node scripts/check-backend.js
```

---

## 📊 System Status

### Ports
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

### Database
- **Type:** Turso (LibSQL - Remote)
- **Location:** AWS ap-south-1
- **Status:** Auto-connects on backend startup

### Test Accounts
| Email | Password | Role |
|-------|----------|------|
| john@example.com | password123 | User |
| admin@tailark.com | password123 | Admin |

---

## 🔄 Common Workflows

### Creating a Blog Post

1. Start both servers
2. Navigate to http://localhost:3000
3. Click "Login" (use test account)
4. Go to "My Blogs"
5. Click "Create New Blog"
6. Fill in details and submit

### Testing API Directly

```bash
# Get all blogs
curl http://localhost:5000/api/blogs

# Create a blog post
curl -X POST http://localhost:5000/api/user-blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog",
    "category": "Testing",
    "content": "<h1>Hello</h1><p>Content here</p>",
    "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
  }'
```

---

## 🛡️ Error Handling

### The app now gracefully handles:

✅ Backend not running (shows helpful error message)  
✅ Connection timeouts (5 second timeout with clear message)  
✅ Network errors (tells you to start backend)  
✅ Database connection issues (displayed in UI)  
✅ Authentication errors (shows on login form)  

### All errors now show:
- Clear error messages
- Instructions on how to fix
- No confusing console errors

---

## 📝 Features

- ✨ Modern UI with animations
- 🌓 Dark mode (default)
- 🔐 Authentication (Email + Google OAuth)
- 📝 Blog CRUD operations
- 👥 User management
- 📊 Dashboard analytics
- 🎯 Responsive design

---

## 🎉 You're Ready!

Your dashboard is now running with:
- ✅ All errors fixed
- ✅ Proper error handling
- ✅ Connection timeouts
- ✅ Helpful error messages
- ✅ Zero TypeScript errors
- ✅ Zero warnings

Just make sure the backend is running before using the frontend!

**Need help?** Check the troubleshooting section above.

**Happy coding! 🚀**