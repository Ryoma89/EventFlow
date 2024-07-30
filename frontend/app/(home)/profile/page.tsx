import React from 'react'
import Title from '../_components/Title'
import Profile from '../_components/Profile'
import { getUser } from '@/lib/getUser';
import MyOrganizedEvents from '../_components/MyOrganizedEvents';
import MyAttendingEvents from '../_components/MyAttendingEvents';

const ProfilePage = async () => {
  const user = await getUser();
  return (
    <section className="my-14 mx-auto w-4/5 sm:my-20">
      <Title title="Profile" />
      <Profile user={user}/>
      <MyOrganizedEvents user={user}/>
      <MyAttendingEvents />
    </section>
  )
}

export default ProfilePage
