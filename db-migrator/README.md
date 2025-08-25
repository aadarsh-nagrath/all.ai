# DB Migrator - Agents Migration

This directory contains the database migration scripts for the All.AI application, including the new agents table migration.

## Files

- `models.py` - Pydantic models for database entities (LLMModel, Agent)
- `agents_data.py` - Extracted agents data from the categories array
- `initial_data.py` - Main migration script that handles both LLM models and agents
- `db_migrations/002_agents_data.py` - Specific migration script for agents data
- `test_agents_migration.py` - Test script to verify the migration setup

## Agent Model

The `Agent` model includes the following fields:
- `title`: The name of the agent
- `image`: Path to the agent's image
- `description`: Brief description of the agent's capabilities
- `prompt`: The system prompt for the agent
- `category`: The category the agent belongs to

## Categories

The agents are organized into the following categories:
- Lifestyle and Wellness
- Tech
- Design
- Marketing
- Sales
- Finance and Accounting
- Legal
- Customer Support
- Human Resources
- Language Learning
- Entertainment

## Running the Migration

To run the migration:

```bash
# Run the main migration script
python initial_data.py

# Or run the specific agents migration
python db_migrations/002_agents_data.py

# Test the setup
python test_agents_migration.py
```

## Database Details

- **Database**: `allai`
- **Collection**: `agents`
- **Connection**: `mongodb://root:example@mongodb:27017/`

The migration will:
1. Check if the `agents` collection exists
2. Create it if it doesn't exist
3. Insert all agents from the data file
4. Skip any agents that already exist (based on title)
5. Print statistics about the migration

## Data Source

The agents data was extracted from `app/src/lib/data/ai-agent-data.ts` and transformed into a flat structure suitable for database storage. 