from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import agent_routes

app = FastAPI(title="Capsule AI OS")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agent_routes.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Capsule orchestrator running."}
