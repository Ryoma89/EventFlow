export const checkAuth = async(token: string) => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })

  if (response.ok) {
    const result = await response.json()
    return result
  } else {
    return null
  }

  } catch (error) {
    console.log(error)
    return null
  }
};