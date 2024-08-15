'use client';
import { IEvent } from '@/types';
import Title from '../../_components/Title';
import { fetchEvents } from '@/lib/fetchEvents';
import React, { useEffect, useState } from 'react';
import EventCard from '../../_components/EventCard';
import Pagination from '../../_components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { filterEvents } from '@/lib/filterEvents';
import { getPaginatedData } from '@/lib/pagination';
import { CATEGORIES } from '@/constants/categories';

interface eventsProps {
  events: IEvent[];
}

const EventsList = ({ events }: eventsProps) => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const itemsPerPage = 9;

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (search) {
      searchParams.set('query', search);
    }
    if (selectedCategory) {
      searchParams.set('category', selectedCategory);
    }
    router.push(`/events?${searchParams.toString()}`, { scroll: false });
    setSearch('');
    setIsSearchComplete(true);
  };

  useEffect(() => {
    if (isSearchComplete) {
      setSelectedCategory(null);
      setIsSearchComplete(false);
    }
  }, [isSearchComplete]);

  const filteredEvents = filterEvents(events, query, category);

  const { paginatedData: currentEvents, totalPages } = getPaginatedData(
    filteredEvents,
    currentPage,
    itemsPerPage
  );
  return (
    <>
      <div className='lg:flex lg:justify-between lg:items-center'>
        <Title title='Event List' />
        <div className='flex items-center justify-center gap-2 mt-5 sm:mt-0 md:mt-0'>
          <div className='flex-1'>
            <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:mt-10 lg:mt-0'>
              <div className='w-full min-w-40'>
                <Input
                  type='search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search quizzes...'
                  className='w-full min-w-40 rounded-lg bg-background pr-4 py-2 text-sm'
                />
              </div>
              <div className='w-full min-w-40'>
                <Select
                  value={selectedCategory || ''}
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger className='w-full min-w-40'>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.length > 0 &&
                      CATEGORIES.map((category) => (
                        <SelectItem
                          key={category.name}
                          value={category.name}
                          className='select-item p-regular-14'
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='w-full min-w-40'>
                <Button
                  className='py-2 px-4 w-full min-w-40'
                  variant={'main'}
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
            ? 'mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3 md:gap-6'
            : 'flex items-center justify-center mt-10'
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
          <p className='text-center text-lg text-gray-600'>No events found.</p>
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
