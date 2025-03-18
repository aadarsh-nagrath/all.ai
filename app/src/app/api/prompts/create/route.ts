// app/api/prompts/create/route.ts
import { NextResponse } from 'next/server';
import Prompt from '@/db/models/prompt';
import { connectDB } from '@/db/connect';

export async function POST(req: Request) {
  await connectDB(); // Ensure MongoDB is connected

  try {
    const body = await req.json();
    console.log('Request body:', body); // Log the request body

    const { title, description, content, category, createdBy } = body;

    // Validate required fields
    if (!title || !description || !content || !category || !createdBy) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const newPrompt = new Prompt({ title, description, content, category, createdBy });
    await newPrompt.save();

    console.log('Prompt created:', newPrompt); // Log the created prompt
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ message: 'Failed to create prompt', error }, { status: 500 });
  }
}