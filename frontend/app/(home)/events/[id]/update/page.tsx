import React from "react";
import { getUser } from "@/lib/getUser";
import Title from "@/app/(home)/_components/Title";
import EventForm from "@/components/shared/EventForm";
import { fetchEventById } from "@/lib/fetcheventById";

type UpdateEventProps = {
  params: {
    id: string
  }
}

const EventUpdatePage = async ({ params: { id } }: UpdateEventProps) => {

  return (
    <section className="my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28">
      <Title title="Create Event" />
      <EventForm  type="Update" eventId={id}/>
    </section>
  );
};

export default EventUpdatePage;
