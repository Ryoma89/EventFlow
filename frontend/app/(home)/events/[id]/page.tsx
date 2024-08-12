import React from 'react';
import { getUser } from '@/lib/getUser';
import EventDetailsCard from './_components/EventDetailsCard';

const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser();
  return (
    <section className='flex justify-center'>
      {/* delete user */}
      <EventDetailsCard params={params} />
    </section>
  );
};

export default EventDetailsPage;
