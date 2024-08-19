'use client';
import { IEvent } from '@/types';
import { AttendingEvents } from '@/types';
import { DataTable } from './data-table';
import Title from '../../_components/Title';

import React, { useEffect, useState } from 'react';
import { formatEventData } from '@/lib/eventUtils';
import { useColumnsAttending } from './attendingEventColumns';

interface AttendingProps {
  myAttendingEvents: AttendingEvents[];
}

const MyAttendingEvents = ({ myAttendingEvents }: AttendingProps) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  if(!myAttendingEvents) {
    return <div>No events</div>
  }

  useEffect(() => {
    const filteredEvents = myAttendingEvents
      .filter((attendingEvent) => attendingEvent.event !== null)
      .map((attendingEvent) => {
        const event = attendingEvent.event;
        return {
          ...event,
          category: { _id: event.category, name: '' },
          organizer: { _id: event.organizer, username: '' },
        } as IEvent;
      });
    const formattedEvents = formatEventData(filteredEvents);
    setEvents(formattedEvents);
  }, []);

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
