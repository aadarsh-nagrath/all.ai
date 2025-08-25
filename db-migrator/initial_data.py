from motor.motor_asyncio import AsyncIOMotorClient
from models import LLMModel, ProviderInfo, Agent
from agents_data import agents_data
from datetime import datetime
import asyncio

MONGO_DETAILS = "mongodb://root:example@mongodb:27017/"
DATABASE_NAME = "allai"
LLM_COLLECTION_NAME = "llm-models"
AGENTS_COLLECTION_NAME = "agents"

async def migrate():
    client = AsyncIOMotorClient(MONGO_DETAILS)
    database = client[DATABASE_NAME]
    
    # Migrate LLM Models
    await migrate_llm_models(database)
    
    # Migrate Agents
    await migrate_agents(database)
    
    client.close()

async def migrate_llm_models(database):
    # Check if collection exists
    collections = await database.list_collection_names()
    if LLM_COLLECTION_NAME not in collections:
        print(f"Collection '{LLM_COLLECTION_NAME}' not found. Creating...")
    else:
        print(f"Collection '{LLM_COLLECTION_NAME}' already exists.")
    
    llm_models_collection = database.get_collection(LLM_COLLECTION_NAME)

    # Example model data
    model_data = LLMModel(
        model_name="Qwen2.5 VL 32B Instruct",
        provider=[
            ProviderInfo(
                name="Alibaba",
                region="CN",
                context_length=8000,
                latency="2.08s",
                throughput="37.87 tps"
            ),
            ProviderInfo(
                name="Chutes",
                region="US",
                context_length=33000,
                latency="2.68s",
                throughput="48.66 tps"
            )
        ],
        status="active",
        parameters="32B",
        context_length=33000,
        max_output_length=33000,
        last_updated=datetime(2025, 3, 24),
        tag="new",
        Performance="97.5%",
        Response_Time="2.38s",
        Cost="$0/1K",
        Success_Rate="99.8%",
        short_description="Multimodal model for vision, math, and code tasks.",
        long_description="Qwen2.5-VL-32B is a multimodal vision-language model fine-tuned for advanced mathematical reasoning, structured outputs, and visual problem-solving. It excels in visual analysis, object recognition, textual interpretation in images, and event localization in videos. With top performance on benchmarks like MMMU, MathVista, VideoMME, and MMLU, it also supports strong text-based tasks such as code generation and complex reasoning.",
        usecase=[
            "Visual problem-solving",
            "Mathematical reasoning",
            "Code generation",
            "Event localization in videos"
        ],
        key_features=[
            "Enhanced multimodal benchmarks",
            "Precise visual analysis",
            "Strong text-based reasoning"
        ],
        precision="bf16",
        benchmarks=["MMMU", "MathVista", "VideoMME", "MMLU"],
        model_weights_available=True,
        api_compatibility="OpenAI-compatible",
        api_model="qwen2.5-vl-32b",
        type="multimodal"
    )

    # Check if model exists and insert if it doesn't
    existing_model = await llm_models_collection.find_one({"model_name": model_data.model_name})
    if existing_model is None:
        await llm_models_collection.insert_one(model_data.dict())
        print(f"Inserted new LLM model: {model_data.model_name}")
    else:
        print(f"LLM model already exists: {model_data.model_name}")
    
    # Print collection stats
    count = await llm_models_collection.count_documents({})
    print(f"Total LLM models in collection: {count}")

async def migrate_agents(database):
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

if __name__ == "__main__":
    asyncio.run(migrate()) 