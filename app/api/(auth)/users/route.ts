// /app/api/(auth)/users/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Si l'utilisateur est admin, récupérer tous les utilisateurs
        if (user.role === 'admin') {
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
        } else {
            // Sinon, récupérer uniquement les informations de l'utilisateur connecté
            const userWithRelations = await db.user.findUnique({
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
            return NextResponse.json({ user: userWithRelations });
        }
    } catch (error) {
        console.error('Error fetching user(s) info:', error);
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}