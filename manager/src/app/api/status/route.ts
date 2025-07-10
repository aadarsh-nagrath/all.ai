import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

export async function GET() {
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    // Try a simple command to check connection
    await client.db(dbName).command({ ping: 1 });
    return NextResponse.json({ connected: true });
  } catch (error) {
    return NextResponse.json({ connected: false, error: (error as Error).message || 'Unknown error' }, { status: 500 });
  } finally {
    await client.close();
  }
}
