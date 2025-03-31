from fastapi import WebSocket, WebSocketDisconnect
from fastapi import APIRouter
import json
import logging
from .crud import db 
from .ai import chat_with_ai
from datetime import datetime
import asyncio

router = APIRouter()
logger = logging.getLogger(__name__)

active_connections = {}

async def keep_connection_alive(websocket: WebSocket):
    while True:
        try:
            await asyncio.sleep(15)  # Send ping every 15 seconds
            if websocket.client_state == "connected":
                await websocket.send_json({"type": "ping"})
        except Exception as e:
            logger.warning(f"Keepalive error: {e}")
            break

async def process_message(user_id: str, message: str):
    try:
        ai_response = await chat_with_ai([{"role": "user", "content": message}])
        
        conv_data = {
            "user_id": user_id,
            "title": message[:30],
            "messages": [
                {"role": "user", "content": message},
                {"role": "assistant", "content": ai_response}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_archived": False
        }
        
        result = await db.conversations.insert_one(conv_data)
        return {
            "conversation_id": str(result.inserted_id),
            "message": ai_response
        }
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        return {"error": "Failed to process message"}

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    active_connections[user_id] = websocket
    logger.info(f"User {user_id} connected - maintaining persistent connection")
    
    # Start keepalive task
    keepalive_task = asyncio.create_task(keep_connection_alive(websocket))
    
    try:
        while True:
            data = await websocket.receive_text()
            
            try:
                message_data = json.loads(data)
                if "message" not in message_data:
                    continue
                    
                response = await process_message(user_id, message_data["message"])
                await websocket.send_json(response)
                
            except json.JSONDecodeError:
                await websocket.send_json({"error": "Invalid JSON"})
                
    except WebSocketDisconnect:
        logger.info(f"Client {user_id} disconnected")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
    finally:
        keepalive_task.cancel()
        try:
            await keepalive_task
        except:
            pass
        if user_id in active_connections:
            del active_connections[user_id]