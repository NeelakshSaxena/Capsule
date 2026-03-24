import asyncio
import json
from arq.connections import create_pool
from backend.queues.queue_config import redis_settings

class AgentService:
    def __init__(self):
        self.redis_pool = None

    async def get_redis(self):
        if not self.redis_pool:
            self.redis_pool = await create_pool(redis_settings)
        return self.redis_pool

    async def start_agent(self, agent_id: str, config: dict):
        redis = await self.get_redis()
        # Track job state in Redis
        await redis.set(f"agent:{agent_id}:status", "running")
        await redis.delete(f"agent:{agent_id}:stop") # Clear any previous stop signals
        
        # Enqueue Job
        job = await redis.enqueue_job("run_agent_loop", agent_id, config)
        await redis.set(f"agent:{agent_id}:current_job_id", job.job_id)
        
        return {"status": "started", "job_id": job.job_id}

    async def stop_agent(self, agent_id: str):
        redis = await self.get_redis()
        # Set stop signal for the worker loop to pick up
        await redis.set(f"agent:{agent_id}:stop", "1")
        return {"status": "stop_signal_sent"}

    async def get_agent_status(self, agent_id: str):
        redis = await self.get_redis()
        status = await redis.get(f"agent:{agent_id}:status")
        job_id = await redis.get(f"agent:{agent_id}:current_job_id")
        return {
            "status": status.decode('utf-8') if status else "idle",
            "current_job_id": job_id.decode('utf-8') if job_id else None
        }

agent_service = AgentService()
