import React from 'react';
import Hero from './_components/Hero';
import Promotion from './_components/Promotion';
import Categories from './_components/Categories';
import TrendingEvents from './_components/TrendingEvents';
import UpcomingEvents from './_components/UpcomingEvents';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Promotion />
      <Categories />
      <TrendingEvents />
      <UpcomingEvents />
    </main>
  );
};

export default HomePage;
