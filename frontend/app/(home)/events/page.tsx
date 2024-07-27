'use client'
import React, { useState } from 'react';
import Title from '../_components/Title';
import EventCard from '../_components/EventCard';
import Pagination from '../_components/Pagination';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalEvents = 20;
  const totalPages = Math.ceil(totalEvents / itemsPerPage);

    // ダミーデータとしてのイベントカードを作成
    const eventsList = Array.from({ length: totalEvents }, (_, index) => (
      <EventCard key={index} />
    ));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = eventsList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="my-14 mx-auto w-4/5 sm:my-20">
      <div className='sm:flex sm:justify-between sm:items-center'>
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
      {currentEvents}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </section>
  );
};

export default EventsPage;
