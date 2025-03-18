import { NextResponse } from 'next/server';
import Prompt from '@/db/models/prompt';
import { connectDB } from '@/db/connect';

export async function GET() {
  await connectDB(); // Ensure MongoDB is connected

  try {
    const prompts = await Prompt.find({});
    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch prompts', error }, { status: 500 });
  }
}