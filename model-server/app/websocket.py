from fastapi import WebSocket, WebSocketDisconnect
from fastapi import APIRouter
import json
import logging
from .crud import db 
from .ai import chat_with_ai
from datetime import datetime
from fastapi.encoders import jsonable_encoder
from typing import Dict

router = APIRouter()
logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        # Close existing connection if it exists
        if user_id in self.active_connections:
            old_ws = self.active_connections[user_id]
            try:
                await old_ws.close()
            except:
                pass
        self.active_connections[user_id] = websocket
        logger.info(f"User {user_id} connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            logger.info(f"User {user_id} disconnected. Total connections: {len(self.active_connections)}")

    async def send_message(self, message: dict, user_id: str):
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].send_json(jsonable_encoder(message))
            except Exception as e:
                logger.error(f"Error sending message to {user_id}: {str(e)}")
                self.disconnect(user_id)

manager = ConnectionManager()

async def process_message(user_id: str, message: str):
    try:
        # Get AI response first
        ai_response = await chat_with_ai([{"role": "user", "content": message}])
        
        # Store conversation
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
        logger.error(f"Error processing message: {str(e)}")
        return {"error": "Failed to process message"}

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    
    try:
        while True:
            try:
                data = await websocket.receive_text()
                logger.info(f"Received message from {user_id}")
                
                try:
                    message_data = json.loads(data)
                    if "message" not in message_data:
                        continue
                        
                    response = await process_message(user_id, message_data["message"])
                    await manager.send_message(response, user_id)
                    
                except json.JSONDecodeError:
                    await manager.send_message({"error": "Invalid JSON format"}, user_id)
                    
            except WebSocketDisconnect:
                logger.info(f"Client {user_id} disconnected normally")
                break
            except Exception as e:
                logger.error(f"Connection error for {user_id}: {str(e)}")
                break
                
    finally:
        manager.disconnect(user_id)