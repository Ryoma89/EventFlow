"use client";
import { getUser } from "@/lib/getUser";

import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
        const userData = await getUser();
        setUser(userData);
    };

    fetchUser();
  }, []);

  const onSignOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-out`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        toast({
          title: "👋 See you soon!",
          description:
            "You have been signed out. Looking forward to seeing you again!",
        });
        setUser(null);
        router.push("/");
      } else {
        const errorData = await response.json();
        toast({
          title: "Sign out failed",
          description: `${errorData.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <header className="w-full bg-main">
      <div className="container h-16 flex items-center justify-between">
        <h1 className="text-button">
          <Link href="/" className="text-2xl font-bold">
            EventFlow
          </Link>
        </h1>
        <nav className="flex items-center justify-end space-x-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link href="/profile">
                <Avatar>
                  <AvatarImage
                    src={user.photo || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
              </Link>
              <Button onClick={onSignOut} variant={"custom"}>
                Sign out
              </Button>
            </div>
          ) : (
            <Link href="/sign-in" className="text-white cursor-pointer">
              <Button variant={"custom"}>Sign in</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
