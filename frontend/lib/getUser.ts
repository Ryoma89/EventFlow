import { cookies } from 'next/headers';
import { fetchWithToken } from './fetchWithToken';
import { User } from '@/types';

export const getUser = async () => {
  const token = cookies().get('token')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;
  try {
    const response = await fetchWithToken(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      refreshToken
    );
    if (!response.ok) return null;

    const user: User = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
};
