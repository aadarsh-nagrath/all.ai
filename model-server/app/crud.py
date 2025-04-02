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
        self._connect()

    def _connect(self):
        try:
            self.client = AsyncIOMotorClient(MONGODB_URI)
            self.db = self.client.get_default_database()
            self.conversations = self.db.conversations
            logger.info("MongoDB client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize MongoDB client: {str(e)}")
            raise

    async def test_connection(self):
        try:
            await self.client.admin.command('ping')
            logger.info("✅ MongoDB connection successful")
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