import React from 'react';
import { getUser } from '@/lib/getUser';
import Title from '../../_components/Title';
import EventForm from '../../../../components/shared/EventForm';

const EventCreatePage = async () => {
  const user = await getUser();
  console.log("user", user);
  return (
    <section className='my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28'>
      <Title title='Create Events' />
      <EventForm type='Create' user={user} />
    </section>
  );
};

export default EventCreatePage;
