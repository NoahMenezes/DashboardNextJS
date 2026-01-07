# Backend Server Setup

This backend provides API endpoints for:
- User authentication (signup, login, Google OAuth)
- Blog posts management
- User management

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
The backend uses the `.env.local` file from the parent directory. Ensure you have:
- `TURSO_DATABASE_URL` - Your Turso database URL
- `TURSO_AUTH_TOKEN` - Your Turso auth token
- `JWT_SECRET` - Secret for JWT authentication (optional, has default)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional, has default)

### 3. Start the Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will run on **http://localhost:5000**

## Enabling Blog Section on Homepage

Once the backend is running:

1. Open `app/page.tsx`
2. Uncomment the BlogSection import:
   ```tsx
   import { BlogSection } from "@/components/blog";
   ```
3. Uncomment the BlogSection component:
   ```tsx
   <BlogSection />
   ```

## API Endpoints

- `POST /api/signup` - Register new user
- `POST /api/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `GET /api/users` - Get all users
- `GET /api/me` - Get current user (protected)
- `GET /api/blogs` - Get all blog posts
- `POST /api/blogs` - Create new blog post
- `GET /api/blogs/:id` - Get specific blog post
- `PUT /api/blogs/:id` - Update blog post
- `DELETE /api/blogs/:id` - Delete blog post

## Notes

- The backend connects to a Turso (libSQL) database
- JWT tokens expire after 24 hours
- CORS is enabled for all origins in development
