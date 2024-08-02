'use client';
import Comments from './Comments';
import Attendees from './Attendees';
import { getUser } from '@/lib/getUser';
import { Comment, IEvent } from '@/types';
import { formatDateTime } from '@/lib/eventUtils';
import CheckoutButton from '@/components/shared/CheckoutButton';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, DollarSign, MapPin } from 'lucide-react';

const EventDetailsCard = ({ params }: { params: { id: string } }) => {
  const [attendees, setAttendees] = useState<IEvent | null>(null);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}`
        );
        const data = await response.json();
        setEvent(data.event);
        setComments(data.comments);
        setAttendees(data.attendees);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvent();
  }, [params.id]);

  if (!event)
    return (
      <Skeleton className='w-10/12 mx-auto my-10 max-w-5xl rounded-ld h-[500px]' />
    );

  const { date: startDate, time: startTime } = formatDateTime(
    new Date(event.startDateTime)
  );
  const { date: endDate, time: endTime } = formatDateTime(
    new Date(event.endDateTime)
  );

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 bg-main text-white md:grid md:grid-cols-2'>
        <div className='relative w-full h-[300px] md:h-[400px] md:order-2'>
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className='object-cover object-center'
            priority
          />
        </div>
        <div className='p-5 space-y-4 md:order-1 md:w-10/12 md:mx-auto md:space-y-6'>
          <h3 className='text-lg md:text-2xl'>{event.title}</h3>
          <div className=''>
            <div className='flex-flex-col space-y-4 sm:flex-row sm:items-center'>
              <div className='flex items-center gap-3'>
                <Calendar className='h-5 w-5 text-icon md:h-8 md:w-8' />
                <div className='flex flex-wrap items-center md:text-lg'>
                  <p>
                    {startDate} - {endDate}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-icon  md:h-8 md:w-8' />
                <p className='md:text-lg'>{event.location}</p>
              </div>
              <div className='flex items-center gap-3'>
                <Clock className='h-5 w-5 text-icon md:h-8 md:w-8' />
                <div className='flex flex-wrap items-center md:text-lg'>
                  <p>
                    {startTime} - {endTime}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <DollarSign className='h-5 w-5 text-icon  md:h-8 md:w-8' />
                <p className='md:text-lg'>
                  {event.isFree ? 'Free' : `${event.price}`}
                </p>
              </div>
            </div>
          </div>
          <div className='md:w-1/2 md:mx-auto'>
            <CheckoutButton event={event} />
          </div>
        </div>
      </div>

      <div className='pt-10 pb-5 px-5 md:mx-10'>
        <h3 className='text-2xl font-semibold text-main md:text-3xl'>
          About the event
        </h3>
        <div className='mt-5 md:text-lg'>{event.description}</div>
      </div>

      <div className='pt-5 pb-10 md:px-10 md:grid md:grid-cols-2'>
        <Attendees />
        <Comments
          eventId={params.id}
          comments={comments}
          setComments={setComments}
          user={user}
        />
      </div>
    </div>
  );
};

export default EventDetailsCard;
