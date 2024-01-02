import bcrypt from 'bcrypt';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing parameters', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({ // Create user in database with prisma client (ORM) 
            data: {
                email: email,
                name,
                hashedPassword: hashedPassword,
                image: `https://ui-avatars.com/api/?name=${ name.toUpperCase() }&background=random&size=128&rounded=true&color=fff&bold=true`,
            }
        });

        return NextResponse.json(user, { status: 201 }); // 201 = Created
    } catch (error) {
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse('Something went wrong', { status: 500 });
    }
}