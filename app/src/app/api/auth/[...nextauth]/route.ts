import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // your Google client ID
      clientSecret: process.env.GOOGLE_API_SECRET!, // your Google client secret
    }),
  ],
  // Add any additional NextAuth configuration here
};



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
