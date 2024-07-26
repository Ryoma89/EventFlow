'use client'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Header = ({user}: {user: any}) => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-out`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (response.ok) {
        alert('Sign out successful!');
        router.push('/');
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert(`Sign out failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <header className='w-full bg-main'>
      <div className='container h-16 flex items-center justify-between'>
        <h1 className='text-button'>
          <Link href='/' className='text-2xl font-bold'>
            EventFlow
          </Link>
        </h1>
        <nav className='flex items-center justify-end space-x-2'>
          {user ? (
            <div className='flex items-center space-x-2'>
            <Button onClick={handleSignOut} variant={'custom'}>Sign out</Button>
            <Link href='/profile'>
              <Avatar>
                <AvatarImage
                  src={user.photo || 'https://github.com/shadcn.png'}
                  alt='@shadcn'
                />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
            </Link>
            <h3 className='text-white'>{user.username}</h3>
          </div>
          ) : (
            <Link href='/sign-in' className='text-white cursor-pointer'>
              <Button variant={'custom'}>Sign in</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
