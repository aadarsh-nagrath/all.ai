import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  userId: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: IMessage[];
  isArchived: boolean;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new Schema<IConversation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    messages: { type: [MessageSchema], default: [] },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Conversation: Model<IConversation> =
  mongoose.models && mongoose.models.Conversation
    ? (mongoose.models.Conversation as Model<IConversation>)
    : mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;