import os
import asyncio
from dotenv import load_dotenv
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_community.utilities import SerpAPIWrapper

load_dotenv()

def execute_web_search(query: str) -> str:
    """Execute a web search using SerpAPI (if key exists) or DuckDuckGo."""
    serp_key = os.getenv("SERP_API") or os.getenv("SERPAPI_API_KEY")
    try:
        if serp_key:
            # Using SerpAPI for DuckDuckGo
            search = SerpAPIWrapper(serpapi_api_key=serp_key, params={"engine": "duckduckgo"})
            return search.run(query)
        else:
            # Fallback to direct DuckDuckGo package
            search = DuckDuckGoSearchRun()
            return search.run(query)
    except Exception as e:
        return f"Search failed: {str(e)}"

async def execute_agent_call(agent_id: str, task: str) -> str:
    """Enqueues another agent to perform a task."""
    # Local import to prevent circular dependency
    from backend.services.agent_service import agent_service 
    
    config = {
        "system_prompt": task,
        "tools": ["web_search"],
        "memory_mode": "scoped"
    }
    result = await agent_service.start_agent(agent_id, config)
    return f"Successfully delegated to {agent_id}. Job ID: {result.get('job_id')}"

class ToolRegistry:
    def __init__(self):
        self.tools = {
            "web_search": execute_web_search,
            "agent_call": execute_agent_call
        }
        
    async def invoke_tool(self, tool_name: str, **kwargs):
        if tool_name not in self.tools:
            raise ValueError(f"Tool {tool_name} not found")
        
        tool_func = self.tools[tool_name]
        # Execute asynchronously if it's a coroutine, otherwise run synchronously
        if asyncio.iscoroutinefunction(tool_func):
            return await tool_func(**kwargs)
        else:
            # Run blocking functions (like web_search) in a thread pool executor to not block async loop
            return await asyncio.to_thread(tool_func, **kwargs)

tool_registry = ToolRegistry()
