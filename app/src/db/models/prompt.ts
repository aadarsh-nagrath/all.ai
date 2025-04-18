// models/Prompt.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPrompt extends Document {
  title: string;
  description: string;
  content: string;
  category: string;
  createdBy: string; // This will store the user's email
  createdAt: Date;
  updatedAt: Date;
}

const PromptSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Prompt || mongoose.model<IPrompt>('Prompt', PromptSchema);