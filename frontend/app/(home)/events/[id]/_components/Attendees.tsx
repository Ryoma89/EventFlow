import React from 'react'

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IAttendee } from '@/types';

interface AttendeesProps {
  eventId: string;
  attendees: IAttendee[];
  user: any;
}

const Attendees = ({ eventId, attendees, user }: AttendeesProps) => {

  return (
    <div>
      <div className="px-5 md:px-0">
          <h3 className="text-3xl font-semibold text-main md:text-4xl">Attendees</h3>
          <div className="my-8 flex items-center gap-4 md:mt-8 md:mb-0">
              {attendees && attendees.length === 0 ? (
                <p>No attendees yet. Be the first to attend!</p>
              ) : (
                attendees &&
                attendees.map((attendee) => {
                  return (
                    <div key={attendee._id} className='flex flex-col items-center'>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={attendee.photo || "https://github.com/shadcn.png"} alt="@shadcn" className='w-full h-full'/>
                      </Avatar>
                      <p className='mt-1'>{attendee.username}</p>
                    </div>
                  );
                })
              )}
          </div>
        </div>
    </div>
  )
}

export default Attendees
