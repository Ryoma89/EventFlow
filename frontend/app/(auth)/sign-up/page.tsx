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
import { toast } from '@/components/ui/use-toast';

const SignUpPage = () => {
  const router = useRouter();
    const onSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sign-up`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        toast({
          title: "🎉 Sign up successful!",
          description: "You can now sign in with your new account.",
        });
        router.push('/sign-in');
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast({
          title: "Sign up failed",
          description: `${errorData.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };
  return (
    <section className='my-20 mx-auto w-4/5 sm:my-20 md:my-28'>
      <Card className='mx-auto max-w-4/5 max-w-xl'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Sign Up</CardTitle>
          <CardDescription className='text-center'>
            Enter your email below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <form className='grid gap-4' action={onSubmit}>
            <div className='grid gap-3'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='Enter your username'
                required
              />
            </div>
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
            <Button className='w-full bg-main mt-2' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex justify-center items-center space-x-2 mt-2 text-sm'>
            <div className='text-center'>
              Already have an account? Then please{' '}
              <Link href='/sign-in' className='underline text-blue-600'>
                <span className='hover:opacity-80'>click here </span>
              </Link>
              to sign up.
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUpPage;
