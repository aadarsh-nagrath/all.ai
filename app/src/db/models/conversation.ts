import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface IConversation extends Document {
  userId: Types.ObjectId;
  title: string;
  communicationId?: string;
  messages?: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
  isArchived?: boolean;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const ConversationSchema = new Schema<IConversation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    communicationId: { type: String, sparse: true }, // Optional field
    messages: { type: [MessageSchema], default: [] }, // Keep for backward compatibility
    isArchived: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    collection: "conversations" // Explicit collection name
  }
);

// Create index for faster queries
ConversationSchema.index({ userId: 1, communicationId: 1 });

const Conversation: Model<IConversation> =
  mongoose.models && mongoose.models.Conversation
    ? (mongoose.models.Conversation as Model<IConversation>)
    : mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;