import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://root:example@localhost:27017";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "mydatabase",
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
