'use client';
import { useUserStore } from '@/store/useUserStore';
import SheetMenu from '@/app/(home)/_components/SheetMenu';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getUser } from '@/lib/getUser';

const Header = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <header className='w-full bg-main'>
      <div className='container h-[70px] flex items-center justify-between'>
        <h1 className='text-button'>
          <Link href='/' className='text-2xl font-bold'>
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
              <div className='flex flex-col items-center sm:hidden'>
                <SheetMenu />
              </div>
            </div>
          ) : (
            <Link href='/sign-in' className='text-white cursor-pointer w-24'>
              <Button variant={'custom'} className='w-full'>
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
