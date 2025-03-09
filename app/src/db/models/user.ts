import mongoose, { Schema, Document } from "mongoose";

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

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);