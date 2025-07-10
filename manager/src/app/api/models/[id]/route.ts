import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

// @ts-expect-error Next.js provides context dynamically
export async function GET(request: Request, { params }) {
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    const db = client.db(dbName);
    const model = await db.collection('llm-models').findOne({ _id: new ObjectId(params.id) });
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
    return NextResponse.json(model, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// @ts-expect-error Next.js provides context dynamically
export async function PATCH(request: Request, { params }) {
  const client = new MongoClient(uri!);
  try {
    const data = await request.json();
    data.last_updated = new Date(); // Always set last_updated to now
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('llm-models').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: data }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
    return NextResponse.json({ updated: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
} 