'use client';
import { useUserStore } from '@/store/useUserStore';
import SheetMenu from '@/app/(home)/_components/SheetMenu';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { useEffect } from 'react';
import Image from 'next/image';

const Header = () => {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await fetchUser();
      }
    };

    fetchData();
  }, [user, fetchUser]);
  return (
    <header className='w-full bg-main'>
      <div className='container h-[70px] flex items-center justify-between'>
        <h1 className='text-button'>
          <Link href='/' className='text-2xl font-bold flex items-center gap-3'>
            <Image src='/eflogo.svg' alt='logo' width={50} height={50} />
            EventFlow
          </Link>
        </h1>
        <nav className='flex items-center justify-end space-x-4'>
          <div className='hidden sm:flex'>
            <Link href='/events'>
              <p className='text-white'>Events</p>
            </Link>
          </div>
          {user ? (
            <div className='flex items-center space-x-4'>
              <div className='hidden sm:flex'>
                <Link href='/events/create'>
                  <p className='text-white'>Create Event</p>
                </Link>
              </div>
              <Link href='/profile'>
                <Avatar>
                  <AvatarImage
                    src={user.photo || 'https://github.com/shadcn.png'}
                    alt='@shadcn'
                  />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <>
              <Link href='/sign-in' className='text-white cursor-pointer w-24 hidden sm:block'>
                <Button variant={'custom'} className='w-full'>
                  Sign In
                </Button>
              </Link>
            </>
          )}
          <div className='flex flex-col items-center sm:hidden'>
            <SheetMenu user={user} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
