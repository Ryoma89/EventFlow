import { IEvent } from "@/types";

export const filterEvents = (events: IEvent[], query: string | null, category: string | null): IEvent[] => {
  return events.filter((event) => {
    const matchesQuery = query
      ? event.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      : true;
    const matchesCategory = category
      ? event.category && event.category.name.toLocaleLowerCase() === category.toLocaleLowerCase()
      : true;
    return matchesQuery && matchesCategory;
  });
};