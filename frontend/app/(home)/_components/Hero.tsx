import Search from '@/components/shared/Search'
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
        <Search />
      </div>
    </section>
  )
}

export default Hero
