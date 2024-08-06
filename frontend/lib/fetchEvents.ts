import { IEvent } from "@/types";

export const fetchEvents = async (): Promise<IEvent[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
    const data: IEvent[] = await response.json();
    const now = new Date();
    const filteredData = data.filter((event) => new Date(event.endDateTime) > now);
    return filteredData;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
