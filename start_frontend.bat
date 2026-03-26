@echo off
echo =========================================
echo Starting Capsule AI - Frontend
echo =========================================

cd frontend || (echo "Frontend directory not found!" & exit /b 1)

echo [1/3] Installing dependencies...
call npm install --legacy-peer-deps || (echo "Failed to install dependencies!" & exit /b 1)

echo [2/3] Checking types...
call npm run lint || echo "Linting issues found, but proceeding..."

echo [3/3] Starting development server...
call npm run dev
