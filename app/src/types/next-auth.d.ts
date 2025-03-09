import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      active_subscription: {
        plan: string;
        date: Date;
        status: boolean;
      };
      subscription_history: Array<{
        plan: string;
        date: Date;
        status: boolean;
      }>;
    };
  }
}