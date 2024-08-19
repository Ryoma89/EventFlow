"use client";
import { User } from "@/types";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SheetMenu = ({user}: {user: User | null}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="text-white h-10 w-10" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="py-5">
          <Link href="/events" className="hover:opacity-60" onClick={handleClose}>
            <p className="text-center text-xl">Events</p>
          </Link>
        </div>
        <Separator />
        {user ? (
        <div className="py-5">
          <Link href="/events/create" className="hover:opacity-60" onClick={handleClose}>
            <p className="text-center text-xl">Create Event</p>
          </Link>
        </div>
        ) : (
          <div className="py-5">
          <Link href="/sign-in" className="hover:opacity-60" onClick={handleClose}>
            <p className="text-center text-xl">Sign In</p>
          </Link>
        </div>
        )}
        <Separator />
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
