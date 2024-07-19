import React from 'react'

interface TitleProps {
  title: string;
}
const Title = ({title}: TitleProps) => {
  return (
        <h3 className="text-4xl text-main font-bold text-center sm:text-left md:text-5xl">{title}</h3>
  )
}

export default Title
