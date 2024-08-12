import React from 'react';
import { getUser } from '@/lib/getUser';
import Title from '../_components/Title';
import Profile from './_components/Profile';
import MyOrganizedEvents from './_components/MyOrganizedEvents';
import MyAttendingEvents from './_components/MyAttendingEvents';

const ProfilePage = async () => {
  const user = await getUser();
  console.log("Fetched user:", user);
  return (
    <section className='my-14 mx-auto w-4/5 sm:my-20'>
      <Title title='Profile' />
      <Profile />
      <MyOrganizedEvents user={user} />
      <MyAttendingEvents user={user} />
    </section>
  );
};

export default ProfilePage;
