// components/UserList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Assurez-vous que le chemin est correct
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CreditHistory {
  id: string;
  amount: number;
  date: Date;
  // ... autres champs
}

interface UserCredits {
  id: string;
  credits: number;
  creditsHistory: CreditHistory[];
  // ... autres champs
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  // ... autres champs
}

interface User {
  id: string;
  clerkUserId: string;
  email: string;
  role: string;
  profile: UserProfile | null;
  userCredits: UserCredits | null;
  creditsHistory: CreditHistory[];
  // ... autres champs
}

interface ApiResponse {
  users?: User[];
  user?: User;
  error?: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          const errorData: { error: string } = await response.json();
          throw new Error(errorData.error || 'Failed to fetch users');
        }
        const data: ApiResponse = await response.json();
        if (data.users) {
          setUsers(data.users);
        } else if (data.user) {
          setUsers([data.user]);
        } else if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
              <CardDescription><Skeleton className="h-4 w-1/2" /></CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card key={user.id} className="hover:shadow-lg transition-shadow duration-300 hover:scale-105 cursorr-pointer">
          <CardHeader>
            <CardTitle>{user.profile?.firstName} {user.profile?.lastName}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>ID: {user.id}</p>
            <p>Clerk User ID: {user.clerkUserId}</p>
            
            <p>Role: <Badge variant="outline">{user.role}</Badge></p>
            <p>Credits: {user.userCredits?.credits || 0}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsersList;