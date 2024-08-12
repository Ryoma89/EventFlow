'use client';
import { IEvent, User } from '@/types';
import { DataTable } from './data-table';
import Title from '../../_components/Title';
import { fetchEvents } from '@/lib/fetchEvents';
import { useColumns } from './organizedEventColumns';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { formatEventData } from '@/lib/eventUtils';
import React, { useCallback, useEffect, useState } from 'react';

interface OrganizedProps {
  user: User;
}

const MyOrganizedEvents = ({ user }: OrganizedProps) => {
  console.log("User in MyOrganizedEvents:", user);
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchAndSetEvents = useCallback(async () => {
    try {
      if (!user) return;
      const data = await fetchEvents();
      console.log("Fetched events:", data); 
      const organizedEvents = data.filter(
        (event: IEvent) => event.organizer && event.organizer._id === user._id
      );
      console.log("Organized events:", organizedEvents);
      const formattedEvents = formatEventData(organizedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAndSetEvents();
    }
  }, [user, fetchAndSetEvents]);

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetch(
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
        toast({
          title: '✅ Event Deleted',
          description: 'The event has been deleted successfully.',
        });
        fetchAndSetEvents();
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
