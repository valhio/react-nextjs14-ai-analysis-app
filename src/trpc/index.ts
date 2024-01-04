import { getRandomGradient, getRandomGradientDirection } from '@/actions/getRandomAvatar';
import { privateProcedure, publicProcedure, router } from './trpc';
import prisma from '@/lib/prismadb';
import { TRPCError } from '@trpc/server';
import z from 'zod';
import { File } from '@prisma/client';
import getFileById from '@/actions/getFileById';

export const appRouter = router({
    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx; // ctx is the context object that we passed to the next function in the isAuth middleware in src/trpc/trpc.ts

        return await prisma.file.findMany({
            where: {
                userId
            }
        });
    }),

    // The deleteFile nets a post request body in the form of object with an id string property ({id: string}). If the request body doesn't match this schema, the request will fail with a 400 error.
    deleteFile: privateProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId, } = ctx;
            const file = await prisma.file.findFirst({
                where: {
                    id: input.id,
                    userId
                }
            });

            if (!file) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'File not found'
                });
            }

            await prisma.file.delete({
                where: {
                    id: file.id,
                    userId
                }
            });

            return file;
        }),

    uploadFile: privateProcedure
        .input(z.object({ key: z.string(), name: z.string(), url: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const createdFile: File = await prisma.file.create({
                data: {
                    key: input.key,
                    name: input.name,
                    userId: userId,
                    url: input.url,
                    avatar: `${ getRandomGradient() + " " + getRandomGradientDirection() }`,
                    uploadStatus: 'PROCESSING',
                },
            })

            return createdFile;
        }),

    getFileById: privateProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx
            console.log('userId', userId);
            console.log("fileId", input.id);



            const file = await prisma.file.findFirst({
                where: {
                    key: input.id,
                    userId,
                },
            })

            if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

            return file
        }),

})

export type AppRouter = typeof appRouter;