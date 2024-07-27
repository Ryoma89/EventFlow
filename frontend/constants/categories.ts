const categories = [
  { _id: '1', name: 'Music', image: '/music.jpeg' },
  { _id: '2', name: 'Art', image: '/art.jpeg' },
  { _id: '3', name: 'Food', image: '/food.jpeg' },
  { _id: '4', name: 'Tech', image: '/tech.jpeg' },
  { _id: '5', name: 'Sports', image: '/sports.jpeg' },
  { _id: '6', name: 'Wellness', image: '/wellness.jpeg' },
];

export default categories;

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}