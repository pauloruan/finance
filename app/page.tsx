import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutForm } from "./(auth)/_components/LogoutForm";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export default async function Home() {
  let user = undefined;
  const session = await auth();
  if (session) {
    user = session.user;
  } else {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <nav className="w-full bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 lg:h-10 lg:w-10 lg:mr-4">
                  <AvatarImage
                    src={String(user?.image)}
                    alt={String(user?.name)}
                  />
                  <AvatarFallback>
                    {String(user?.name).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium capitalize">
                  {String(user?.name)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 lg:space-x-8">
              <ThemeToggleButton />
              <LogoutForm />
            </div>
          </div>
        </div>
      </nav>
      <h1 className="text-3xl font-bold font-title">Finanças</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
