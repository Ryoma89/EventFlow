import Title from './Title';
import { IEvent } from '@/types';
import EventCard from './EventCard';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface upcomingEventsProps {
  upcomingEvents: IEvent[];
}

const UpcomingEvents = ({ upcomingEvents }: upcomingEventsProps) => {
  const sortedUpcomingEvents = upcomingEvents
    .filter((event) => new Date(event.endDateTime) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    )
    .slice(0, 6);

  return (
    <section className='my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28'>
      <Title title='Upcoming Events' />
      <div className='mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3'>
        {sortedUpcomingEvents.map((event) => {
          return <EventCard event={event} key={event._id} />;
        })}
      </div>
      <div className='mt-12 w-[250px] mx-auto sm:w-[320px]'>
        <Link href={`/events`}>
          <Button className='bg-main w-[250px] mx-auto sm:w-[320px]'>
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default UpcomingEvents;
