import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)

# Get MongoDB URI from environment variable
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://root:example@mongodb:27017/allai?authSource=admin")

class MongoDB:
    def __init__(self):
        self.client = None
        self.db = None
        self.conversations = None
        self.communication_sessions = None

    async def connect(self):
        try:
            self.client = AsyncIOMotorClient(MONGODB_URI)
            # Use the database name directly from the URI
            self.db = self.client["allai"]
            self.conversations = self.db.conversations
            self.communication_sessions = self.db.communication_sessions
            await self.test_connection()
            logger.info("MongoDB client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize MongoDB client: {str(e)}")
            raise

    async def test_connection(self):
        try:
            # Test the connection by listing collections
            collections = await self.db.list_collection_names()
            logger.info(f"✅ MongoDB connection successful. Collections: {collections}")
            return True
        except Exception as e:
            logger.error(f"❌ MongoDB connection failed: {str(e)}")
            return False

    async def create_conversation(self, user_id: str, title: str) -> str:
        conversation = {
            "user_id": user_id,
            "title": title,
            "messages": [],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_archived": False
        }
        result = await self.conversations.insert_one(conversation)
        return str(result.inserted_id)

    async def update_conversation(self, conversation_id: str, messages: list) -> bool:
        result = await self.conversations.update_one(
            {"_id": ObjectId(conversation_id)},
            {"$set": {"messages": messages, "updated_at": datetime.utcnow()}}
        )
        return result.modified_count > 0

# Initialize MongoDB connection
db = MongoDB()