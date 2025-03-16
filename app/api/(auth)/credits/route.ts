// /app/api/(auth)/role/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ credits: null }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            select: { userCredits: true },
        });

        if (!user) {
            return NextResponse.json({ credits: null }, { status: 404 });
        }

        const credits = user.userCredits ? user.userCredits.credits : 0; // Récupérer les crédits ou 0 si userCredits est null

        return NextResponse.json({ credits: credits });
    } catch (error) {
        console.error('Error fetching user credits:', error);
        return NextResponse.json({ credits: null }, { status: 500 });
    }
}