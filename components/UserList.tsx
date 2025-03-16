// components/UserList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Assurez-vous que le chemin est correct
import { Skeleton } from '@/components/ui/skeleton'; // Assurez-vous que le chemin est correct
import { Badge } from '@/components/ui/badge'; // Assurez-vous que le chemin est correct
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Assurez vous que le chemin est correct

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

const UserList: React.FC = () => {
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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                <TableCell>{user.profile?.firstName || 'N/A'}</TableCell>
                <TableCell>{user.profile?.lastName || 'N/A'}</TableCell>
                <TableCell>{user.userCredits?.credits || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default UserList;