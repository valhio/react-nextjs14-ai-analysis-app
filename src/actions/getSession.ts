import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"

 export default async function getSession(){ // What this function does is it gets the session from the server and returns it
    return await getServerSession(authOptions); // authOptions comes from app/api/auth/[...nextAuth]/route.ts and it's the same options we pass to NextAuth.
 }