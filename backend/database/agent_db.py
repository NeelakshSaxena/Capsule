import json
import asyncio
from backend.services.agent_service import agent_service

async def get_all_agents():
    redis = await agent_service.get_redis()
    agent_keys = await redis.keys("agent:*:config")
    
    agents = []
    for key in agent_keys:
        agent_data = await redis.get(key)
        if agent_data:
            agent = json.loads(agent_data)
            # Mixin real-time status
            status = await redis.get(f"agent:{agent['id']}:status")
            agent['status'] = status.decode('utf-8') if status else 'idle'
            agents.append(agent)
            
    # Default seed if empty
    if not agents:
        seed_agents = [
            {
                "id": "agent-01",
                "name": "Data Weaver",
                "model": "GPT-4O-ULTRA",
                "system_prompt": "You are a research assistant. Extract and synthesize data.",
                "tools": ["web_search", "agent_call"],
                "memory": {"mode": "scoped"},
                "status": "idle",
                "execution": {"auto_restart": False, "max_concurrency": 2},
                "metrics": {"tasks_completed": 0, "success_rate": 100, "latency": 0},
            }
        ]
        for a in seed_agents:
            await save_agent(a['id'], a)
        return seed_agents

    return agents

async def save_agent(agent_id: str, updates: dict):
    redis = await agent_service.get_redis()
    
    # Retrieve existing
    existing_data = await redis.get(f"agent:{agent_id}:config")
    existing = json.loads(existing_data) if existing_data else {}
    
    # Merge updates
    merged = {**existing, **updates}
    
    # Save back
    await redis.set(f"agent:{agent_id}:config", json.dumps(merged))
    return merged
