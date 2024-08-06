'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { CalendarCheck, LockKeyhole, Mail } from 'lucide-react';

const SignIn = () => {
  const router = useRouter();
  const onSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: 'include',
        }
      );
      if (response.ok) {
        const data = await response.json();
        router.push('/');
        toast({
          title: '✅ Sign in successful!',
          description: 'You have been signed in.',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Sign in failed',
          description: `${errorData.message}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    }
  };
  return (
    <Card className='mx-auto w-full max-w-4xl border-none lg:grid lg:grid-cols-2 lg:min-h-[600px]'>
      <div className='bg-main p-10 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg lg:flex lg:flex-col lg:justify-center'>
        <div className='flex items-center justify-center gap-2'>
          <CalendarCheck className='text-button w-8 h-8 lg:w-10 lg:h-10' />
          <h2 className='text-button text-4xl lg:text-5xl'>EventFlow</h2>
        </div>
        <p className='text-center text-white mt-4 lg:text-xl lg:mt-10'>
          Discover amazing events spatially tailored to you
        </p>
      </div>

      <div className='p-10 flex flex-col justify-center'>
        <div>
          <h2
            className='text-4xl text-center font-bold text-main'
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)' }}
          >
            Welcome
          </h2>
          <p className='text-center mt-1 lg:mt-4 lg:text-lg'>
            Enter your credentials to login
          </p>
        </div>
        <div className='flex flex-col gap-4 mt-5 lg:mt-8'>
          <form className='grid gap-4' action={onSubmit}>
            <div className='grid gap-3'>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-icon' />
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='email'
                  required
                  className='pl-10 bg-auth'
                />
              </div>
            </div>
            <div className='grid gap-3'>
              <div className='relative'>
                <LockKeyhole className='absolute left-3 top-1/2 transform -translate-y-1/2 text-icon' />
                <Input
                  minLength={6}
                  name='password'
                  id='password'
                  type='password'
                  placeholder='password'
                  required
                  className='pl-10 bg-auth'
                />
              </div>
            </div>
            <Button className='w-full bg-main mt-2'>Sign In</Button>
          </form>
          <div className='flex justify-center items-center space-x-2 mt-2 text-sm'>
            <div className='text-center'>
              Don&apos;t have an account?{' '}
              <Link href='/sign-up' className='text-main'>
                <span className='font-bold hover:opacity-80 hover:underline'>
                  {' '}
                  Sign Up{' '}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignIn;
