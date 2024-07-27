import React from 'react'
import EventCard from './EventCard'
import Title from './Title'

const MyOrganizedEvents = () => {
  return (
    <div className='mt-14 md:mt-20'>
      <Title title="My Organized Events" />
      <div className='mt-10 space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:mt-12 lg:grid-cols-3'>
      <EventCard />
      <EventCard />
      <EventCard />
      </div>
    </div>
  )
}

export default MyOrganizedEvents
