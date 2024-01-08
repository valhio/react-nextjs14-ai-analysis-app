import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";


const getFileById = async (fileId: string) => {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser?.email) return null;

        const file = await prisma.file.findUnique({
            where: {
                id: fileId,
                userId: currentUser.id
            },
        })

        if (!file) return null; 

        return file;
    } catch (error: any) {
        return null
    }
}

export default getFileById;
