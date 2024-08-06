import React from "react";
import EventDetailsCard from "./_components/EventDetailsCard";

const EventDetailsPage = ({ params }: { params: { id: string } }) => {
  
  return (
    <section className="flex justify-center">
      <EventDetailsCard params={params}/>
    </section>
  );
};

export default EventDetailsPage;

