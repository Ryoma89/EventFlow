'use client';
import { IEvent } from '@/types';
import { getUser } from '@/lib/getUser';
import { DataTable } from './data-table';
import Title from '../../_components/Title';
import { fetchEvents } from '@/lib/fetchEvents';
import { useColumns } from './organizedEventColumns';

import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { formatEventData } from '@/lib/eventUtils';
import React, { useEffect, useState } from 'react';

const MyOrganizedEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const fetchAndSetEvents = async () => {
    try {
      const data = await fetchEvents();
      const organizedEvents = data.filter((event: IEvent) => event.organizer._id === user._id);
      const formattedEvents = formatEventData(organizedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAndSetEvents();
    }
  }, [user]);

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ eventId }),
        }
      );

      if (response.ok) {
        toast({
          title: "✅ Event Deleted",
          description: "The event has been deleted successfully.",
        });
        fetchAndSetEvents();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `${errorData.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const columns = useColumns(handleDelete);

  return (
    <div className='mt-14 md:mt-20'>
      <Title title="My Events" />
      {events.length > 0 ? (
        <div className='mt-10'>
          <DataTable columns={columns} data={events} />
        </div>
      ) : (
        <p className='mt-10 text-center text-gray-500 text-xl'>No events found</p>
      )}
    </div>
  );
};

export default MyOrganizedEvents;
