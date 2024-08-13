// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string
  event: {
    title: string
    description: string
    location: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string
  }
  path: string
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string
  }
  path: string
}

export type DeleteEventParams = {
  eventId: string
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type GetEventsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedEventsByCategoryParams = {
  categoryId: string
  eventId: string
  limit?: number
  page: number | string
}

export type Event = {
  _id: string
  title: string
  description: string
  price: string
  isFree: boolean
  imageUrl: string
  location: string
  startDateTime: Date
  endDateTime: Date
  url: string
  organizer: {
    _id: string
    firstName: string
    lastName: string
  }
  category: {
    _id: string
    name: string
  }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string
  eventId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  eventId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByEventParams = {
  eventId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ICategory {
  name: string;
  image: string;
}

export interface IEvent {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  startDateTime: Date;
  endDateTime: Date;
  imageUrl: string;
  price: string;
  isFree: boolean;
  url?: string;
  createdAt: Date;
  category: { _id: string; name: string };
  organizer: { _id: string; username: string };
}

export interface EventResponse {
  event: IEvent;
  comments: Comment[]
  attendees: IAttendee[];
}

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  event: string;
  user: {
    _id: string;
    username: string;
    email: string;
    photo?: string;
    password: string;
    _v: number
  };
}

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  photo?: string;
}

export interface IAttendee {
  _id: string;
  username: string;
  photo?: string;
}

export interface ITrendingEvents {
  count: number;
    eventId: string,
    event: {
      _id: string,
      title: string,
      description: string,
      location:   string,
      startDateTime: string,
      endDateTime: string,
      imageUrl: string,
      price: string,
      isFree: boolean,
      url: string,
      category: string,
      organizer: string,
      createdAt:  string,
      __v: 0
    }
}

export interface AttendingEvents {
  _id: string;
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  event: {
    _id: string;
    title: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    imageUrl: string;
    price: string;
    isFree: boolean;
    url: string;
    category: string;
    organizer: string;
    createdAt: Date;
    __v: number;
  };
  buyer: string;
  __v: number;
}

