'use client';
import { IEvent } from '@/types';
import { DataTable } from './data-table';
import Title from '../../_components/Title';
import { useColumns } from './organizedEventColumns';
import { fetchWithToken } from '@/lib/fetchWithToken';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { formatEventData } from '@/lib/eventUtils';
import React, { useEffect, useState } from 'react';

const MyOrganizedEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/my-events`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (response.ok) {
          const eventData = await response.json();
          const formattedEvents = formatEventData(eventData);
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
        console.error('Error fetching events:', error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ eventId }),
        }
      );

      if (response.ok) {
        setEvents((prevEvents) => {
          const updatedEvents = prevEvents.filter(
            (event) => event._id !== eventId
          );
          return updatedEvents;
        });
        toast({
          title: '✅ Event Deleted',
          description: 'The event has been deleted successfully.',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: `${errorData.message}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const columns = useColumns(handleDelete);

  return (
    <div className='mt-14 md:mt-20'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <Title title='My Events' />
        <div className='mt-7 sm:mt-0'>
          <Link href='/events/create'>
            <Button variant={'outline'} className='w-full'>
              Create Event
            </Button>
          </Link>
        </div>
      </div>
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

export default MyOrganizedEvents;
