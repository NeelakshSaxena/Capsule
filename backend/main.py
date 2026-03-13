from fastapi import FastAPI

app = FastAPI(title="Capsule AI OS")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Capsule orchestrator running."}
