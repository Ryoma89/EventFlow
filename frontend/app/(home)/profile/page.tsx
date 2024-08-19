import Title from '../_components/Title';
import Profile from './_components/Profile';
import MyOrganizedEvents from './_components/MyOrganizedEvents';
import MyAttendingEvents from './_components/MyAttendingEvents';

const ProfilePage = async () => {
  
  return (
    <section className='my-14 mx-auto w-4/5 sm:my-20'>
      <Title title='Profile' />
      <Profile />
      <MyOrganizedEvents />
      <MyAttendingEvents />
    </section>
  );
};

export default ProfilePage;
