# Quick Start Guide

## 🚀 Running the Development Server

The application has been optimized to prevent memory crashes. Simply run:

```bash
pnpm dev
```

The development server will now:
- ✅ Use 4GB of memory (instead of default ~1.5GB)
- ✅ Throttle animations to prevent memory leaks
- ✅ Optimize bundle splitting for better performance
- ✅ Work seamlessly on Windows, Mac, and Linux

## 📋 Prerequisites

- Node.js 20+ installed
- At least 8GB of system RAM
- pnpm package manager

## 🔧 Installation

If you're setting up for the first time:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🌐 Access the Application

Once the server starts, open:
- **Local**: http://localhost:3000
- **Network**: http://192.168.x.x:3000 (check console for exact IP)

## 🐛 Troubleshooting

### Still Getting Memory Errors?

1. **Increase memory limit further** (edit `package.json`):
   ```json
   "dev": "cross-env NODE_OPTIONS=--max-old-space-size=8192 next dev"
   ```

2. **Clear Next.js cache**:
   ```bash
   # Windows
   rmdir /s /q .next
   
   # Mac/Linux
   rm -rf .next
   ```
   Then run `pnpm dev` again.

3. **Close other applications** to free up RAM

4. **Check system memory**:
   ```bash
   # Windows (PowerShell)
   Get-CimInstance Win32_OperatingSystem | Select-Object FreePhysicalMemory
   
   # Mac/Linux
   free -h
   ```

### Server Won't Start?

- Ensure port 3000 is not in use
- Try `pnpm install` again
- Check for `node_modules` corruption

### Build for Production

To test in production mode (uses less memory):

```bash
pnpm build
pnpm start
```

## 📊 Memory Optimizations Applied

This project includes:

1. **Increased Node.js heap size** - 4GB memory allocation
2. **Throttled mouse events** - Reduced from 60+ events/sec to ~7/sec
3. **Reduced string generation** - 60-67% smaller random strings
4. **Webpack optimizations** - Better code splitting
5. **React optimizations** - useCallback, proper memoization

See `docs/MEMORY-OPTIMIZATION.md` for full details.

## 📁 Project Structure

```
dashboardtsx/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # UI components (optimized)
│   └── testimonials.tsx  # Testimonials (optimized)
├── docs/                 # Documentation
├── public/               # Static assets
└── package.json          # Dependencies (with memory fix)
```

## 🎯 Key Features

- ✨ Modern Next.js 16 with Turbopack
- 🎨 TailwindCSS for styling
- 🎭 Framer Motion animations (memory-optimized)
- 🌙 Dark mode support
- 📱 Fully responsive design

## 🔗 Available Scripts

- `pnpm dev` - Start development server (optimized)
- `pnpm build` - Create production build
- `pnpm start` - Run production server
- `pnpm lint` - Run ESLint

## ⚡ Performance Tips

- The testimonial card animations are throttled for optimal performance
- Mouse hover effects update smoothly without memory leaks
- Production builds are always more memory-efficient than dev mode

## 📚 Additional Resources

- [Memory Optimization Guide](docs/MEMORY-OPTIMIZATION.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Performance](https://react.dev/learn/render-and-commit)

## 🆘 Support

If you continue experiencing issues:
1. Check that you have at least 8GB of available RAM
2. Close memory-intensive applications (browsers with many tabs, IDEs, etc.)
3. Review the full optimization guide in `docs/MEMORY-OPTIMIZATION.md`
4. Consider using production mode for testing: `pnpm build && pnpm start`

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: ✅ Memory optimized and production-ready