import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let userId: string | null = null;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as JwtPayload;
      if (decoded && typeof decoded === 'object' && decoded.userId) {
        userId = decoded.userId as string;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }});

        user = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
