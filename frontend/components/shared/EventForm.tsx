"use client";

import { z } from "zod";
import { IEvent } from "@/types";
import Dropdown from "./Dropdown";
import { getUser } from "@/lib/getUser";
import { eventFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchEventById } from "@/lib/fetcheventById";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FileUploader } from "./FileUploader";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import "react-datepicker/dist/react-datepicker.css";
import { eventDefaultValues } from "../../../constants/categories";

type EventFormProps = {
  type: "Create" | "Update";
  eventId?: string;
};

const EventForm = ({ type, eventId }: EventFormProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [event, setEvent] = useState<IEvent | null>(null);

  const { startUpload } = useUploadThing("imageUploader");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (!userData) {
        router.push("/sign-in");
      }
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (type === "Update" && eventId) {
      const fetchEventDetails = async () => {
        try {
          const data = await fetchEventById(eventId);
          const eventData = data.event;
          setEvent(eventData);
          form.reset({
            ...eventData,
            startDateTime: new Date(eventData.startDateTime),
            endDateTime: new Date(eventData.endDateTime),
            category: eventData.category.name || "",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch event details.",
            variant: "destructive",
          });
        }
      };
      fetchEventDetails();
    }
  }, [type, eventId]);

  const initialValues =
    event && type === "Update" && event
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          category: event.category?.name,
        }
      : eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues as z.infer<typeof eventFormSchema>,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const payload = {
      ...values,
      imageUrl: uploadedImageUrl,
      organizer: user._id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: type === "Create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ event: payload, eventId }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        form.reset();
        router.push(`/events/${result._id}`);
        toast({
          title: "Event saved",
          description: `Your event has been ${type.toLowerCase()}d successfully.`,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to ${type.toLowerCase()} event: ${
            errorData.message
          }`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: `An unexpected error occurred. Please try again later.`,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Event title"
                      {...field}
                      className="bg-auth border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Description</FormLabel>
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="Event Description"
                      {...field}
                      className="bg-auth border-none rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Image</FormLabel>
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-auth px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        width={24}
                        height={24}
                        alt="calendar"
                      />
                      <Input
                        placeholder="Event location or Online"
                        {...field}
                        className="bg-auth border-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-auth px-4 py-2">
                      <Calendar className="text-gray-500" />
                      <p className="ml-3 whitespace-nowrap text-gray-600">
                        Start Date:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="bg-auth text-gray-600"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-auth px-4 py-2">
                      <Calendar className="text-gray-500" />
                      <p className="ml-3 whitespace-nowrap text-gray-600">
                        End Date:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="bg-auth text-gray-600"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-auth px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        width={24}
                        height={24}
                        alt="dollar"
                        className="bg-auth"
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        {...field}
                        className="bg-auth border-none outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <label
                                  htmlFor="isFre"
                                  className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Free Ticket
                                </label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                  id="isFree"
                                  className="mr-2 h-5 w-5 border-2 border-gray-500 "
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Event Url</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-auth px-4 py-2">
                      <Image
                        src="/assets/icons/link.svg"
                        width={24}
                        height={24}
                        alt="link"
                      />
                      <Input
                        placeholder="Url"
                        {...field}
                        className="bg-auth border-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-5">
            <Link href="/" className="col-span-1 mt-5 w-full">
              <Button className="w-full bg-icon hover:bg-red-600">Cancel</Button>
            </Link>
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="col-span-1 mt-5 w-full"
              variant={"main"}
            >
              {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
