@echo off
echo =========================================
echo Starting Capsule AI - Backend
echo =========================================

if not exist .venv (
    echo [1/5] Creating virtual environment...
    python -m venv .venv
) else (
    echo [1/5] Virtual environment already exists.
)

echo [2/5] Activating virtual environment...
call .venv\Scripts\activate.bat || (echo "Failed to activate venv!" & exit /b 1)

echo [3/5] Installing requirements...
pip install -r backend\requirements.txt || (echo "Failed to install requirements!" & exit /b 1)

echo [4/5] Starting Redis via Docker Compose...
docker-compose up -d || (echo "Warning: Failed to start Redis via docker-compose." & echo "Make sure Docker is running.")

echo [5/5] Starting FastAPI backend...
uvicorn backend.main:app --reload
