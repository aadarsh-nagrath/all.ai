from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .websocket import router as ws_router
import redis
import asyncio
from .crud import db
from typing import List
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during development
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

@app.get("/api/chats/{user_id}")
async def get_user_chats(user_id: str):
    try:
        # Get all communication sessions for the user
        sessions = await db.communication_sessions.find(
            {"user_id": user_id},
            {"_id": 0, "communication_id": 1, "messages": 1, "created_at": 1, "updated_at": 1}
        ).to_list(length=None)
        
        # Format the sessions to include the first user message as title
        formatted_sessions = []
        for session in sessions:
            # Find the first user message
            first_user_message = next(
                (msg["content"] for msg in session["messages"] if msg["role"] == "user"),
                "New Chat"
            )
            
            formatted_sessions.append({
                "id": session["communication_id"],
                "title": first_user_message,
                "created_at": session["created_at"],
                "updated_at": session["updated_at"]
            })
        
        return formatted_sessions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/chats/{chat_id}")
async def delete_chat(chat_id: str):
    try:
        # Delete the communication session
        result = await db.communication_sessions.delete_one({"communication_id": chat_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Chat not found")
            
        return {"status": "success", "message": "Chat deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))