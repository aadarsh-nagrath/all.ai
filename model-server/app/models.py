from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class Message(BaseModel):
    role: str 
    content: str
    timestamp: datetime = None

class Conversation(BaseModel):
    user_id: str
    title: str
    messages: List[Message] = []
    created_at: datetime = None
    updated_at: datetime = None
    is_archived: bool = False