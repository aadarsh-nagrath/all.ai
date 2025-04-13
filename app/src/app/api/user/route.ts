import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri);
const dbName = process.env.DATABASE_NAME;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}