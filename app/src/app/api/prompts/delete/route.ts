// app/api/prompts/delete/route.ts
import { NextResponse } from 'next/server';
import Prompt from '@/db/models/prompt';
import { connectDB } from '@/db/connect';

export async function DELETE(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Prompt ID is required' }, { status: 400 });
    }

    await Prompt.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Prompt deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting prompt:', error);
    return NextResponse.json({ message: 'Failed to delete prompt', error }, { status: 500 });
  }
}