'use client';
import { IEvent } from '@/types';
import Checkout from './Checkout';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useUserStore } from '@/store/useUserStore';

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const user = useUserStore((state) => state.user);

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-3'>
      {hasEventFinished ? (
        <p className='p-2 text-red-400'>
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {user ? (
            <Checkout event={event} userId={user._id} />
          ) : (
            <>
              <Link href={`/sign-in`}>
                <Button variant={'icon'} className="w-[139.85px]">Sign In</Button>
              </Link>
              <p className='text-red-400'>You need to sign in to buy tickets</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
