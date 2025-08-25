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
    try:
        await db.connect()
        if await db.test_connection():
            print("✅ MongoDB connection successful")
        else:
            print("❌ MongoDB connection failed")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {str(e)}")
        raise

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/agent/{agent_name}")
async def get_agent_by_name(agent_name: str):
    try:
        # Get agent information from the agents collection
        agent = await db.agents.find_one({"title": agent_name})
        
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        return {
            "title": agent["title"],
            "description": agent["description"],
            "prompt": agent["prompt"],
            "category": agent["category"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chats/user/{user_id}")
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

@app.get("/api/chats/session/{chat_id}")
async def get_chat(chat_id: str):
    try:
        print(f"Fetching chat with ID: {chat_id}")
        # Get the specific communication session
        session = await db.communication_sessions.find_one(
            {"communication_id": chat_id}
        )
        
        if not session:
            print(f"Chat not found for ID: {chat_id}")
            raise HTTPException(status_code=404, detail="Chat not found")
        
        print(f"Found session: {session}")
        
        # Format the messages to match the expected structure
        formatted_messages = []
        for msg in session.get("messages", []):
            if msg["role"] != "system":  # Skip system messages
                formatted_messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
        
        print(f"Formatted messages: {formatted_messages}")
        
        response = {
            "id": session["communication_id"],
            "messages": formatted_messages,
            "created_at": session["created_at"],
            "updated_at": session["updated_at"]
        }
        
        print(f"Returning response: {response}")
        return response
    except Exception as e:
        print(f"Error in get_chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))