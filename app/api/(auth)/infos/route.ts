// /app/api/(auth)/infos/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ users: null }, { status: 401 });
    }

    try {
        // Vérifier si l'utilisateur est un admin
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ users: null }, { status: 403 });
        }

        const users = await db.user.findMany({
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

        return NextResponse.json({ users: users });
    } catch (error) {
        console.error('Error fetching all users:', error);
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({ users: null, error: error.message }, { status: 500 });
        }
        return NextResponse.json({ users: null }, { status: 500 });
    }
}