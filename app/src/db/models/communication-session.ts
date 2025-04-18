import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMessage {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface ICommunicationSession extends Document {
  communicationId: string;
  userId: Types.ObjectId;
  messages: IMessage[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["system", "user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const CommunicationSessionSchema = new Schema<ICommunicationSession>(
  {
    communicationId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: { type: [MessageSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { 
    timestamps: true,
    collection: "communication_sessions" // Explicit collection name
  }
);

// Create index for faster queries
CommunicationSessionSchema.index({ communicationId: 1, userId: 1 });

const CommunicationSession: Model<ICommunicationSession> =
  mongoose.models && mongoose.models.CommunicationSession
    ? (mongoose.models.CommunicationSession as Model<ICommunicationSession>)
    : mongoose.model<ICommunicationSession>("CommunicationSession", CommunicationSessionSchema);

export default CommunicationSession; 