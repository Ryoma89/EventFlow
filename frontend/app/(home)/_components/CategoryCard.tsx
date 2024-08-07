import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { CATEGORIES } from '../../../constants/categories';

const CategoryCard = () => {
  return (
    <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:mt-12 md:grid-cols-3'>
      {CATEGORIES.map((category) => (
        <Link href={`/events?category=${category.name}`} key={category.name}>
          <Card key={category.name} className='relative hover:opacity-90'>
            <div
              className='w-full h-32 rounded-lg overflow-hidden bg-cover bg-center md:h-40'
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backgroundBlendMode: 'lighten',
              }}
            ></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold'>
              {category.name}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;
