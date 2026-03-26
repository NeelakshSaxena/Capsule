import os
import json
import shutil
import zipfile
import tempfile
from pathlib import Path
from fastapi import HTTPException
from backend.database.module_db import module_db

MODULES_DIR = Path("backend/modules")

class ModuleService:
    def __init__(self):
        # Ensure modules directory exists
        MODULES_DIR.mkdir(parents=True, exist_ok=True)

    def _read_plugin_json(self, module_path: Path):
        plugin_file = module_path / "plugin.json"
        if not plugin_file.exists():
            return None
        try:
            with open(plugin_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return None

    def _validate_plugin_json(self, data: dict):
        required_fields = ["id", "name", "version", "description", "icon", "permissions", "settings_schema"]
        for field in required_fields:
            if field not in data:
                return False
        return True

    async def scan_modules(self):
        """Cold load from filesystem and merge with Redis state."""
        modules = []
        for item in MODULES_DIR.iterdir():
            if item.is_dir():
                plugin_data = self._read_plugin_json(item)
                if plugin_data and self._validate_plugin_json(plugin_data):
                    # Merge with Redis state
                    state = await module_db.get_module_state(plugin_data["id"])
                    plugin_data["enabled"] = state["enabled"]
                    plugin_data["settings"] = state["settings"]
                    modules.append(plugin_data)
        return modules

    async def get_module(self, module_id: str):
        """Get a single module by ID."""
        modules = await self.scan_modules()
        for mod in modules:
            if mod["id"] == module_id:
                return mod
        raise HTTPException(status_code=404, detail="Module not found")

    async def toggle_module(self, module_id: str):
        # Get current state
        state = await module_db.get_module_state(module_id)
        new_state = not state["enabled"]
        
        await module_db.set_module_enabled(module_id, new_state)
        
        # Trigger runtime effect (Mocked for now)
        if new_state:
            # register_tools(module_id)
            pass
        else:
            # unregister_tools(module_id)
            pass
            
        return {"enabled": new_state}

    async def update_settings(self, module_id: str, settings: dict):
        # Validate against schema could go here
        await module_db.set_module_settings(module_id, settings)
        return {"status": "success", "settings": settings}

    async def install_module_from_zip(self, file_content: bytes):
        """Safe zip installation via temp dir."""
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            zip_path = temp_path / "upload.zip"
            
            with open(zip_path, "wb") as f:
                f.write(file_content)
                
            extract_dir = temp_path / "extracted"
            extract_dir.mkdir()
            
            try:
                with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                    zip_ref.extractall(extract_dir)
            except zipfile.BadZipFile:
                raise HTTPException(status_code=400, detail="Invalid zip file")
                
            # Find plugin.json (handle zip wrapping an extra folder)
            plugin_json_path = None
            module_dir = None
            
            for root, dirs, files in os.walk(extract_dir):
                if "plugin.json" in files:
                    plugin_json_path = Path(root) / "plugin.json"
                    module_dir = Path(root)
                    break
                    
            if not plugin_json_path or not module_dir:
                raise HTTPException(status_code=400, detail="No plugin.json found in zip")
                
            # Validate plugin.json
            with open(plugin_json_path, "r", encoding="utf-8") as f:
                try:
                    plugin_data = json.load(f)
                except Exception:
                    raise HTTPException(status_code=400, detail="Invalid JSON in plugin.json")
                    
            if not self._validate_plugin_json(plugin_data):
                raise HTTPException(status_code=400, detail="plugin.json is missing required fields")
                
            module_id = plugin_data["id"]
            target_dir = MODULES_DIR / module_id
            
            if target_dir.exists():
                raise HTTPException(status_code=409, detail=f"Module {module_id} already exists")
                
            # Move to target directory
            shutil.copytree(module_dir, target_dir)
            
            return await self.get_module(module_id)

    async def remove_module(self, module_id: str):
        target_dir = MODULES_DIR / module_id
        if not target_dir.exists():
            raise HTTPException(status_code=404, detail="Module not found on filesystem")
            
        # Disable if enabled
        state = await module_db.get_module_state(module_id)
        if state["enabled"]:
            await self.toggle_module(module_id) # triggers unregister
            
        # Remove from Redis
        await module_db.remove_module_state(module_id)
        
        # Delete folder
        shutil.rmtree(target_dir)
        return {"status": "success", "message": f"Module {module_id} uninstalled."}

module_service = ModuleService()
