'use client';
import { IEvent } from '@/types';
import { AttendingEvents } from '@/types';
import { DataTable } from './data-table';
import Title from '../../_components/Title';

import React, { useEffect, useState } from 'react';
import { formatEventData } from '@/lib/eventUtils';
import { useColumnsAttending } from './attendingEventColumns';
import { toast } from '@/components/ui/use-toast';
import { fetchWithToken } from '@/lib/fetchWithToken';

// interface AttendingProps {
//   myAttendingEvents: AttendingEvents[];
// }

const MyAttendingEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchAttendingEvents = async () => {
      try {
        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/my-attending-events`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (response.ok) {
          const attendingEvents = await response.json();
          const filteredEvents = attendingEvents
            .filter((attendingEvent: any) => attendingEvent.event !== null)
            .map((attendingEvent: any) => {
              const event = attendingEvent.event;
              return {
                ...event,
                category: { _id: event.category, name: '' },
                organizer: { _id: event.organizer, username: '' },
              } as IEvent;
            });
          const formattedEvents = formatEventData(filteredEvents);
          setEvents(formattedEvents);
        } else {
          const errorData = await response.json();
          toast({
            title: 'Error',
            description: `${errorData.message}`,
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching attending events:', error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchAttendingEvents();
  }, []);

  // useEffect(() => {
  //   const filteredEvents = myAttendingEvents
  //     .filter((attendingEvent) => attendingEvent.event !== null)
  //     .map((attendingEvent) => {
  //       const event = attendingEvent.event;
  //       return {
  //         ...event,
  //         category: { _id: event.category, name: '' },
  //         organizer: { _id: event.organizer, username: '' },
  //       } as IEvent;
  //     });
  //   const formattedEvents = formatEventData(filteredEvents);
  //   setEvents(formattedEvents);
  // }, []);

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
