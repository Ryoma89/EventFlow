import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Locate, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const EventDetailsPage = () => {
  return (
    <section className="flex justify-center">
      <Card className="w-10/12 mx-auto my-10 max-w-5xl">
        <div className="grid grid-cols-1 ">
        <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="/fes.jpeg"
              alt="Fes"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="">
            <CardHeader className="space-y-3">
              <CardTitle className="text-center md:text-2xl lg:text-3xl">When We Were Young</CardTitle>
              <CardDescription className="lg:text-lg">
                Join us for a thrilling evening of live music and fun! Enjoy
                great performances, delicious food, and a vibrant atmosphere. Do
                not miss out on this unforgettable night!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex-flex-col space-y-4 sm:flex-row sm:items-center">
                <div className="flex gap-2">
                  <p className="rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    $1000000
                  </p>
                  <Badge variant="outline" className="bg-white">
                    Music
                  </Badge>
                </div>
                <div className="space-y-4 md:flex md:justify-between md:items-center md:space-y-0">
                <div className="flex items-center gap-2 md:gap-3">
                  {/* organized by{" "} */}
                  <User className="h-5 w-5 md:h-8 md:w-8" />
                  <span className="md:text-lg">
                    John Doe
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 md:h-8 md:w-8" />
                  <div className="flex flex-wrap items-center md:text-lg">
                    <p>2024-10-19 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 md:h-8 md:w-8" />
                  <p className="md:text-lg">Las Vegas, NV</p>
                </div>
                </div>
                <p className="truncate text-blue-600 underline md:text-lg">
                  https://www.google.co.uk/
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join Event</Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default EventDetailsPage;
