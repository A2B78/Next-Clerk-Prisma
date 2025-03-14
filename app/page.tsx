import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";

export default async function Home() {
  const user = await checkUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Bienvenue<br />LAURA<br />&<br />CLARA</h1>
      <Button><a href="/sign-in">Sign-In</a></Button>
      {user?.role === "admin" && (
              <Link href="/admin/dashboard">
                <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Admin
                </Button>
              </Link>
            )}
    </main>
    
  );
}
