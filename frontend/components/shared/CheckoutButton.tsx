"use client";
import { IEvent } from "@/types";
import Checkout from "./Checkout";
import { getUser } from "@/lib/getUser";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Button } from "../ui/button";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {user ? (
            <Checkout event={event} userId={user._id} />
          ) : (
            <>
              <Link href={`/sign-in`}>
                <Button variant={"icon"}>Book Tickets</Button>
              </Link>
              <p className="text-red-400">You need to sign in to buy tickets</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
