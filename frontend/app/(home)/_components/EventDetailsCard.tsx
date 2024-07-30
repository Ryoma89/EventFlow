'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IEvent } from '@/types'
import { Calendar, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { convertToAbsolutePath, formatDateTime } from '@/lib/eventUtils'

const EventDetailsCard = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvent()
  }, [params.id]);

  if (!event) return <Skeleton className="w-10/12 mx-auto my-10 max-w-5xl rounded-ld h-[500px]" />
  ;

  const absoluteImageUrl = convertToAbsolutePath(event.imageUrl);
  const { dateTime } = formatDateTime(new Date(event.startDateTime));
  return (
    <Card className="w-10/12 mx-auto my-10 max-w-5xl">
        <div className="grid grid-cols-1 ">
        <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src={absoluteImageUrl}
              alt={absoluteImageUrl}
              fill
              className="object-cover object-center rounded-t-lg"
              priority
            />
          </div>
          <div className="">
            <CardHeader className="space-y-3">
              <CardTitle className="text-center md:text-2xl lg:text-3xl">{event.title}</CardTitle>
              <CardDescription className="lg:text-lg">
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex-flex-col space-y-4 sm:flex-row sm:items-center">
                <div className="flex gap-2">
                  <p className="rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    ${event.price}
                  </p>
                  <Badge variant="outline" className="bg-white">
                    {event.category?.name}
                  </Badge>
                </div>
                <div className="space-y-4 md:flex md:justify-between md:items-center md:space-y-0">
                <div className="flex items-center gap-2 md:gap-3">
                  {/* organized by{" "} */}
                  <User className="h-5 w-5 md:h-8 md:w-8" />
                  <span className="md:text-lg">
                    {event.organizer?.username}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 md:h-8 md:w-8" />
                  <div className="flex flex-wrap items-center md:text-lg">
                    <p>{dateTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 md:h-8 md:w-8" />
                  <p className="md:text-lg">{event.location}</p>
                </div>
                </div>
                <p className="truncate text-blue-600 underline md:text-lg">
                  {event.url}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join Event</Button>
            </CardFooter>
          </div>
        </div>
      </Card>
  );
}

export default EventDetailsCard;