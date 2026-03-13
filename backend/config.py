import os

class Config:
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
    QDRANT_URL = os.getenv("QDRANT_URL", "localhost")
    POSTGRES_URL = os.getenv("POSTGRES_URL", "postgresql://user:password@localhost/capsule")

config = Config()
