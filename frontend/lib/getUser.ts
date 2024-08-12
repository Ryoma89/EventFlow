import { cookies } from 'next/headers';

export const getUser = async () => {
  console.log('getUser function called');
  const token = cookies().get('token')?.value;
  console.log('Token:', token);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
};
