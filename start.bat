@echo off
REM AgriScan Start Script for Windows

echo Starting AgriScan Application...

REM Start backend server in background
echo Starting backend server...
cd backend
start npm start

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend development server
echo Starting frontend development server...
cd ../frontend/agriscan-frontend
npm run dev

echo AgriScan is now running!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
pause