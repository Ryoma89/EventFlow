"use client";
import { IEvent } from "@/types";
import React, { useEffect } from "react";

import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "🎉 Order placed!",
        description: "You will receive an email confirmation.",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled",
        description: "Continue to shop around and checkout when you are ready.",
      });
    }
  }, []);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({order}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive",
      });
    }
  };
  return (
    <form onSubmit={onCheckout} method="post">
      <Button 
      variant={"icon"} 
      type="submit" 
      role="link" 
      size={"lg"}>
        {event.isFree ? "Get Tickets" : "Buy Tickets"}
      </Button>
    </form>
  );
};

export default Checkout;
