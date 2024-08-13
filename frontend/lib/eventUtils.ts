import { IEvent } from "@/types";

export const formatDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Vancouver',
  };

  const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(date);
  const [formattedDate, formattedTime] = formattedDateTime.split(', ');

  return { date: formattedDate.replace(/\//g, '-'), time: formattedTime };
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