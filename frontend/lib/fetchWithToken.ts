export const fetchWithToken = async (
  url: string,
  options: RequestInit,
  refreshToken?: string
) => {
  try {
    let response = await fetch(url, options);
    if (response.status === 401) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
          credentials: 'include',
        }
      );

      if (!refreshResponse.ok) {
        throw new Error('Failed to refresh token');
      }

      const { accessToken: newToken } = await refreshResponse.json();

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };

      response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Failed to fetch data even after token refresh');
      }
    }

    return response;
  } catch (error) {
    console.error('Error in fetchWithToken:', error);
    throw error;
  }
};
