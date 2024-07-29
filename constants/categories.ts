export const CATEGORIES = [
  {  name: "Music", image: "/music.jpeg" },
  {  name: "Art", image: "/art.jpeg" },
  {  name: "Food", image: "/food.jpeg" },
  {  name: "Tech", image: "/tech.jpeg" },
  {  name: "Sports", image: "/sports.jpeg" },
  {  name: "Wellness", image: "/wellness.jpeg" },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  category: "",
  price: "",
  isFree: false,
  url: "",
};
