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

  return (
    <header className="w-full bg-main">
      <div className="container h-[70px] flex items-center justify-between">
        <h1 className="text-button">
          <Link href="/" className="text-2xl font-bold">
            EventFlow
          </Link>
        </h1>
        <ul className="hidden sm:text-white sm:flex sm:items-center sm:justify-center sm:gap-5">
          <li className="text-lg">
            <Link href="/events">Event List</Link>
          </li>
          <li className="text-lg">
            <Link href="/events/create">Create Events</Link>
          </li>
        </ul>
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
            </div>
          ) : (
              <Link href="/sign-in" className="text-white cursor-pointer w-24">
                <Button variant={"custom"} className="w-full">
                  Sign In
                </Button>
              </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
