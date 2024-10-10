import React from 'react';
import Hero from './_components/Hero';
import Promotion from './_components/Promotion';
import Categories from './_components/Categories';

import { ITrendingEvents } from '@/types';
import UpcomingEvents from './_components/UpcomingEvents';
import TrendingEvents from './_components/TrendingEvents';

const HomePage = async () => {
  const trendingEvents: ITrendingEvents[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trending-events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
    }
  ).then((response) => response.json());

  const upcomingEvents = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json());

  const today = new Date();

  const filteredTrendingEvents = trendingEvents.filter((event) => {
    const eventDate = new Date(event.event.endDateTime);
    return eventDate >= today;
  });

  return (
    <main>
      <Hero />
      <Promotion />
      <Categories />
      <TrendingEvents trendingEvents={filteredTrendingEvents} />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </main>
  );
};

export default HomePage;
