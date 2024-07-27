import React, { useEffect } from "react";
import Title from "../../_components/Title";
import EventForm from "../../../../components/shared/EventForm";
import { getUser } from "@/lib/getUser";
import { useRouter } from "next/navigation";

const EventCreatePage = async () => {
  const user = await getUser();
  const userId = user?._id;

  return (
    <section className="my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28">
      <Title title="Create Event" />
      <EventForm userId={userId} type="Create"/>
    </section>
  );
};

export default EventCreatePage;
