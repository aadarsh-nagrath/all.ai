"use client";
import { useSession } from "next-auth/react";

export const useClientSession = () => {
  const { data: session, status } = useSession();
  return { session, status };
};
