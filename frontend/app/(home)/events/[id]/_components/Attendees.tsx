import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAttendee } from '@/types';

interface AttendeesProps {
  eventId: string;
  attendees: IAttendee[];
  user: any;
}

const Attendees = ({ eventId, attendees, user }: AttendeesProps) => {

  return (
    <div>
      <div className="px-5 md:pb-5">
          <h3 className="text-3xl font-semibold text-main md:text-4xl">Attendees</h3>
          <div className="my-8 flex items-center gap-4 md:mt-8 md:mb-0">
            <div className='flex flex-col items-center'>
              {attendees && attendees.length === 0 ? (
                <p>No attendees yet. Be the first to attend!</p>
              ) : (
                attendees &&
                attendees.map((attendee) => {
                  return (
                    <div key={attendee._id}>
                      <Avatar>
                        <AvatarImage src={attendee.photo || "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>{attendee.username}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Attendees
