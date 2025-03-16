import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import UsersInfo from "@/components/UsersInfo";

export default async function ProfilePage() {
    const user = await checkUser();
    return (
        <main className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 mt-0">

            <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
                <SignedOut>
                    <div className="text-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2">
                            <a href="/sign-in">Sign-In</a>
                        </Button>
                    </div>
                </SignedOut>

                {user && (
                    <div className="mt-6">
                        <h1 className="text-4xl font-bold text-center text-gray-800">Profile</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                <p className="text-lg font-medium text-gray-700">ID:</p>
                                <p className="text-gray-600">{user?.id}</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                <p className="text-lg font-medium text-gray-700">Name:</p>
                                <p className="text-gray-600">{user?.name}</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                <p className="text-lg font-medium text-gray-700">Email:</p>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                <p className="text-lg font-medium text-gray-700">Role:</p>
                                <p className="text-gray-600">{user?.role}</p>
                            </div>
                        </div>

                        {/* Display Profile Section */}
                        {user?.profile && (
                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold text-gray-800">Profile</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                        <p className="text-lg font-medium text-gray-700">Bio:</p>
                                        <p className="text-gray-600">{user?.profile.bio}</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                        <p className="text-lg font-medium text-gray-700">Profile Image:</p>
                                        <p className="text-gray-600">{user?.profile.profileImage}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6 w-full max-w-3xl">
                <UsersInfo />
            </div>
        </main>
    );
}
