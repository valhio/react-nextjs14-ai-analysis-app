import getSession from '@/actions/getSession';
import { TRPCError, initTRPC } from '@trpc/server';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Middleware to check if user is authenticated
 * and throw error if not
 */
const middleware = t.middleware;
const isAuth = middleware(async (options) => { // options is a TRPCRequest
    const session: any = await getSession(); // get session from database
    console.log("session is : ", session);
    
    if (!session || !session.user || !session.user.email) { // if invalid session, throw error
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated'
        });        
    }

    // if valid session, continue to next middleware or procedure 
    return options.next({
        ctx: {
            userId: session.user.id,
            user: session.user,
        }
    });
})
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth); // use the isAuth middleware on this procedure.