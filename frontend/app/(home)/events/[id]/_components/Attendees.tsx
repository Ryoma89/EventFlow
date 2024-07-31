import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Attendees = () => {
  return (
    <div>
      <div className="px-5">
          <h3 className="text-2xl font-semibold text-main">Attendees</h3>
          <div className="my-8 flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
    </div>
  )
}

export default Attendees
