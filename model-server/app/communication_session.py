from datetime import datetime
from .crud import db
import uuid

def is_empty_session(messages: list) -> bool:
    """Check if a session is empty (only contains system message)"""
    return len(messages) == 1 and messages[0]["role"] == "system"

async def create_communication_session(user_id: str):
    """Create a new communication session for a user"""
    # First, deactivate any existing active sessions for this user
    await db.communication_sessions.update_many(
        {"user_id": user_id, "is_active": True},
        {"$set": {"is_active": False}}
    )
    
    communication_id = str(uuid.uuid4())
    session_data = {
        "communication_id": communication_id,
        "user_id": user_id,
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            }
        ],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_active": True
    }
    
    await db.communication_sessions.insert_one(session_data)
    return communication_id

async def update_communication_session(communication_id: str, user_id: str, message: str, ai_response: str):
    """Update a communication session with new messages"""
    session = await db.communication_sessions.find_one({
        "communication_id": communication_id,
        "user_id": user_id,
        "is_active": True
    })
    
    if not session:
        return None
        
    # Get the current messages and append new ones
    current_messages = session.get("messages", [])
    updated_messages = current_messages + [
        {"role": "user", "content": message},
        {"role": "assistant", "content": ai_response}
    ]
    
    # Update the session with new messages
    await db.communication_sessions.update_one(
        {"communication_id": communication_id},
        {
            "$set": {
                "messages": updated_messages,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return communication_id

async def get_active_session(user_id: str):
    """Get the active communication session for a user"""
    return await db.communication_sessions.find_one({
        "user_id": user_id,
        "is_active": True
    })

async def deactivate_communication_session(communication_id: str):
    """Mark a communication session as inactive or delete if empty"""
    # Get the session first
    session = await db.communication_sessions.find_one({
        "communication_id": communication_id
    })
    
    if not session:
        return
        
    # Check if the session is empty (only system message)
    if is_empty_session(session.get("messages", [])):
        # Delete the empty session
        await db.communication_sessions.delete_one({
            "communication_id": communication_id
        })
    else:
        # Just deactivate non-empty sessions
        await db.communication_sessions.update_one(
            {"communication_id": communication_id},
            {"$set": {"is_active": False}}
        ) 