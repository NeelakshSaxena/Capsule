import asyncio
import json
from datetime import datetime
from backend.queues.queue_config import redis_settings

async def run_agent_loop(ctx, agent_id: str, config: dict):
    """
    The main ARQ worker loop representing an agent's execution lifecycle.
    """
    redis = ctx['redis']
    
    def log_msg(msg: str, detail: str, type: str = "info"):
        log_entry = {
            "time": datetime.now().strftime("%H:%M:%S"),
            "msg": msg,
            "detail": detail,
            "type": type
        }
        return json.dumps(log_entry)

    await redis.publish(f"agent:{agent_id}:logs", log_msg("Agent execution started", f"ID: {agent_id}", "info"))
    
    # 1. INPUT phase
    await redis.publish(f"agent:{agent_id}:logs", log_msg("Processing Input", "Analyzing system prompt and context", "info"))
    await asyncio.sleep(1) # Simulated delay
    
    # Check stop signal
    stop_signal = await redis.get(f"agent:{agent_id}:stop")
    if stop_signal == b"1":
        await redis.publish(f"agent:{agent_id}:logs", log_msg("Execution Aborted", "Stop signal received by user", "warning"))
        await redis.set(f"agent:{agent_id}:status", "idle")
        return {"status": "aborted"}

    # 2. PLAN & LLM Brain (Hardcoded simulation for "First Real Agent" phase)
    await redis.publish(f"agent:{agent_id}:logs", log_msg("Planning", "Invoking LLM to determine next steps...", "info"))
    await asyncio.sleep(2)
    
    # 3. TOOL USE (Mocked for now)
    await redis.publish(f"agent:{agent_id}:logs", log_msg("Tool Execution", f"Evaluating accessible tools: {config.get('tools', [])}", "info"))
    await asyncio.sleep(1.5)

    stop_signal = await redis.get(f"agent:{agent_id}:stop")
    if stop_signal == b"1":
        await redis.publish(f"agent:{agent_id}:logs", log_msg("Execution Aborted", "Stop signal received during tool execution", "warning"))
        await redis.set(f"agent:{agent_id}:status", "idle")
        return {"status": "aborted"}
        
    # 4. MEMORY & OUTPUT
    await redis.publish(f"agent:{agent_id}:logs", log_msg("Memory Update", "Writing new observations to Short-Term Memory", "success"))
    await asyncio.sleep(1)

    # Completion
    await redis.set(f"agent:{agent_id}:status", "idle")
    await redis.publish(f"agent:{agent_id}:logs", log_msg("Task Completed", "Agent successfully finished execution loop", "success"))
    
    return {"status": "success", "agent_id": agent_id}


class WorkerSettings:
    """Settings required by the ARQ worker to run."""
    functions = [run_agent_loop]
    redis_settings = redis_settings
