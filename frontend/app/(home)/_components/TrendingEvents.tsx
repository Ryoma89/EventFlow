import React from "react";
import Title from "./Title";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";

const TrendingEvents = () => {
  return (
    <section className="my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28">
      <Title title="Trending Events" />
      <div className="mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
      <div className="mt-12 w-[250px] mx-auto sm:w-[320px]">
        <Button className="bg-main w-[250px] mx-auto sm:w-[320px]">
          View All
        </Button>
      </div>
    </section>
  );
};

export default TrendingEvents;
