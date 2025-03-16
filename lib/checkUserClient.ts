// lib/checkUserClient.ts
"use client";
import { useUser } from "@clerk/nextjs";

export async function checkUserClient(): Promise<string | null> {
    const { isLoaded, userId } = useUser();

    if (!isLoaded || !userId) {
        return null; // User not loaded or not signed in
    }

    try {
        const response = await fetch('/api/role'); // Corrected API route
        if (!response.ok) {
            throw new Error('Failed to fetch user role');
        }
        const data = await response.json();
        return data.role;
    } catch (error) {
        console.error('Error fetching user role:', error);
        return null;
    }
}