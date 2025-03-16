import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            include: {
                profile: true,
                userCredits: {
                    include: {
                        creditsHistory: true,
                    },
                },
                creditsHistory: true,
            },
        });

        if (!user) {
            return NextResponse.json({ user: null }, { status: 404 });
        }

        return NextResponse.json({ user: user });
    } catch (error) {
        console.error('Error fetching user info:', error);
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({ user: null, error: error.message }, { status: 500 });
        }
        return NextResponse.json({ user: null }, { status: 500 });
    }
}