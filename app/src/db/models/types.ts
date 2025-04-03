import { Document, Types } from "mongoose";

export interface ISubscription {
  plan: string;
  date: Date;
  status: boolean;
}

export interface IPreferences {
  defaultModel: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  active_subscription: ISubscription;
  subscription_history: ISubscription[];
  currentConversationId?: Types.ObjectId;
  preferences: IPreferences;
}

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