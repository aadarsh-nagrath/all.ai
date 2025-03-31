from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .websocket import router as ws_router
import redis
import asyncio
from .crud import db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Redis connection
redis_client = redis.Redis(host='redis', port=6379, db=0)

# Include WebSocket router
app.include_router(ws_router)

@app.on_event("startup")
async def startup_event():
    if await db.test_connection():
        print("✅ MongoDB connection successful")
    else:
        print("❌ MongoDB connection failed")

@app.get("/health")
def health_check():
    return {"status": "healthy"}