import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <section 
      className="bg-cover bg-center h-80 sm:h-96 md:h-[450px]" 
      style={{
        backgroundImage: 'url("/hero.jpeg")',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backgroundBlendMode: 'lighten'
      }}
    >
      <div className='flex flex-col justify-center items-center h-full px-10'>
        <h2 className='text-white text-center text-2xl sm:text-3xl md:text-4xl'>Find the perfect event for you</h2>
        <div className="relative mt-3 w-[338px] sm:w-[422px] md:w-[506px]">
          <Input
            type="text"
            placeholder="Search events"
            className="py-2 pl-10 pr-4 border rounded-md w-full bg-inputBg"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-icon" />
        </div>
      </div>
    </section>
  )
}

export default Hero
