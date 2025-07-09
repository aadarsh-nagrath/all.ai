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
    const user = await db.collection('users').findOne({ _id: new ObjectId(params.id) });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
} 