# Environment Setup Guide

## Required: Create `.env.local` File

The backend requires database credentials to run. Create a file named `.env.local` in the root directory with these variables:

```env
# Database Configuration (REQUIRED)
# Get your credentials from https://turso.tech
TURSO_DATABASE_URL=your-database-url-here
TURSO_AUTH_TOKEN=your-auth-token-here

# JWT Secret (Optional - has default)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google OAuth (Optional - has default)  
GOOGLE_CLIENT_ID=612878658844-2kegk8lptok4k091024l39i7bduup1s7.apps.googleusercontent.com

# Backend Port (Optional - defaults to 5000)
PORT=5000
```

## Quick Start

### Option 1: With Turso Database (Recommended)

1. **Create a Turso Database** (Free):
   ```bash
   # Install Turso CLI
   curl -sSfL https://get.tur.so/install.sh | bash
   
   # Create database
   turso db create dashboardtsx
   
   # Get credentials
   turso db show dashboardtsx --url
   turso db tokens create dashboardtsx
   ```

2. **Add credentials to `.env.local`**:
   Create `.env.local` in the root and paste your URL and token

3. **Start development**:
   ```bash
   pnpm dev
   ```
   This starts both Next.js (port 3000) and Backend API (port 5000)

### Option 2: Without Backend (Frontend Only)

If you don't want to set up the database right now:

1. The BlogSection is already commented out in `app/page.tsx`
2. Just run:
   ```bash
   pnpm run dev:next
   ```

## Commands

- `pnpm dev` - Run both frontend + backend (requires .env.local)
- `pnpm run dev:next` - Run Next.js only (port 3000)
- `pnpm run dev:backend` - Run backend only (port 5000)
- `pnpm build` - Build for production

## Troubleshooting

### "DATABASE_URL is not defined"
- You need to create `.env.local` with your Turso credentials
- OR run `pnpm run dev:next` (frontend only)

### "Module not found: @react-oauth/google"
- Run `pnpm install` to install all dependencies

### Exit code 3221225477
- Usually a memory issue or backend trying to start without database
- Make sure `.env.local` exists or use frontend-only mode
