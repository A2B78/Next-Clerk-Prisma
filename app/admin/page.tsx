// app/users/page.tsx
import UserList from '@/components/UserList';

const UsersPage = () => {
  return (
    <div className="container mx-auto p-4">
      <UserList />
    </div>
  );
};

export default UsersPage;