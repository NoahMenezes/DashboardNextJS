# Dashboard TSX - Full Stack Next.js Application

A modern, full-stack dashboard application built with Next.js 16, TypeScript, and Express backend with Turso database.

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
│   ├── dashboard/         # Dashboard page
│   ├── blog/              # Blog pages
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # React components
│   ├── ui/               # UI components (shadcn)
│   └── ...               # Feature components
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
├── backend/               # Express.js backend
│   ├── routes/           # API routes
│   ├── db.js             # Database setup
│   └── index.js          # Server entry
├── scripts/              # Helper scripts
├── public/               # Static assets
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

### Health Check
- `GET /health` - Basic health check
- `GET /api/health` - Detailed health with DB status

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

---

## 🎨 Features

- ✅ Modern dashboard UI with dark/light theme
- ✅ Top navbar with mobile menu
- ✅ User authentication (email + Google OAuth)
- ✅ Blog management system
- ✅ User management table
- ✅ Data tables with sorting
- ✅ Interactive charts
- ✅ Responsive design
- ✅ Protected routes
- ✅ JWT authentication
- ✅ Database seeding

---

## 📚 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI)
- Lucide React Icons
- Framer Motion
- Recharts

### Backend
- Express.js
- Turso (LibSQL)
- bcryptjs
- jsonwebtoken
- CORS
- Google OAuth

### Development
- TypeScript
- ESLint
- Concurrently
- Nodemon
- Turbopack

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

## 🚢 Deployment

### Frontend (Vercel - Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables:
     - `TURSO_DATABASE_URL`
     - `TURSO_AUTH_TOKEN`
     - `JWT_SECRET`
     - `GOOGLE_CLIENT_ID`
     - `NEXT_PUBLIC_API_URL` (your backend URL)
   - Click Deploy

### Backend (Railway, Render, Fly.io)

**Railway:**
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway variables set TURSO_DATABASE_URL=...
railway variables set TURSO_AUTH_TOKEN=...
railway up
```

**Render:**
1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Configure:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `node index.js`
4. Add environment variables

**Fly.io:**
```bash
cd backend
fly launch
fly secrets set TURSO_DATABASE_URL=...
fly deploy
```

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
3. Follow auth patterns

**Styling:**
- Use Tailwind CSS utilities
- Follow shadcn/ui patterns
- Use `lib/utils.ts` for className management

---

## 🎯 Project Scripts Explained

### Windows Helpers
- `Start-Dev.ps1` - PowerShell startup script
- `start-dev.bat` - Batch startup script
- `scripts/kill-ports.ps1` - Port cleanup

### Pre-Flight Checks
- `scripts/startup-check.js` - Environment validation
- Checks dependencies, environment, ports, files

---

## 🔒 Security Best Practices

- ✅ Environment variables in `.env.local` (never commit!)
- ✅ JWT secret is strong and unique
- ✅ Passwords hashed with bcrypt
- ✅ CORS configured properly
- ✅ SQL injection protected (parameterized queries)
- ✅ HTTPS enforced in production

---

## 📊 Performance

- **Startup Time:** ~1-2 seconds
- **Build Time:** ~10-30 seconds
- **API Response:** < 100ms (local)
- **Database:** Edge-optimized (Turso)
- **Memory:** 4GB Node heap optimized

---

## 🆘 Support & Resources

### Documentation Files
- `README.md` - This file (everything you need!)
- `ENV_SETUP.md` - Detailed environment setup

### Helpful Commands
```bash
pnpm run startup-check  # Diagnose issues
pnpm run kill-ports     # Fix port conflicts
pnpm dev                # Start development
```

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Turso Docs](https://docs.turso.tech)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🎓 Common Workflows

### Daily Development
```bash
# Start servers
pnpm dev

# Visit http://localhost:3000
# Make changes, hot reload works automatically
```

### Adding a New Component
```bash
# Install shadcn component
npx shadcn@latest add button

# Use in your code
import { Button } from "@/components/ui/button"
```

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

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing`
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 🎉 You're All Set!

Your development environment is ready! 

**Next Steps:**
1. Run `pnpm dev`
2. Visit http://localhost:3000
3. Log in with test account
4. Start building features!

**Need Help?**
- Run `pnpm run startup-check` for diagnostics
- Check terminal logs for errors
- Review this README

---

**Made with ❤️ using Next.js and modern web technologies**

For questions or issues, check the troubleshooting section above or run the startup check command.

Happy coding! 🚀