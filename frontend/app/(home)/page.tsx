import React from 'react';
import Hero from './_components/Hero';
import Promotion from './_components/Promotion';
import Categories from './_components/Categories';
import TrendingEvents from './_components/TrendingEvents';
import UpcomingEvents from './_components/UpcomingEvents';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Promotion />
      <Categories />
      <TrendingEvents />
      <UpcomingEvents />
    </div>
  );
};

export default HomePage;
