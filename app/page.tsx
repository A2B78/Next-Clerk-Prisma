// app/users/page.tsx
import UserList from '@/components/UserList';
import UsersInfo from '@/components/UsersInfo';
import UsersList from '@/components/UsersList';


const UsersPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 mt-0">
            <UsersInfo />
            <UsersList />
            <UserList />
        </div>
    );
};

export default UsersPage;