import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EventCard = () => {
  return (
    <>
      <Card className="shadow-lg bg-cardBg">
        <div className="relative w-full h-52">
          <Image
            src="/fes.jpeg"
            alt="Fes"
            fill={true}
            className="rounded-t-md"
            priority
            sizes="full"
          />
        </div>
        <CardHeader>
          <CardTitle>When We Were Young</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-icon" />
            <p>October 19-20, 2024</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-icon" />
            <p>Las Vegas Festival Grounds</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/events/1`} className="w-full">
            <Button
              variant={"custom"}
              className="w-full bg-button text-black shadow-md"
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCard;
