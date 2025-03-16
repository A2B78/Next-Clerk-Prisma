import React from 'react'
// app/users/page.tsx
import UsersList from '@/components/UsersList';

const UsersPage = () => {
  return (
    <div className="container mx-auto py-8">
      <UsersList />
    </div>
  );
};

export default UsersPage;