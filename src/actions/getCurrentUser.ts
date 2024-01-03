import getSession from "./getSession";
import prisma from "@/lib/prismadb";

const getCurrentUser = async () => {
    try {
        const session = await getSession(); // Get the session from the server

        if(!session?.user?.email) return null; // If there's no user, return null

        const currentUser = await prisma?.user.findUnique({ // Find the user in the database
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser) return null; // If the user doesn't exist, return null

        return currentUser; // Return the user
    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser;