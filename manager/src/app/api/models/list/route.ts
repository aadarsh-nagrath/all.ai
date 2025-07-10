import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

export async function GET() {
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    const db = client.db(dbName);
    const models = await db.collection('llm-models').find({}).toArray();
    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
} 