# Capsule - Personal AI Dashboard

Capsule is a modular, AI-orchestrated dashboard designed to manage autonomous agents, external modules (plugins), and system endpoints. The application features a dynamic React (Vite) frontend with a FastAPI backend connected to Redis.

---

## 🚀 Getting Started

Follow these instructions to get both the frontend and backend services running securely on your local machine.

### Prerequisites
- **Python 3.10+**
- **Node.js (v18+) & npm**
- **Docker/Docker Desktop**

---

## 1. Running the Database (Redis)

Capsule relies heavily on Redis for state management (agents and modules). A pre-configured `docker-compose.yml` is included in the project root.

**Start Redis via Docker:**
```powershell
docker-compose up -d
```
*This will spin up a lightweight alpine-based Redis server on `localhost:6379`.*

---

## 2. Running the Backend (Python / FastAPI)

The backend strictly runs inside an isolated Virtual Environment (`.venv`) to protect your global Python packages. We provide a single script to handle environment creation, activation, and server execution.

**Using the automated startup script (Windows):**
```powershell
.\start_backend.bat
```

**What the script does under the hood:**
1. Checks if `.venv` exists; if not, creates one using `python -m venv .venv`.
2. Activates the virtual environment.
3. Installs dependencies from `backend/requirements.txt`.
4. Starts the FastAPI server on `http://127.0.0.1:8000` via `uvicorn`.

*If you prefer to start it manually:*
```powershell
# 1. Activate the environment
.\.venv\Scripts\activate

# 2. Run the server
uvicorn backend.main:app --reload
```

---

## 2. Running the Frontend (React / Vite)

The frontend is a Vite-powered React application with Tailwind CSS styling. 

**Using the automated startup script (Windows):**
```powershell
.\start_frontend.bat
```

**What the script does under the hood:**
1. Navigates into the `frontend/` directory.
2. Installs dependencies using `npm install`.
3. Runs the development server via `npm run dev`.

*If you prefer to start it manually:*
```powershell
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173/` by default.

---

## 🏗️ Architecture & Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Lucide React (Icons).
- **Backend:** Python, FastAPI, Uvicorn, Redis (via `arq` / `aioredis`).
- **Database (State):** Redis is heavily utilized for tracking Agent states, logs, and Module settings/toggles.

### Modules / Plugins
Capsule supports a modular ecosystem. To create a new module, you simply need to create a folder under `backend/modules/{module_name}` containing a valid `plugin.json` which the backend will cold-load upon startup. Dynamic states (whether it is enabled and its custom settings) are saved in Redis.
