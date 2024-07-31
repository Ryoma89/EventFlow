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
import { IEvent } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { convertToAbsolutePath, formatDateTime } from "@/lib/eventUtils";

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
        router.push("/");
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

  const absoluteImageUrl = convertToAbsolutePath(event.imageUrl);
  const { dateTime } = formatDateTime(new Date(event.startDateTime));

  return (
    <>
      <Card className="shadow-lg bg-cardBg flex flex-col">
        <div className="relative w-full h-52">
          <Image
            src={absoluteImageUrl}
            alt={absoluteImageUrl}
            fill={true}
            className="rounded-t-md"
            priority
            sizes="full"
          />
        </div>
        <div className="flex-grow flex flex-col">
          <CardHeader className="flex-grow">
            <CardTitle className="truncate">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 flex-grow">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-icon" />
              <p>{dateTime}</p>
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
          {canEdit && (
            <>
              <Link href={`/events/${event._id}/update`}>
                <Button variant={"main"} className="w-full">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default EventCard;
