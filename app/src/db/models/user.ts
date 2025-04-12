import mongoose, { Schema, Document, Model, Types } from "mongoose";

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

const SubscriptionSchema = new Schema<ISubscription>({
  plan: { type: String, default: "Basic" },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
});

const PreferencesSchema = new Schema<IPreferences>({
  defaultModel: { type: String, default: "qwen/qwen-vl-plus:free" },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  active_subscription: { type: SubscriptionSchema, default: () => ({}) },
  subscription_history: { type: [SubscriptionSchema], default: [] },
  currentConversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
  preferences: { type: PreferencesSchema, default: () => ({}) },
});

const User: Model<IUser> =
  mongoose.models && mongoose.models.User
    ? (mongoose.models.User as Model<IUser>)
    : mongoose.model<IUser>("User", UserSchema);

export default User;