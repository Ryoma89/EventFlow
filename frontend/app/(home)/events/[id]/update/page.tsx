import React from "react";
import { getUser } from "@/lib/getUser";
import Title from "@/app/(home)/_components/Title";
import EventForm from "@/components/shared/EventForm";

const EventUpdatePage = async () => {
  const user = await getUser();
  // console.log("EventUpdatePageのuser", user);
  const userId = user?._id;
  console.log("EventUpdatePageのuserId", userId);
  return (
    <section className="my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28">
      <Title title="Create Event" />
      <EventForm userId={userId} type="Update"/>
    </section>
  );
};

export default EventUpdatePage;
