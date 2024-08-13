import React from 'react';
import Hero from './_components/Hero';
import Promotion from './_components/Promotion';
import Categories from './_components/Categories';
import TrendingEvents from './_components/TrendingEvents';
import UpcomingEvents from './_components/UpcomingEvents';

const HomePage = async () => {
  const trendingEvents = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending-events`, {
    method: 'GET',
  }).then((response) => response.json());
  return (
    <main>
      <Hero />
      <Promotion />
      <Categories />
      <TrendingEvents events={trendingEvents}/>
      <UpcomingEvents />
    </main>
  );
};

export default HomePage;
