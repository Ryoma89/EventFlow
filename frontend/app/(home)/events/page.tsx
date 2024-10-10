import React from 'react';
import EventsList from './_components/EventsList';
import { IEvent } from '@/types';

const EventsPage = async () => {
  const events: IEvent[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
    }
  ).then((response) => response.json());

  const today = new Date();

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.endDateTime);
    return eventDate >= today;
  });

  return (
    <section className='my-14 mx-auto w-4/5 sm:my-20'>
      <EventsList events={upcomingEvents} />
    </section>
  );
};

export default EventsPage;
