import React from 'react'
import Title from './Title'
import CategoryCard from './CategoryCard'

const Categories = () => {
  return (
    <section className="my-20 rounded-lg mx-auto w-4/5 sm:my-20 md:my-28">
        <Title title="Explore Categories" />
        <CategoryCard />
    </section>
  )
}

export default Categories
