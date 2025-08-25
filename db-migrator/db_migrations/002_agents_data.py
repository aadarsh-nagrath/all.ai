from motor.motor_asyncio import AsyncIOMotorClient
from models import Agent
from agents_data import agents_data
import asyncio

MONGO_DETAILS = "mongodb://root:example@mongodb:27017/"
DATABASE_NAME = "allai"
AGENTS_COLLECTION_NAME = "agents"

async def migrate_agents():
    client = AsyncIOMotorClient(MONGO_DETAILS)
    database = client[DATABASE_NAME]
    
    # Check if collection exists
    collections = await database.list_collection_names()
    if AGENTS_COLLECTION_NAME not in collections:
        print(f"Collection '{AGENTS_COLLECTION_NAME}' not found. Creating...")
    else:
        print(f"Collection '{AGENTS_COLLECTION_NAME}' already exists.")
    
    agents_collection = database.get_collection(AGENTS_COLLECTION_NAME)
    
    # Insert agents data
    inserted_count = 0
    skipped_count = 0
    
    for agent_data in agents_data:
        # Check if agent already exists
        existing_agent = await agents_collection.find_one({"title": agent_data["title"]})
        if existing_agent is None:
            agent = Agent(**agent_data)
            await agents_collection.insert_one(agent.dict())
            inserted_count += 1
            print(f"Inserted new agent: {agent_data['title']}")
        else:
            skipped_count += 1
            print(f"Agent already exists: {agent_data['title']}")
    
    # Print collection stats
    total_count = await agents_collection.count_documents({})
    print(f"Total agents in collection: {total_count}")
    print(f"Inserted: {inserted_count}, Skipped: {skipped_count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate_agents()) 