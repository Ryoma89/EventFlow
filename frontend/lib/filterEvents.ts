import { IEvent } from "@/types";

export const filterEvents = (events: IEvent[], query: string | null, category: string | null): IEvent[] => {
  return events.filter((event) => {
    const normalizedQuery = query?.trim().toLocaleLowerCase();
    const matchesQuery = normalizedQuery
      ? event.title.toLocaleLowerCase().includes(normalizedQuery)
      : true;
      
    const matchesCategory = category
      ? event.category && event.category.name.toLocaleLowerCase() === category.trim().toLocaleLowerCase()
      : true;
      
    const matchesQueryOrCategory = normalizedQuery
      ? matchesQuery || (event.category && event.category.name.toLocaleLowerCase().includes(normalizedQuery))
      : matchesCategory;
    
    return matchesQueryOrCategory && matchesCategory;
  });
};