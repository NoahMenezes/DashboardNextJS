@echo off
cls
echo ========================================
echo    Dashboard Project - Quick Start
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/4] Installing frontend dependencies...
    call pnpm install
    echo.
) else (
    echo [1/4] Frontend dependencies already installed
    echo.
)

REM Check if backend node_modules exists
if not exist "backend\node_modules\" (
    echo [2/4] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo.
) else (
    echo [2/4] Backend dependencies already installed
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo [3/4] WARNING: .env.local not found!
    echo Please create .env.local with your database credentials
    echo.
    pause
    exit /b 1
) else (
    echo [3/4] Environment variables configured
    echo.
)

REM Verify backend setup
echo [4/4] Verifying backend configuration...
cd backend
call node verify-setup.js
if errorlevel 1 (
    echo.
    echo ERROR: Backend verification failed!
    echo Please check the errors above and fix them.
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ========================================
echo    Starting Application...
echo ========================================
echo.
echo Frontend will run on: http://localhost:3000
echo Backend will run on:  http://localhost:5000
echo.
echo Press Ctrl+C in either window to stop
echo.

REM Start both frontend and backend
call pnpm run dev

pause
