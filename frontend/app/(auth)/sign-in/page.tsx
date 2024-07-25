'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
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
        router.push('/');
        alert('Sign in successful!');
      } else {
        const errorData = await response.json();
        alert(`Sign in failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <section className='my-20 mx-auto w-4/5 sm:my-20 md:my-28'>
      <Card className='mx-auto max-w-4/5 max-w-xl'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <form className='grid gap-4' action={onSubmit}>
            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='example@example.com'
                required
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='password'>Password</Label>
              <Input
                minLength={6}
                name='password'
                id='password'
                type='password'
                required
              />
            </div>
            <Button className='w-full bg-main mt-2'>Sign In</Button>
          </form>
          <div className='flex justify-center items-center space-x-2 mt-2 text-sm'>
            <div className='text-center'>
              Don't have an account? Then please <span> </span>
              <Link href='/sign-up' className='underline text-blue-600'>
                <span className='hover:opacity-80'> click here </span>
              </Link>
              to sign up.
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignInPage;
