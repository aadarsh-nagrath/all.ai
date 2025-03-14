import NextAuth, { type NextAuthOptions, type User as NextAuthUser, type Account, type Profile as DefaultProfile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/db/connect";
import User from "@/db/models/user";
import { type Session } from "next-auth";

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
    async signIn({ profile }: { user: NextAuthUser; account: Account | null; profile?: CustomProfile }) {
      await connectDB();

      if (!profile || !profile.email || !profile.name || !profile.picture) {
        console.error("Profile data is incomplete");
        return false; // Deny sign-in if profile data is incomplete
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
    },
    async session({ session }: { session: Session }) {
      if (session.user) {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image, // Use `image` (correct field name)
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
