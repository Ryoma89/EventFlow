import { cookies } from 'next/headers';
import Title from '../_components/Title';
import Profile from './_components/Profile';
import MyOrganizedEvents from './_components/MyOrganizedEvents';
import MyAttendingEvents from './_components/MyAttendingEvents';
import { fetchWithToken } from '@/lib/fetchWithToken';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const token = cookies().get('token')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  const myEvents = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_URL}/my-events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    refreshToken
  ).then((response) => response.json());

  const myAttendingEvents = await fetchWithToken(
    `${process.env.NEXT_PUBLIC_API_URL}/my-attending-events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    refreshToken
  ).then((response) => response.json());

  if(!refreshToken) {
    redirect('/sign-in');
  }
  
  return (
    <section className='my-14 mx-auto w-4/5 sm:my-20'>
      <Title title='Profile' />
      <Profile />
      <MyOrganizedEvents myEvents={myEvents} />
      <MyAttendingEvents myAttendingEvents={myAttendingEvents} />
    </section>
  );
};

export default ProfilePage;
