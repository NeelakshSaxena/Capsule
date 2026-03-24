@echo off
echo =========================================
echo Starting Capsule AI - Backend
echo =========================================

if not exist .venv (
    echo [1/4] Creating virtual environment...
    python -m venv .venv
) else (
    echo [1/4] Virtual environment already exists.
)

echo [2/4] Activating virtual environment...
call .venv\Scripts\activate.bat || (echo "Failed to activate venv!" & exit /b 1)

echo [3/4] Installing requirements...
pip install -r backend\requirements.txt || (echo "Failed to install requirements!" & exit /b 1)

echo [4/4] Starting FastAPI backend...
uvicorn backend.main:app --reload
