from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Any

class Message(BaseModel):
    role: str 
    content: str
    timestamp: datetime = None

class CommunicationSession(BaseModel):
    communication_id: str
    user_id: str
    messages: List[Message]
    created_at: datetime
    updated_at: datetime
    is_active: bool = True

class Conversation(BaseModel):
    user_id: str
    title: str
    communication_id: str
    created_at: datetime
    updated_at: datetime
    is_archived: bool = False