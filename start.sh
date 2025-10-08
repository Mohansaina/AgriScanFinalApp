#!/bin/bash

# AgriScan Start Script

echo "Starting AgriScan Application..."

# Start backend server in background
echo "Starting backend server..."
cd backend
npm start &

# Wait a moment for backend to start
sleep 5

# Start frontend development server
echo "Starting frontend development server..."
cd ../frontend/agriscan-frontend
npm run dev

echo "AgriScan is now running!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"