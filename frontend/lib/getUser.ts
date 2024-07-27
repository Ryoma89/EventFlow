import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getUser = async () => {
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
        // console.log("getUserのuser", user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return user;
};
