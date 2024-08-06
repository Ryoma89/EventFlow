import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-main text-white pt-10">
      <div className="mx-auto w-4/5 mb-8">
        <div className="lg:w-[818px] mx-auto">
          {/* md */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="w-3/5 mx-auto">
              <h5 className="text-lg font-bold mb-4">Help</h5>
              <ul className="space-y-1">
                <li className="hover:opacity-70">
                  <Link href="/profile">Account</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href="/events">Event List</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href="/events/create">Create Event</Link>
                </li>
              </ul>
            </div>
            <div className="w-3/5 mx-auto">
              <h5 className="text-lg font-bold mb-4">Categories</h5>
              <ul className="space-y-1">
                <li className="hover:opacity-70">
                <Link href={`/events?category=music`}>Music</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href={`/events?category=art`}>Art</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href={`/events?category=food`}>Food</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href={`/events?category=tech`}>Tech</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href={`/events?category=sports`}>Sports</Link>
                </li>
                <li className="hover:opacity-70">
                  <Link href={`/events?category=wellness`}>Wellness</Link>
                </li>
              </ul>
            </div>
            <div className="w-3/5 mx-auto">
              <h5 className="text-lg font-bold mb-4">Contact</h5>
              <ul className="space-y-1">
                <li className="flex items-center space-x-2 hover:opacity-70">
                  <FacebookIcon className="w-5 h-5" />
                  <Link href="https://facebook.com">Facebook</Link>
                </li>
                <li className="flex items-center space-x-2 hover:opacity-70">
                  <InstagramIcon className="w-5 h-5" />
                  <Link href="https://instagram.com">Instagram</Link>
                </li>
                <li className="flex items-center space-x-2 hover:opacity-70">
                  <TwitterIcon className="w-5 h-5" />
                  <Link href="https://twitter.com">Twitter</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* sm */}
          <div className="sm:hidden">
            <Accordion type="single" collapsible className="flex justify-between space-x-2">
              <AccordionItem value="help">
                <AccordionTrigger>Help</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    <li className="hover:opacity-70">
                      <Link href="/profile">Account</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href="/events">Event List</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href="/events/create">Create Event</Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="categories">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    <li className="hover:opacity-70">
                      <Link href={`/events?category=music`}>Music</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href={`/events?category=art`}>Art</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href={`/events?category=food`}>Food</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href={`/events?category=tech`}>Tech</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href={`/events?category=sports`}>Sports</Link>
                    </li>
                    <li className="hover:opacity-70">
                      <Link href={`/events?category=wellness`}>Wellness</Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger>Contact</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    <li className="flex items-center space-x-2 hover:opacity-70">
                      <FacebookIcon className="w-5 h-5" />
                      <Link href="https://facebook.com">Facebook</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:opacity-70">
                      <InstagramIcon className="w-5 h-5" />
                      <Link href="https://instagram.com">Instagram</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:opacity-70">
                      <TwitterIcon className="w-5 h-5" />
                      <Link href="https://twitter.com">Twitter</Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Separator className="" />
      <div className="text-center py-5">
        &copy; 2024 Evently, All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
