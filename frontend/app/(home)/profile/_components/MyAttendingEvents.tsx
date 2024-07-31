'use client'
import React, { useEffect, useState } from "react";
import EventCard from "../../_components/EventCard";
import Title from "../../_components/Title";
import { IEvent } from "@/types";

const MyAttendingEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);
  return (
    <div className="mt-14 md:mt-20">
      <Title title="My Attending Events" />
      <div className="mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3">
      {events.map((event) => {
          return <EventCard event={event} key={event._id} />
        })}
      </div>
    </div>
  );
};

export default MyAttendingEvents;
