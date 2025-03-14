import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
// import { checkUser } from "@/lib/checkUser";

const Navbar = async () => {
//   const user = await checkUser();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <h1 className="text-2xl font-bold">My App</h1>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};
export default Navbar;