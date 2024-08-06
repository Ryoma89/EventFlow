'use client'
import { IEvent } from "@/types";
import { getUser } from "@/lib/getUser";
import { DataTable } from "./data-table";
import Title from "../../_components/Title";
import { fetchEvents } from "@/lib/fetchEvents";

import React, { useEffect, useState } from "react";
import { formatEventData } from "@/lib/eventUtils";
import { useColumnsAttending } from "./attendingEventColumns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MyAttendingEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const fetchAndSetEvents = async () => {
    try {
      const data = await fetchEvents();
      const formattedEvents = formatEventData(data);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAndSetEvents();
    }
  }, [user]);

  const columns = useColumnsAttending();

  return (
    <div className='mt-14 md:mt-20'>
      <Title title="My Attending Events" />
      {events.length > 0 ? (
        <div className='mt-10'>
          <DataTable columns={columns} data={events} />
        </div>
      ) : (
        <p className='mt-10 text-center text-gray-500 text-xl'>No events found</p>
      )}
    </div>
  );
};

export default MyAttendingEvents;
