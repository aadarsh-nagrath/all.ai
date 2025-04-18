import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI environment variable");
}

// Type for our cached connection
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Global variable declaration with proper typing
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

// Initialize the cache if it doesn't exist
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

const cached = global.mongooseCache;

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      dbName: process.env.DATABASE_NAME,
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Connected");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("MongoDB Connection Error:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};