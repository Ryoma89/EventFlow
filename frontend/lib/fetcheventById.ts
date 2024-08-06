import { IEvent } from "@/types";

export const fetchEventById = async (id: string): Promise<IEvent> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    const data: IEvent = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};
