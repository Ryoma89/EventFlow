import React from 'react';
import Hero from './_components/Hero';
import Promotion from './_components/Promotion';
import Categories from './_components/Categories';

import UpcomingEvents from './_components/UpcomingEvents';
import { ITrendingEvents } from '@/types';
import TrendingEvents from './_components/TrendingEvents';

const HomePage = async () => {
  const trendingEvents: ITrendingEvents[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trending-events`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
  return (
    <main>
      <Hero />
      <Promotion />
      <Categories />
      <TrendingEvents trendingEvents={trendingEvents} />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </main>
  );
};

export default HomePage;
