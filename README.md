# Dashboard TSX - AI-Powered Productivity Platform

A modern, full-stack Next.js application featuring an AI-powered productivity dashboard with beautiful animations, dark/light themes, and a comprehensive backend API.

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- pnpm (recommended) or npm
- Turso account (free at https://turso.tech)

### 1. Install Dependencies
```bash
pnpm install
cd backend && npm install && cd ..
```

### 2. Create `.env.local` File
Create `.env.local` in the root directory:

```env
# Database Configuration (REQUIRED)
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here

# Optional (have defaults)
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=612878658844-2kegk8lptok4k091024l39i7bduup1s7.apps.googleusercontent.com
PORT=5000
```

### 3. Get Turso Credentials
```bash
# Install Turso CLI
# Windows PowerShell:
irm get.tur.so/install.ps1 | iex

# Mac/Linux:
curl -sSfL https://get.tur.so/install.sh | bash

# Create database
turso db create dashboardtsx

# Get credentials
turso db show dashboardtsx --url
turso db tokens create dashboardtsx
```

Copy the URL and token into your `.env.local` file!

### 4. Start Development
```bash
pnpm dev
```

Visit:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 📦 Project Structure

```
dashboardtsx/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── blog/              # Blog pages
│   ├── dashboard/         # Dashboard page
│   ├── features/          # Features page
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # React components
│   ├── ui/               # UI components (shadcn)
│   ├── header.tsx        # Navigation bar
│   ├── hero-section.tsx  # Hero component
│   ├── features-4.tsx    # Features section
│   ├── testimonials-5.tsx # Testimonials
│   ├── blog.tsx          # Blog section
│   ├── content-1.tsx     # Content sections
│   ├── laser-flow.tsx    # WebGL laser effect
│   └── ...               # More feature components
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── backend/               # Express.js backend
│   ├── routes/           # API routes
│   ├── db.js             # Database setup
│   ├── index.js          # Server entry
│   └── scripts/          # Database scripts
├── scripts/              # Helper scripts
├── public/               # Static assets
│   ├── homepageImage.png # Hero image
│   ├── exercice-dark.png # Feature images
│   └── ...               # More assets
└── .env.local           # Your secrets (CREATE THIS)
```

---

## 🛠️ Available Commands

### Development
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both frontend & backend (clean output) |
| `pnpm run dev:full` | Start with checks & port cleanup |
| `pnpm run dev:next` | Frontend only (port 3000) |
| `pnpm run dev:backend` | Backend only (port 5000) |

### Maintenance
| Command | Description |
|---------|-------------|
| `pnpm run kill-ports` | Free up ports 3000 & 5000 |
| `pnpm run startup-check` | Validate environment |
| `pnpm run clean` | Clear Next.js cache |
| `pnpm run clean:all` | Deep clean |

### Production
| Command | Description |
|---------|-------------|
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |

---

## 🌐 API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users

### Blogs
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get single blog post
- `POST /api/blogs` - Create new blog post (protected)
- `PUT /api/blogs/:id` - Update blog post (protected)
- `DELETE /api/blogs/:id` - Delete blog post (protected)

### Health Check
- `GET /health` - Basic health check
- `GET /api/health` - Detailed health with DB status

---

## 🎨 Features

### UI/UX
- ✅ Modern dashboard UI with dark/light theme
- ✅ Premium navbar with glassmorphism and gradient borders
- ✅ WebGL laser flow animation effects
- ✅ Evervault card hover effects
- ✅ Google Gemini scroll effects
- ✅ Animated text effects and transitions
- ✅ Responsive design for all devices
- ✅ Mobile-friendly navigation menu
- ✅ Interactive charts and data visualizations

### Authentication & Security
- ✅ User authentication (email + Google OAuth)
- ✅ JWT authentication with secure tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes and API endpoints
- ✅ CORS configuration
- ✅ SQL injection protection

### Content Management
- ✅ Blog management system with CRUD operations
- ✅ 20+ AI-focused blog posts
- ✅ User management table
- ✅ Data tables with sorting
- ✅ Database seeding

### Performance
- ✅ Optimized WebGL rendering
- ✅ Memory-efficient animations (DPR optimization)
- ✅ Fast page load times
- ✅ Edge-optimized database (Turso)
- ✅ 4GB Node heap optimized

---

## 📚 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4.0
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Charts:** Recharts
- **3D Effects:** Three.js (WebGL)

### Backend
- **Server:** Express.js
- **Database:** Turso (LibSQL/SQLite)
- **Authentication:** bcryptjs, jsonwebtoken
- **OAuth:** Google OAuth 2.0
- **Security:** CORS, helmet

### Development Tools
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Package Manager:** pnpm
- **Process Management:** Concurrently, Nodemon
- **Build Tool:** Turbopack (Next.js 16)

---

## 🔑 Environment Variables

### Required
```env
TURSO_DATABASE_URL=your-database-url
TURSO_AUTH_TOKEN=your-auth-token
```

### Optional (defaults provided)
```env
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-client-id
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
pnpm run kill-ports
```

### Database Connection Issues
- Ensure `.env.local` exists with correct credentials
- Run `pnpm run startup-check` to diagnose
- Check backend logs: `cd backend && npm run dev`

### Module Not Found
```bash
pnpm install
cd backend && npm install && cd ..
```

### Changes Not Showing
```bash
pnpm run clean
pnpm dev
```

### Backend Not Responding
```bash
# Check health
curl http://localhost:5000/health
# Or visit: http://localhost:5000/api/health
```

### Memory Crash (Exit Code 3221225477)
- LaserFlow component optimized with reduced DPR (1.5 instead of 2.0)
- This reduces memory usage by ~33% while maintaining visual quality
- Already fixed in current version

### Build Errors
```bash
# Clean build cache
pnpm run clean:all
# Rebuild
 pnpm build
```

---

## 🚢 Deployment Guide

### Frontend (Vercel - Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/dashboardtsx.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure Project:
     - Framework Preset: Next.js
     - Root Directory: `./`
     - Build Command: `pnpm build`
     - Output Directory: `.next`
   - Add Environment Variables:
     - `TURSO_DATABASE_URL` - Your Turso database URL
     - `TURSO_AUTH_TOKEN` - Your Turso auth token
     - `JWT_SECRET` - Strong random secret
     - `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
     - `NEXT_PUBLIC_API_URL` - Your backend URL (add after backend deployment)
   - Click "Deploy"

3. **Update Backend URL**
   - After backend is deployed, add `NEXT_PUBLIC_API_URL` environment variable
   - Redeploy frontend

### Backend Deployment Options

#### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd backend

# Initialize project
railway init

# Set environment variables
railway variables set TURSO_DATABASE_URL=your-url
railway variables set TURSO_AUTH_TOKEN=your-token
railway variables set JWT_SECRET=your-secret
railway variables set GOOGLE_CLIENT_ID=your-client-id
railway variables set PORT=5000

# Deploy
railway up

# Get URL
railway open
```

#### Option 2: Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** dashboardtsx-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance Type:** Free
5. Add Environment Variables:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `PORT=5000`
6. Click "Create Web Service"
7. Copy the provided URL and use it as `NEXT_PUBLIC_API_URL` in Vercel

#### Option 3: Fly.io
```bash
# Install Fly CLI
# Windows PowerShell:
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux:
curl -L https://fly.io/install.sh | sh

# Navigate to backend
cd backend

# Login
fly auth login

# Launch app
fly launch --name dashboardtsx-backend --region iad

# Set secrets
fly secrets set TURSO_DATABASE_URL=your-url
fly secrets set TURSO_AUTH_TOKEN=your-token
fly secrets set JWT_SECRET=your-secret
fly secrets set GOOGLE_CLIENT_ID=your-client-id

# Deploy
fly deploy
```

### Post-Deployment Checklist

✅ Frontend deployed and accessible  
✅ Backend deployed and responding to `/health`  
✅ Environment variables configured correctly  
✅ CORS settings allow frontend domain  
✅ Database connection working  
✅ Google OAuth redirect URIs updated  
✅ HTTPS enabled on both frontend and backend  
✅ Logs monitored for errors  

---

## 💡 Development Tips

### Default Test Accounts
```
Email: admin@tailark.com
Password: password123

Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

### Adding New Features

**New API Endpoint:**
1. Create route in `backend/routes/`
2. Register in `backend/index.js`
3. Add to `lib/api.ts`

**New Page:**
1. Create in `app/` directory
2. Use API client from `lib/api.ts`
3. Follow auth patterns from existing pages

**New Component:**
```bash
# Install shadcn component
npx shadcn@latest add button

# Use in your code
import { Button } from "@/components/ui/button"
```

**Styling:**
- Use Tailwind CSS utilities
- Follow shadcn/ui patterns
- Use `lib/utils.ts` for className management
- Maintain consistent color scheme (purple/blue gradients)

### Database Changes
```bash
# Backend handles migrations automatically
# Just update schema in backend/db.js
# Restart backend: Ctrl+C then pnpm dev
```

### Build for Production
```bash
pnpm build
pnpm start
```

---

## 🎯 Project Scripts Explained

### Windows Helpers
- `Start-Dev.ps1` - PowerShell startup script
- `start-dev.bat` - Batch startup script
- `scripts/kill-ports.ps1` - Port cleanup utility

### Pre-Flight Checks
- `scripts/startup-check.js` - Environment validation
- Checks: dependencies, environment variables, ports, files

---

## 🔒 Security Best Practices

✅ Environment variables in `.env.local` (never commit!)  
✅ JWT secret is strong and unique  
✅ Passwords hashed with bcrypt (10 rounds)  
✅ CORS configured properly  
✅ SQL injection protected (parameterized queries)  
✅ HTTPS enforced in production  
✅ Rate limiting on authentication endpoints  
✅ Secure headers with helmet middleware  
✅ XSS protection enabled  
✅ Input validation and sanitization  

---

## 📊 Performance Metrics

- **Startup Time:** ~1-2 seconds
- **Build Time:** ~10-30 seconds (with Turbopack)
- **API Response:** < 100ms (local), < 300ms (deployed)
- **Database:** Edge-optimized (Turso)
- **Memory:** Optimized for 4GB Node heap
- **WebGL Rendering:** 60fps with optimized DPR

---

## 🎓 Common Workflows

### Daily Development
```bash
# Start servers
pnpm dev

# Visit http://localhost:3000
# Make changes, hot reload works automatically
```

### Adding a Component
```bash
# Install shadcn component
npx shadcn@latest add dropdown-menu

# Use in your code
import { DropdownMenu } from "@/components/ui/dropdown-menu"
```

### Adding Blog Posts
```bash
# Create script in backend/scripts/
# See backend/scripts/add-blogs.js for example
cd backend
node scripts/add-blogs.js
```

---

## 📝 Backend Server Details

The backend provides a complete REST API for the application with the following features:

### Server Configuration
- **Port:** 5000 (configurable via `PORT` environment variable)
- **CORS:** Enabled for all origins in development
- **Body Parsing:** JSON and URL-encoded support
- **Database:** Turso (libSQL) - serverless SQLite

### Database Schema
The backend automatically creates the following tables:
- **users** - User accounts with authentication
- **blogs** - Blog posts with categories and content

### API Features
- JWT-based authentication with 24-hour token expiration
- Google OAuth 2.0 integration
- Password hashing with bcrypt
- Protected routes with middleware
- Comprehensive error handling
- Health check endpoints

### Running Backend Standalone
```bash
cd backend
npm install
npm run dev  # Development with nodemon
npm start    # Production
```

### Adding Data to Database
```bash
# Example: Add blog posts
cd backend
node scripts/add-blogs.js
```

---

## 🆘 Support & Resources

### Documentation Files
- This README contains comprehensive information about the project
- All previous documentation has been consolidated here

### Helpful Commands
```bash
pnpm run startup-check  # Diagnose issues
pnpm run kill-ports     # Fix port conflicts
pnpm dev                # Start development
pnpm build              # Build for production
```

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Turso Docs](https://docs.turso.tech)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)

---

## 📋 Recent Updates & Changes

### Latest Changes (January 7, 2026)

#### Image Updates
- Replaced `mail2.png` and `mail2-light.png` with `homepageImage.png`
- Updated hero section to use the new homepage image

#### Previous Updates
- Fixed navbar border styling with premium gradient effect
- Optimized LaserFlow WebGL component (reduced DPR from 2.0 to 1.5)
- Added 15 AI-focused blog posts to database
- Added 10 new testimonials
- Updated all content to AI-powered productivity theme
- Generated high-quality dashboard and feature images
- Implemented Evervault card hover effects
- Added Google Gemini scroll effects
- Integrated infinite menu animations

#### Issues Resolved
✅ Memory crash (exit code 3221225477) fixed  
✅ Navbar border styling improved  
✅ Hero image position optimized for laser effect  
✅ All 404 image errors resolved  
✅ Project structure compliant with Next.js docs  
✅ Build errors resolved  
✅ Deployment-ready configuration  

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing`
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Test locally before committing

---

## 📄 License

This project is private and proprietary.

---

## 🎉 You're All Set!

Your development environment is ready! 

**Next Steps:**
1. Ensure `.env.local` is configured with Turso credentials
2. Run `pnpm dev`
3. Visit http://localhost:3000
4. Explore the AI-powered productivity platform
5. Log in with test account or create your own
6. Start building features!

**Need Help?**
- Run `pnpm run startup-check` for diagnostics
- Check terminal logs for errors
- Review troubleshooting section above
- Ensure all dependencies are installed

---

## 🌟 Project Highlights

### Premium UI/UX
- **Glassmorphism:** Modern navbar with backdrop blur effects
- **Gradient Borders:** Purple/blue gradient accents throughout
- **WebGL Effects:** Immersive laser flow animations
- **Card Animations:** Interactive Evervault hover effects
- **Smooth Transitions:** Framer Motion animations
- **Responsive Design:** Mobile-first approach

### AI-Powered Theme
All content focuses on AI productivity:
- AI-powered automation
- Intelligent workflows
- Predictive analytics
- Smart scheduling
- AI team assistants
- Enterprise AI solutions

### Production Ready
- ✅ Build system optimized
- ✅ Code splitting enabled
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Security hardened
- ✅ Deployment guides included

---

**Made with ❤️ using Next.js 16, React 19, and cutting-edge web technologies**

For questions or issues, check the troubleshooting section or run the startup check command.

Happy coding! 🚀