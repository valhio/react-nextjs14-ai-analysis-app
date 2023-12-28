import { PrismaClient } from "@prisma/client";

// What this file does is it creates a global variable called prisma, which is an instance of PrismaClient. This is so that we can use the same instance of PrismaClient throughout our application. This is important because PrismaClient is a singleton, which means that it should only be instantiated once per application. If we don't do this, we will get an error saying that we are instantiating PrismaClient more than once.
declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if( process.env.NODE_ENV !== "production" ) globalThis.prisma = client;

export default client;