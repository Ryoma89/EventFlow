import Search from '@/components/shared/Search';

const Hero = () => {
  return (
    <section
      className='bg-cover bg-center h-80 sm:h-96 md:h-[450px] relative'
      style={{
        backgroundImage: 'url("/hero.jpeg")',
      }}
    >
      <div className='absolute inset-0 w-full h-full bg-black opacity-20' />
      <div className='flex flex-col justify-center items-center h-full px-10'>
        <h2 className='text-white text-center text-2xl sm:text-3xl md:text-4xl z-10'>
          Find the perfect event for you
        </h2>
        <Search />
      </div>
    </section>
  );
};

export default Hero;
