import { UserButton, SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";

const Navbar = async () => {
    const user = await checkUser();
    const env = process.env.NODE_ENV; // 'development' | 'production'

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/profile", label: "Profile" },
        { href: "/users", label: "Users" },
        { href: "/api/infos", label: "infos" },
        { href: "/api/credits", label: "credits" },
        

    ];

    return (
        <div className="flex justify-between px-7 items-center p-6 bg-gray-200 shadow-md">
            <Link href="/" className="text-2xl font-bold">
                My App
            </Link>

            <div className="flex space-x-4 hidden md:flex">
                <ul className="flex space-x-4 px-3 py-2 rounded-md bg-gray-200">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`px-3 py-2 rounded-md hover:bg-gray-300 hover:w-full transition-all duration-300 hover:text-scale-105 ${
                                    user?.pathname === link.href ? "bg-gray-300" : "hover:bg-gray-200"
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center space-x-4">
                {/* ✅ ENV Button */}
                <Button
                    variant="outline"
                    className={`text-xs px-3 py-1 rounded-full ${
                        env === "development" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
                    }`}
                >
                    {env === "development" ? "Dev" : "Prod"}
                </Button>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    {user?.role === "admin" && (
                        <Link href="/admin">
                            <Button
                                variant="secondary"
                                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2"
                            >
                                Admin
                            </Button>
                        </Link>
                    )}
                    <SignOutButton className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2" />
                </SignedIn>
                <SignedOut>
                    <SignInButton
                        mode="modal"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
                    />
                </SignedOut>
            </div>
        </div>
    );
};

export default Navbar;
