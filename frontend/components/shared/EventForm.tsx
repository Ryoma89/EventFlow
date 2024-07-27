"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { IEvent } from "@/types";
import { eventDefaultValues } from "@/constants/categories";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId  }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push(`/`);
    }
  }, [userId, router]);

  const initialValues = event && type === 'Update' 
    ? { 
      ...event, 
      startDateTime: new Date(event.startDateTime), 
      endDateTime: new Date(event.endDateTime) 
    }
    : eventDefaultValues;

    const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
    let uploadedImageUrl = values.imageUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files);

      if(!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const payload = {
      ...values,
      imageUrl: uploadedImageUrl,
      userId,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: type === 'Create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: payload, eventId }),
      });

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
          description: `Failed to ${type.toLowerCase()} event: ${errorData.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
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
                  <FormControl>
                    <Input
                      placeholder="Event title"
                      {...field}
                      className="bg-gray-50 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
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
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="Event Description"
                      {...field}
                      className="bg-gray-50 border-none rounded-2xl"
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
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        width={24}
                        height={24}
                        alt="calendar"
                      />
                      <Input
                        placeholder="Event location or Online"
                        {...field}
                        className="bg-gray-50 border-none"
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
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
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
                        className="bg-gray-50 text-gray-600"
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
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
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
                        className="bg-gray-50 text-gray-600"
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
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        width={24}
                        height={24}
                        alt="dollar"
                        className="bg-gray-50"
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        {...field}
                        className="bg-gray-50 border-none outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/link.svg"
                        width={24}
                        height={24}
                        alt="link"
                      />
                      <Input
                        placeholder="Url"
                        {...field}
                        className="bg-gray-50 border-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 mt-5 w-full"
            variant={"main"}
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
