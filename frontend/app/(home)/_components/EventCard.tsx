import React from "react";
import { IEvent } from "@/types";
import { convertToAbsolutePath } from "@/lib/eventUtils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface EventCardProps {
  event: IEvent;
  canEdit?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, canEdit = false }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ eventId: event._id }),
        }
      );

      if (response.ok) {
        toast({
          title: "Event Deleted",
          description: "The event has been deleted successfully.",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `${errorData.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const absoluteUrl = convertToAbsolutePath(event.imageUrl);
  const date = formatDateTime(new Date(event.startDateTime));

  return (
    <>
      <Card className="shadow-lg bg-cardBg flex flex-col">
        <div className="relative w-full h-52">
          <Image
            src={absoluteUrl}
            alt={absoluteUrl}
            fill={true}
            className="rounded-t-md"
            priority
            sizes="full"
          />
        </div>
        <div className="flex-grow flex flex-col">
          <CardHeader className="flex-grow">
            <CardTitle className="truncate leading-tight">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 flex-grow">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-icon" />
              <p>{date.dateOnly}</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-icon" />
              <p className="truncate">{event.location}</p>
            </div>
          </CardContent>
        </div>
        <CardFooter className={`grid ${canEdit ? "grid-cols-3" : ""} gap-2`}>
          <Link href={`/events/${event._id}`} className="w-full">
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
