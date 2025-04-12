from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MessageCreate(BaseModel):
    role: str
    content: str

class ConversationCreate(BaseModel):
    user_id: str
    title: str
    messages: List[MessageCreate] = []

class ConversationOut(ConversationCreate):
    id: str
    created_at: datetime
    updated_at: datetime

class UserConversation(BaseModel):
    id: str
    title: str
    updated_at: datetime