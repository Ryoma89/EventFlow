import { IEvent } from "@/types";

export const formatDateTime = (date: Date) => {
  const isoString = date.toISOString();
  const formattedDate = isoString.slice(0, 10);
  const formattedTime = isoString.slice(11, 19);

  return { date: formattedDate, time: formattedTime };
};

export const formatEventData = (events: IEvent[]) => {
  return events.map((event) => ({
    ...event,
    startDate: formatDateTime(new Date(event.startDateTime)).date,
    endDate: formatDateTime(new Date(event.endDateTime)).date,
  }));
};


export const convertToAbsolutePath = (relativePath: string) => {
  if (relativePath.startsWith('../../assets/images/')) {
    return relativePath.replace('../../assets/images/', '/');
  }
  return relativePath;
};