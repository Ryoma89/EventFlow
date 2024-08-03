'use client';
import { IEvent } from '@/types';
import { getUser } from '@/lib/getUser';
import Title from '../../_components/Title';
import { fetchEvents } from '@/lib/fetchEvents';
import EventCard from '../../_components/EventCard';

import React, { useEffect, useState } from 'react';

const MyOrganizedEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        const data = await fetchEvents();
        const organizedEvents = data.filter((event: IEvent) => event.organizer._id === user._id);
        setEvents(organizedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user) {
      fetchAndSetEvents();
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
        <p className='mt-10 text-center text-gray-500 text-xl'>No events found</p>
      )}
    </div>
  );
};

export default MyOrganizedEvents;
