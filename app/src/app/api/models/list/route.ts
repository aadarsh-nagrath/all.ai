import { NextResponse } from 'next/server';
import { connectDB } from '@/db/connect';
import LlmModel from '@/db/models/llm-model';

export async function GET() {
  await connectDB();
  try {
    const models = await LlmModel.find({});
    return NextResponse.json(models);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch models', error }, { status: 500 });
  }
} 