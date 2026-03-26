import asyncio
import json
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from backend.services.agent_service import agent_service
from backend.database.agent_db import get_all_agents, save_agent

router = APIRouter(prefix="/api/agents", tags=["Agents"])

@router.get("")
async def fetch_agents():
    try:
        return await get_all_agents()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{agent_id}")
async def update_agent_config(agent_id: str, updates: Dict[str, Any]):
    try:
        return await save_agent(agent_id, updates)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{agent_id}/logs_history")
async def get_logs_history(agent_id: str):
    try:
        redis = await agent_service.get_redis()
        # Fetch all logs in the list
        logs_bytes = await redis.lrange(f"agent:{agent_id}:log_history", 0, -1)
        import json
        return [json.loads(log) for log in logs_bytes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AgentStartConfig(BaseModel):
    tools: List[str] = []
    memory_mode: str = "scoped"
    system_prompt: Optional[str] = None

@router.post("/{agent_id}/start")
async def start_agent(agent_id: str, config: AgentStartConfig):
    try:
        result = await agent_service.start_agent(agent_id, config.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{agent_id}/stop")
async def stop_agent(agent_id: str):
    try:
        result = await agent_service.stop_agent(agent_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{agent_id}/status")
async def get_agent_status(agent_id: str):
    try:
        result = await agent_service.get_agent_status(agent_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{agent_id}/logs")
async def stream_agent_logs(agent_id: str, request: Request):
    """
    Streams logs from Redis PubSub to the client via Server-Sent Events (SSE).
    """
    async def log_generator():
        redis = await agent_service.get_redis()
        pubsub = redis.pubsub()
        await pubsub.subscribe(f"agent:{agent_id}:logs")
        
        try:
            async for message in pubsub.listen():
                if await request.is_disconnected():
                    break
                    
                if message["type"] == "message":
                    data = message["data"].decode("utf-8")
                    # Send SSE formatted message
                    yield f"data: {data}\n\n"
                    
                # Optional: break if status is idle again to close stream? 
                # For now, keep it open until client disconnects.
        finally:
            await pubsub.unsubscribe(f"agent:{agent_id}:logs")

    return StreamingResponse(log_generator(), media_type="text/event-stream")
