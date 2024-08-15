import React from 'react';
import Title from '../../_components/Title';
import EventForm from '../../../../components/shared/EventForm';

const EventCreatePage = async () => {
  return (
    <section className='my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28'>
      <Title title='Create Events' />
      <EventForm type='Create' />
    </section>
  );
};

export default EventCreatePage;
