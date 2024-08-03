import { IEvent } from "@/types";

export const fetchEvents = async (): Promise<IEvent[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
    const data: IEvent[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
