import NextAuth, { type NextAuthOptions, type User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/db/connect";
import User from "@/db/models/user";
import { type AdapterUser } from "next-auth/adapters";
import { type Session } from "next-auth";
import { type Profile } from "next-auth";
import { type Profile as DefaultProfile } from "next-auth";

interface CustomProfile extends DefaultProfile {
  picture?: string; // Add the `picture` property
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_API_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: NextAuthUser | AdapterUser; account: any; profile?: CustomProfile }) {
      await connectDB();
    
      console.log("Profile:", profile); // Log the profile object for debugging
    
      // Ensure profile has the required properties
      if (!profile || !profile.email || !profile.name || !profile.picture) {
        console.error("Profile data is incomplete");
        return false; // Deny sign-in if profile data is incomplete
      }
    
      const existingUser = await User.findOne({ email: profile.email });
    
      if (!existingUser) {
        await User.create({
          name: profile.name,
          email: profile.email,
          image: profile.picture, // Use `picture` instead of `image`
          active_subscription: {
            plan: "Basic",
            date: new Date(),
            status: true,
          },
          subscription_history: [],
        });
      }
    
      return true;
    },
    async session({ session, user }: { session: Session; user: NextAuthUser | AdapterUser }) {
      if (session.user) {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser._id.toString(), // Ensure `id` is a string
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.picture,
            active_subscription: dbUser.active_subscription,
            subscription_history: dbUser.subscription_history,
          };
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };