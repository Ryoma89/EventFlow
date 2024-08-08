'use client';
import { User } from '@/types';
import { IEvent } from '@/types';
import { DataTable } from './data-table';
import Title from '../../_components/Title';
import { fetchEvents } from '@/lib/fetchEvents';

import React, { useEffect, useState } from 'react';
import { formatEventData } from '@/lib/eventUtils';
import { useColumnsAttending } from './attendingEventColumns';

interface AttendingProps {
  user: User;
}

const MyAttendingEvents = ({ user }: AttendingProps) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchAndSetEvents = async () => {
    try {
      const data = await fetchEvents();
      const formattedEvents = formatEventData(data);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAndSetEvents();
    }
  }, [user]);

  const columns = useColumnsAttending();

  return (
    <div className='mt-14 md:mt-20'>
      <Title title='My Attending Events' />
      {events.length > 0 ? (
        <div className='mt-10'>
          <DataTable columns={columns} data={events} />
        </div>
      ) : (
        <p className='mt-10 text-center text-gray-500 text-xl'>
          No events found
        </p>
      )}
    </div>
  );
};

export default MyAttendingEvents;
