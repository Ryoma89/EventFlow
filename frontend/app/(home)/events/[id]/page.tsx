import React from 'react';
import { getUser } from '@/lib/getUser';
import EventDetailsCard from './_components/EventDetailsCard';

const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
  return (
    <section className='flex justify-center'>
      <EventDetailsCard params={params} />
    </section>
  );
};

export default EventDetailsPage;
