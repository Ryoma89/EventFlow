import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="w-full bg-main">
      <div className="container h-16 flex items-center justify-between">
        <h1 className="text-button">
          <Link href="/" className="text-2xl font-bold">EventFlow</Link>
        </h1>
        <nav className="flex items-center justify-end space-x-2">
          <div className="flex items-center space-x-2">
              <Link href="/sign-up" className="text-white cursor-pointer">Login</Link>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
