// /app/api/auth/role/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ role: null }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            select: { role: true },
        });

        if (!user) {
            return NextResponse.json({ role: null }, { status: 404 });
        }

        return NextResponse.json({ role: user.role });
    } catch (error) {
        console.error('Error fetching user role:', error);
        return NextResponse.json({ role: null }, { status: 500 });
    }
}