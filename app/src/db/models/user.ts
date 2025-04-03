// db/models/user.ts
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
  firstName: string;
  lastName: string;
  country?: string;
  dob?: Date;
  bio?: string;
  profileBg?: string;
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
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  country: { type: String },
  dob: { type: Date },
  bio: { type: String, default: "" },
  profileBg: { type: String },
  active_subscription: { type: SubscriptionSchema, default: () => ({}) },
  subscription_history: { type: [SubscriptionSchema], default: [] },
});

const User: Model<IUser> = 
  mongoose.models && mongoose.models.User
    ? (mongoose.models.User as Model<IUser>)
    : mongoose.model<IUser>("User", UserSchema);

export default User;