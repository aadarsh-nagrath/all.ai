import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscription {
  plan: string;
  date: Date;
  status: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  active_subscription: ISubscription;
  subscription_history: ISubscription[];
}

const SubscriptionSchema = new Schema<ISubscription>({
  plan: { type: String, default: "Basic" },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  active_subscription: { type: SubscriptionSchema, default: () => ({}) },
  subscription_history: { type: [SubscriptionSchema], default: [] },
});

// ✅ Fix: Ensure models object is always defined before accessing properties
const User: Model<IUser> = 
  mongoose.models && mongoose.models.User
    ? (mongoose.models.User as Model<IUser>)
    : mongoose.model<IUser>("User", UserSchema);

export default User;
