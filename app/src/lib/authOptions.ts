import { NextAuthOptions, Profile as DefaultProfile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/db/connect";
import User from "@/db/models/user";

interface CustomProfile extends DefaultProfile {
  picture?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_API_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }:{profile?: CustomProfile }) {
      try {
        await connectDB();

        if (!profile || !profile.email || !profile.name || !profile.picture) {
          console.error("Profile data is incomplete");
          return false;
        }

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            active_subscription: {
              plan: "Basic",
              date: new Date(),
              status: true,
            },
            subscription_history: [],
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        await connectDB();
        
        if (session.user) {
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user = {
              ...session.user,
              name: dbUser.name,
              email: dbUser.email,
              image: dbUser.image,
            };
          }
        }
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session; // Return session even if DB lookup fails
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};