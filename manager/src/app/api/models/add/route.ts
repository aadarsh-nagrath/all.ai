import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

export async function POST(request: Request) {
  const client = new MongoClient(uri!);
  try {
    const data = await request.json();
    data.last_updated = new Date(); // Always set last_updated to now
    if (!data.model_icon) {
      data.model_icon = ""; // Default: empty string (frontend will show default icon)
    }
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('llm-models').insertOne(data);
    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
} 