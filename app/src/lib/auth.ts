// lib/auth.ts (or any utils file)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const getSessionAndStatus = async () => {
  const session = await getServerSession(authOptions);
  const status = session ? "authenticated" : "unauthenticated";
  return { session, status };
};
