'use client';
import Comments from './Comments';
import Attendees from './Attendees';
import { Comment, IAttendee, IEvent } from '@/types';
import CheckoutButton from '@/components/shared/CheckoutButton';

import {
  Calendar,
  Clock,
  DollarSign,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchEventById } from '@/lib/fetcheventById';
import { formatDateTime } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';

const EventDetailsCard = ({ params }: { params: { id: string } }) => {
  const user = useUserStore((state) => state.user);
  const [purchased, setPurchased] = useState(false);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [attendees, setAttendees] = useState<IAttendee[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await fetchEventById(params.id);
        setEvent(data.event);
        setComments(data.comments);
        setAttendees(data.attendees);

        const userPurchased = data.attendees.some(
          (attendee) => attendee._id === user?._id
        );
        setPurchased(userPurchased);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvent();
  }, [params.id, user?._id]);

  if (!event)
    return (
      <Skeleton className='w-10/12 mx-auto my-10 max-w-5xl rounded-ld h-[500px]' />
    );

  const startDate = formatDateTime(new Date(event.startDateTime));
  const endDate = formatDateTime(new Date(event.endDateTime));

  return (
    <div className='w-full'>
      <div className='bg-main'>
        <div className='md:container grid grid-cols-1 text-white md:grid md:grid-cols-2'>
        <div className='relative w-full h-[300px] md:h-[400px] md:order-2'>
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className='object-cover object-center'
            priority
          />
        </div>
        <div className='p-5 space-y-4 md:order-1 md:px-0 md:space-y-6 md:flex md:flex-col md:justify-center'>
          <h3 className='text-lg md:text-2xl'>{event.title}</h3>
          <div>
            <div className='flex-flex-col space-y-4 sm:flex-row sm:items-center'>
              <div className='flex items-center gap-3'>
                <Calendar className='h-5 w-5 text-icon md:h-8 md:w-8' />
                <div className='flex flex-wrap items-center md:text-lg'>
                  <p>
                    {startDate.dateOnly} - {endDate.dateOnly}
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
                    {startDate.timeOnly} - {endDate.timeOnly}
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
          {user?._id === event.organizer._id ? (
            <div className='flex items-center gap-3'>
              <Link href={`/events/${params.id}/update`}>
                <Button variant={'icon'} className='w-[139.85px] text-lg'>
                  Edit
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {purchased ? (
                <p className='p-2 text-red-400'>
                  You have already purchased this event.
                </p>
              ) : (
                <div className=''>
                  <CheckoutButton event={event} />
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </div>

      <div className='md:container pt-10 pb-5 px-5 md:py-10'>
        <h3 className='text-3xl font-semibold text-main md:text-4xl'>
          About the event
        </h3>
        <div className='mt-5 md:text-lg'>{event.description}</div>
      </div>

      <div className='pt-5 pb-10 md:container md:grid md:grid-cols-2 md:py-10'>
        <Attendees eventId={params.id} attendees={attendees} user={user} />
        <Comments
          eventId={params.id}
          comments={comments}
          setComments={setComments}
        />
      </div>

      <div className='pb-10 md:py-10 md:container'>
        <h3 className='text-3xl font-semibold text-main text-center md:text-4xl'>
          Share This Event
        </h3>
        <div className='mt-7 flex items-center justify-center gap-5'>
          <div>
            <Link href='mailto:' className='hover:opacity-70'>
              <Mail className='h-8 w-8 text-icon md:h-10 md:w-10' />
            </Link>
          </div>
          <div>
            <Link
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70'
            >
              <Instagram className='h-8 w-8 text-icon md:h-10 md:w-10' />
            </Link>
          </div>
          <div>
            <Link
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70'
            >
              <Twitter className='h-8 w-8 text-icon md:h-10 md:w-10' />
            </Link>
          </div>
          <div>
            <Link
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70'
            >
              <Facebook className='h-8 w-8 text-icon md:h-10 md:w-10' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
