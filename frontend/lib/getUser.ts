import { cookies } from 'next/headers';

export const getUser = async () => {
  const token = cookies().get('token')?.value;
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
