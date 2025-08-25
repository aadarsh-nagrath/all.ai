from fastapi import WebSocket, WebSocketDisconnect
from fastapi import APIRouter
import json
import logging
from .crud import db 
from .ai import chat_with_ai
from datetime import datetime
import asyncio
from .communication_session import (
    create_communication_session, 
    update_communication_session, 
    deactivate_communication_session,
    get_active_session
)

router = APIRouter()
logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}
        self.user_sessions: dict[str, str] = {}  # user_id -> communication_id
        self._db_initialized = False

    async def initialize_db(self):
        if not self._db_initialized:
            await db.connect()
            self._db_initialized = True

    async def connect(self, websocket: WebSocket, user_id: str):
        try:
            await self.initialize_db()
            logger.info(f"Attempting to accept WebSocket connection for user {user_id}")
            await websocket.accept()
            logger.info(f"WebSocket connection accepted for user {user_id}")
            
            self.active_connections[user_id] = websocket
            logger.info(f"Added connection to active_connections for user {user_id}")
            
            # Check for existing active session
            active_session = await get_active_session(user_id)
            if active_session:
                communication_id = active_session["communication_id"]
                logger.info(f"Using existing active session {communication_id} for user {user_id}")
            else:
                # Create a new communication session
                communication_id = await create_communication_session(user_id)
                logger.info(f"Created new communication session {communication_id} for user {user_id}")
            
            self.user_sessions[user_id] = communication_id
            
        except Exception as e:
            logger.error(f"Error during connection for user {user_id}: {str(e)}")
            raise

    def disconnect(self, user_id: str):
        try:
            logger.info(f"Starting disconnect process for user {user_id}")
            if user_id in self.active_connections:
                del self.active_connections[user_id]
                logger.info(f"Removed connection from active_connections for user {user_id}")
            if user_id in self.user_sessions:
                communication_id = self.user_sessions[user_id]
                asyncio.create_task(deactivate_communication_session(communication_id))
                del self.user_sessions[user_id]
                logger.info(f"Removed communication session {communication_id} for user {user_id}")
            logger.info(f"Completed disconnect process for user {user_id}")
        except Exception as e:
            logger.error(f"Error during disconnect for user {user_id}: {str(e)}")

    async def send_message(self, message: str, user_id: str):
        if user_id in self.active_connections:
            try:
                logger.info(f"Sending message to user {user_id}")
                await self.active_connections[user_id].send_text(message)
                logger.info(f"Message sent successfully to user {user_id}")
            except Exception as e:
                logger.error(f"Error sending message to {user_id}: {str(e)}")
                self.disconnect(user_id)

manager = ConnectionManager()

