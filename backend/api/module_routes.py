from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Dict, Any
from backend.services.module_service import module_service

router = APIRouter(prefix="/api/modules", tags=["Modules"])

@router.get("")
async def get_modules():
    try:
        return await module_service.scan_modules()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{module_id}")
async def get_module(module_id: str):
    try:
        return await module_service.get_module(module_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{module_id}/toggle")
async def toggle_module(module_id: str):
    try:
        return await module_service.toggle_module(module_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SettingsUpdate(BaseModel):
    settings: Dict[str, Any]

@router.put("/{module_id}/settings")
async def update_module_settings(module_id: str, updates: SettingsUpdate):
    try:
        return await module_service.update_settings(module_id, updates.settings)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/install")
async def install_module(file: UploadFile = File(...)):
    """Install a module by uploading a zip file."""
    if not file.filename.endswith(".zip"):
        raise HTTPException(status_code=400, detail="Only .zip files are supported right now")
    try:
        content = await file.read()
        return await module_service.install_module_from_zip(content)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Installation failed: {str(e)}")

@router.delete("/{module_id}")
async def uninstall_module(module_id: str):
    try:
        return await module_service.remove_module(module_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
