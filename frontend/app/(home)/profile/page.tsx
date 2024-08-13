import React from 'react';
import { getUser } from '@/lib/getUser';
import Title from '../_components/Title';
import Profile from './_components/Profile';
import MyOrganizedEvents from './_components/MyOrganizedEvents';
import MyAttendingEvents from './_components/MyAttendingEvents';
import { cookies } from 'next/headers';

const ProfilePage = async () => {
  const user = await getUser();
  const token = cookies().get('token')?.value;
  const myEvents = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

  const myAttendingEvents = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-attending-events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());

  return (
    <section className='my-14 mx-auto w-4/5 sm:my-20'>
      <Title title='Profile' />
      <Profile />
      <MyOrganizedEvents myEvents={myEvents}/>
      <MyAttendingEvents myAttendingEvents={myAttendingEvents}/>
    </section>
  );
};

export default ProfilePage;
