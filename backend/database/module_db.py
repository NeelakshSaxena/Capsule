import json
from arq.connections import create_pool
from backend.queues.queue_config import redis_settings

class ModuleDB:
    def __init__(self):
        self.redis_pool = None

    async def get_redis(self):
        if not self.redis_pool:
            self.redis_pool = await create_pool(redis_settings)
        return self.redis_pool

    async def get_module_state(self, module_id: str):
        redis = await self.get_redis()
        enabled = await redis.get(f"module:{module_id}:enabled")
        settings = await redis.get(f"module:{module_id}:settings")

        return {
            "enabled": enabled.decode("utf-8") == "1" if enabled else False,
            "settings": json.loads(settings) if settings else {}
        }

    async def set_module_enabled(self, module_id: str, enabled: bool):
        redis = await self.get_redis()
        await redis.set(f"module:{module_id}:enabled", "1" if enabled else "0")

    async def set_module_settings(self, module_id: str, settings: dict):
        redis = await self.get_redis()
        await redis.set(f"module:{module_id}:settings", json.dumps(settings))
        
    async def remove_module_state(self, module_id: str):
        redis = await self.get_redis()
        await redis.delete(f"module:{module_id}:enabled")
        await redis.delete(f"module:{module_id}:settings")

module_db = ModuleDB()
