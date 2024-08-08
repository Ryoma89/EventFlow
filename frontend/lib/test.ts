export const test = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error('Error fetching user data:', data);
      return null;
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
};

import { cookies } from 'next/headers';
