import React from 'react';
import { getUser } from '@/lib/getUser';
import Title from '@/app/(home)/_components/Title';
import EventForm from '@/components/shared/EventForm';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const EventUpdatePage = async ({ params: { id } }: UpdateEventProps) => {
  const user = await getUser();
  return (
    <section className='my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28'>
      <Title title='Create Event' />
      <EventForm type='Update' eventId={id} user={user} />
    </section>
  );
};

export default EventUpdatePage;
