"use client";
import { IEvent } from "@/types";
import Title from "../../_components/Title";
import React, { useEffect, useState } from "react";
import EventCard from "../../_components/EventCard";
import Pagination from "../../_components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { filterEvents } from "@/lib/filterEvents";
import { getPaginatedData } from "@/lib/pagination";
import { fetchEvents } from "@/lib/fetchEvents";

const EventsList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<IEvent[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAndSetEvents();
  }, []);

  const handleSearch = () => {
    if (search) {
      router.push(`/events?query=${search}`, { scroll: false });
    } else {
      router.push(`/events`, { scroll: false });
    }
    setSearch("");
  };

  const filteredEvents = filterEvents(events, query, category);

  const { paginatedData: currentEvents, totalPages } = getPaginatedData(
    filteredEvents,
    currentPage,
    itemsPerPage
  );
  return (
    <>
      <div className="sm:flex sm:justify-between sm:items-center">
        <Title title="Events Lists" />
        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-0 md:mt-0">
          <div className="flex-1 max-w-96">
            <div className="flex items-center justify-center">
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search quizzes..."
                className="w-full rounded-lg bg-background pr-4 py-2 text-sm max-w-52"
              />
              <div>
                <Button
                  className="ml-2 py-2 px-4"
                  variant={"main"}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          currentEvents.length > 0
            ? "mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3"
            : "flex items-center justify-center mt-10"
        }
        style={{
          minHeight: `calc(100vh - 64px - 194px - 56px - 100px - 40px)`,
        }}
      >
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <EventCard event={event} key={event._id} />
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">No events found.</p>
        )}
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
