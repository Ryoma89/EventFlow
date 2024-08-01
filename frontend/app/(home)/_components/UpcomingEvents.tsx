'use client'
import React, { useEffect, useState } from 'react'
import Title from './Title'
import EventCard from './EventCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IEvent } from '@/types'

const UpcomingEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        let data: IEvent[] = await response.json();

        const now = new Date();
        data = data.filter((event) => new Date(event.startDateTime) > now);
        data = data.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
        data = data.slice(0, 6);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);
  return (
    <section className="my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28">
        <Title title="Upcoming Events" />
        <div className='mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3'>
        {events.map((event) => {
          return <EventCard event={event} key={event._id} />
        })}
        </div>
        <div className="mt-12 w-[250px] mx-auto sm:w-[320px]">
        <Link href={`/events`}>
          <Button className="bg-main w-[250px] mx-auto sm:w-[320px]">
            View All
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default UpcomingEvents