async def process_message(user_id: str, message: str, conversation_id: str = None, model_info: dict = None, agent_name: str = None):
    try:
        logger.info(f"Processing message for user {user_id}")
        
        # Get the session - either by conversation_id or active session
        session = None
        if conversation_id:
            logger.info(f"Using provided conversation_id: {conversation_id}")
            session = await db.communication_sessions.find_one({"communication_id": conversation_id})
            if session:
                # Make this the active session
                await db.communication_sessions.update_many(
                    {"user_id": user_id},
                    {"$set": {"is_active": False}}
                )
                await db.communication_sessions.update_one(
                    {"communication_id": conversation_id},
                    {"$set": {"is_active": True}}
                )
        
        if not session:
            logger.info(f"No session found with conversation_id, getting active session")
            session = await get_active_session(user_id)
            if not session:
                logger.error(f"No active session found for user {user_id}")
                return {"error": "No active session found"}
            
        # Get the conversation history
        conversation_history = session.get("messages", [])
        
        # Check if we have an agent selected and get its prompt
        system_prompt = None
        if agent_name:
            try:
                logger.info(f"Fetching agent prompt for: {agent_name}")
                agent = await db.agents.find_one({"title": agent_name})
                if agent:
                    system_prompt = agent["prompt"]
                    logger.info(f"Using agent prompt for {agent_name}")
                else:
                    logger.warning(f"Agent {agent_name} not found in database")
            except Exception as e:
                logger.error(f"Error fetching agent prompt: {str(e)}")
        
        # Add system prompt if we have one and it's not already in the conversation
        if system_prompt and not any(msg.get("role") == "system" for msg in conversation_history):
            conversation_history.insert(0, {"role": "system", "content": system_prompt})
            logger.info(f"Added system prompt for agent: {agent_name}")
        
        # Add the new user message to the history
        conversation_history.append({"role": "user", "content": message})
        
        # Process the message with AI using the full conversation history and model info
        ai_response = await chat_with_ai(conversation_history, model_info)
        logger.info(f"AI response generated for user {user_id}")
        
        return {
            "message": ai_response,
            "is_final": True
        }
    except Exception as e:
        logger.error(f"Error processing message: {str(e)}")
        return {"error": "Failed to process message"}

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    logger.info(f"New WebSocket connection request for user {user_id}")
    try:
        await manager.connect(websocket, user_id)
        logger.info(f"WebSocket connection established for user {user_id}")
        
        while True:
            try:
                logger.info(f"Waiting for message from user {user_id}")
                data = await websocket.receive_text()
                logger.info(f"Received message from {user_id}: {data[:100]}...")
                
                try:
                    message_data = json.loads(data)
                    logger.info(f"Received message data: {message_data}")
                    
                    if "message" not in message_data:
                        logger.warning(f"Message missing 'message' field from user {user_id}")
                        continue
                    
                    # Extract model information from the message
                    model_info = message_data.get("model")
                    if model_info:
                        logger.info(f"Received model info for user {user_id}: {model_info}")
                        logger.info(f"Model type: {model_info.get('type')}, API model: {model_info.get('api_model')}")
                    else:
                        logger.info(f"No model info provided for user {user_id}, using default")
                    
                    # Extract agent name from the message
                    agent_name = message_data.get("agent_name")
                    if agent_name:
                        logger.info(f"Received agent name for user {user_id}: {agent_name}")
                    else:
                        logger.info(f"No agent name provided for user {user_id}, using default system prompt")
                    
                    # Process the message and get AI response
                    response = await process_message(
                        user_id, 
                        message_data["message"],
                        message_data.get("conversation_id"),
                        model_info,
                        agent_name
                    )
                    
                    if "error" in response:
                        logger.error(f"Error in response for user {user_id}: {response['error']}")
                        await manager.send_message(
                            json.dumps({
                                "type": "error",
                                "message": response["error"]
                            }),
                            user_id
                        )
                        continue
                    
                    # Update the communication session with the new messages
                    communication_id = message_data.get("conversation_id") or manager.user_sessions.get(user_id)
                    if communication_id:
                        await update_communication_session(
                            communication_id,
                            user_id,
                            message_data["message"],
                            response["message"]
                        )
                    
                    # Send the response back to the user
                    await manager.send_message(
                        json.dumps({
                            "message": response["message"],
                            "is_final": response.get("is_final", True)
                        }),
                        user_id
                    )
                    logger.info(f"Response sent to user {user_id} with agent: {agent_name}")
                    
                except json.JSONDecodeError:
                    logger.error(f"Invalid JSON received from {user_id}")
                    continue
                    
            except WebSocketDisconnect:
                logger.info(f"Client {user_id} disconnected")
                manager.disconnect(user_id)
                break
            except Exception as e:
                logger.error(f"Error processing message from {user_id}: {str(e)}")
                continue
                
    except WebSocketDisconnect:
        logger.info(f"Client {user_id} disconnected")
        manager.disconnect(user_id)
    except Exception as e:
        logger.error(f"Unexpected error for {user_id}: {str(e)}")
        manager.disconnect(user_id)