'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const Search = ({}) => {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    let newUrl = '';
    if (query) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'query',
        value: query,
      });
      router.push(`/events${newUrl}`, { scroll: false });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['query'],
      });
      router.push(`/events`, { scroll: false });
    }
  };

  return (
    <div className='relative mt-3 flex md:w-[506px]'>
      <Input
        type='text'
        placeholder='Search events'
        onChange={(e) => setQuery(e.target.value)}
        className='py-2 pl-10 pr-4 rounded-md w-full bg-inputBg  focus-visible:ring-offset-0 '
      />
      <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-icon' />
      <div>
        <Button
          onClick={handleSearch}
          variant={'main'}
          className='ml-2 py-2 px-4'
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
