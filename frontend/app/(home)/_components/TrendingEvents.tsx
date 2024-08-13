'use client';
import Title from './Title';
import EventCard from './EventCard';
import { IEvent, TrendingEvents } from '@/types';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TrendingProps {
events: TrendingEvents[];
}

const TrendingEvents = ({events}: TrendingProps) => {

  return (
    <section className='my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28'>
      <Title title='Trending Events' />
      <div className='mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3'>
      {events.map((trendingEvent) => {
          const event: IEvent = {
            _id: trendingEvent.event._id,
            title: trendingEvent.event.title,
            description: trendingEvent.event.description,
            location: trendingEvent.event.location,
            startDateTime: new Date(trendingEvent.event.startDateTime),
            endDateTime: new Date(trendingEvent.event.endDateTime),
            imageUrl: trendingEvent.event.imageUrl,
            price: trendingEvent.event.price,
            isFree: trendingEvent.event.isFree,
            url: trendingEvent.event.url,
            createdAt: new Date(trendingEvent.event.createdAt),
            category: {
              _id: trendingEvent.event.category,
              name: trendingEvent.event.category,
            },
            organizer: {
              _id: trendingEvent.event.organizer,
              username: trendingEvent.event.organizer,
            },
          };

          return <EventCard event={event} key={event._id} />;
        })}
      </div>
      <div className='mt-12 w-[250px] mx-auto sm:w-[320px]'>
        <Link href={`/events`}>
          <Button className='bg-main w-[250px] mx-auto sm:w-[320px]'>
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TrendingEvents;
