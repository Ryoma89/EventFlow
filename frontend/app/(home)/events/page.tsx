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

  return (
    <section className='my-14 mx-auto w-4/5 sm:my-20'>
      <EventsList events={events} />
    </section>
  );
};

export default EventsPage;
