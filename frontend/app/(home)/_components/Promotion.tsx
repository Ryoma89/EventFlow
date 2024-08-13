import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";

const Promotion = () => {
  return (
    <section className="bg-button py-10 my-16 mx-auto rounded-lg w-4/5 sm:my-20 md:my-28">
      <div className="container mx-auto text-center max-w-[900px]">
        <h3 className="text-3xl mb-4 text-white sm:text-4xl lg:text-5xl lg:mb-8">
          Discover the best upcoming events
        </h3>
        <p className="mb-6 text-lg sm:text-xl lg:text-2xl lg:mb-10">
          Explore the wide range of events, from music festivals to art
          exhibitions, happening in your area and all over the world! You will
          definitely find something for you
        </p>
        <div className="sm:grid sm:grid-cols-2">
          <div className="w-3/5 mx-auto sm:w-4/5">
            <Link href="/events">
              <Button className="bg-main w-full">
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="w-3/5 mx-auto sm:w-4/5">
            <Link href="/events/create">
              <Button className="bg-main w-full mt-5 sm:mt-0">
                Create Event
                <Plus className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
