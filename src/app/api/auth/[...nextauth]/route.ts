import authOptions from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } // We need to export the handler twice because NextAuth uses the same handler for GET and POST requests