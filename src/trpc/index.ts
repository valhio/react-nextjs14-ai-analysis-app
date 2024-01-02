import { privateProcedure, publicProcedure, router } from './trpc';
import prisma from '@/lib/prismadb';

export const appRouter = router({
    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx; // ctx is the context object that we passed to the next function in the isAuth middleware in src/trpc/trpc.ts

        return await prisma.file.findMany({
            where: {
                userId
            }
        });
    }
    )

})

export type AppRouter = typeof appRouter;