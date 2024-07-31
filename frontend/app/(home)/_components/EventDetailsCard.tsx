"use client";
import { Button } from "@/components/ui/button";
import { Comment, IEvent } from "@/types";
import { Calendar, DollarSign, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { convertToAbsolutePath, formatDateTime } from "@/lib/eventUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const EventDetailsCard = ({ params }: { params: { id: string } }) => {
  const [comment, setComment] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [attendees, setAttendees] = useState<IEvent | null>(null);
  const [event, setEvent] = useState<IEvent | null>(null);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}/comments`
  //       );
  //       const data = await response.json();
  //       setComments(data);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };
  //   fetchComments();
  // }, [params.id]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ comment: newComment }),
        }
      )

      if (response.ok) {
        const data = await response.json();
        setComment([...comment, data]);
        setNewComment("");
      } else {
        toast({
          title: "Error",
          description: "Failed to add comment",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })
    }
  }


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}`
        );
        const data = await response.json();
        setEvent(data.event);
        setComment(data.comment);
        setAttendees(data.attendees);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvent();
  }, [params.id]);

  if (!event)
    return (
      <Skeleton className="w-10/12 mx-auto my-10 max-w-5xl rounded-ld h-[500px]" />
    );
  const { dateTime } = formatDateTime(new Date(event.startDateTime));
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 bg-main text-white">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="p-5 space-y-4">
          <h3 className="text-lg lg:text-3xl">{event.title}</h3>
          <div>
            <div className="flex-flex-col space-y-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-icon md:h-8 md:w-8" />
                <div className="flex flex-wrap items-center md:text-lg">
                  <p>{dateTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-icon  md:h-8 md:w-8" />
                <p className="md:text-lg">{event.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-icon  md:h-8 md:w-8" />
                <p className="md:text-lg">${event.price}</p>
              </div>
            </div>
          </div>
          <div>
            <Button className="w-full max-w-[500px]" variant={"icon"}>Book Tickets</Button>
          </div>
        </div>
      </div>

      <div className="pt-10 pb-5 px-5">
        <h3 className="text-2xl font-semibold text-main">About the event</h3>
        <div className="mt-5">
          {event.description}
        </div>
      </div>
      <div className="pt-5 pb-10">
        <div className="px-5">
          <h3 className="text-2xl font-semibold text-main">Attendees</h3>
          <div className="my-8 flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="px-5">
          <h3 className="text-2xl font-semibold text-main">Comments</h3>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <Input type="text" placeholder="Add a comment" className="col-span-2"/>
            <div className="col-span-1">
            <Button className="w-full" variant={"icon"} onClick={handleAddComment}>Add</Button>
            </div>
          </div>
          <div className="mt-5">
            <p>comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
