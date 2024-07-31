'use client'
import React, { useEffect, useState } from "react";
import Title from "../../_components/Title";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCard from "../../_components/EventCard";
import { IEvent } from "@/types";
import Pagination from "../../_components/Pagination";

const EventsList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(events.length / itemsPerPage);
  return (
    <>
      <div className="sm:flex sm:justify-between sm:items-center">
        <Title title="Events Lists" />
        <div className="flex items-center justify-center gap-2 mt-5 md:mt-0">
          <div className="relative flex-1 max-w-52">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search quizzes..."
              className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-sm max-w-52"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3">
      {currentEvents.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </>
  );
};

export default EventsList;
