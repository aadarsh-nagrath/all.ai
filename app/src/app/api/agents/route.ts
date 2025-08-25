import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:example@mongodb_container:27017/';
const DATABASE_NAME = 'allai';
const COLLECTION_NAME = 'agents';

export async function GET() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const database = client.db(DATABASE_NAME);
    const collection = database.collection(COLLECTION_NAME);

    // Get all agents from the database
    const agents = await collection.find({}).toArray();

    await client.close();

    // Group agents by category
    const groupedAgents = agents.reduce((acc: any, agent: any) => {
      const category = agent.category;
      if (!acc[category]) {
        acc[category] = {
          title: category,
          items: []
        };
      }
      acc[category].items.push({
        title: agent.title,
        description: agent.description,
        image: agent.image,
        prompt: agent.prompt
      });
      return acc;
    }, {});

    // Convert to array format
    const categories = Object.values(groupedAgents);

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
} 