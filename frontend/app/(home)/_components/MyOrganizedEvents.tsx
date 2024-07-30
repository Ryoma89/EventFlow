'use client';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Title from './Title';
import { IEvent } from '@/types';

const MyOrganizedEvents = ({ user }: { user: any }) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        const data = await response.json();
        const organizedEvents = data.filter((event: IEvent) => event.organizer._id === user._id);
        setEvents(organizedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);

  return (
    <div className='mt-14 md:mt-20'>
      <Title title="My Organized Events" />
      {events.length > 0 ? (
        <div className='mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3'>
          {events.map((event) => {
            return <EventCard event={event} key={event._id} canEdit={true}/>;
          })}
        </div>
      ) : (
        <p className='mt-10 text-center text-gray-500'>No events found</p>
      )}
    </div>
  );
};

export default MyOrganizedEvents;
