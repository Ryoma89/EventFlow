import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from '../models/user.model';
import Event from '../models/event.model';
import Category from '../models/category.model';
import { CATEGORIES } from '../../constants/categories';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI!, {
      dbName: 'eventflow',
      bufferCommands: false,
    });
    console.log('Connected to MongoDB');

    // Drop existing collections
    await User.deleteMany({});
    await Event.deleteMany({});
    await Category.deleteMany({});

    // Define initial data
    const categories = await Category.insertMany(CATEGORIES);

    const users = await User.insertMany([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123',
        photo: '../../assets/images/user_image1.jpg',
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        photo: '../../assets/images/user_image2.jpg',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        photo: '../../assets/images/user_image3.jpg',
      },
    ]);

    const events = await Event.insertMany([
      {
        title: 'Rock Concert',
        description: 'An electrifying rock concert with live bands.',
        location: 'New York, NY',
        startDateTime: new Date('2024-09-15T20:00:00Z'),
        endDateTime: new Date('2024-09-15T23:00:00Z'),
        imageUrl: '../../assets/images/event_image1.jpg',
        price: '50',
        isFree: false,
        url: 'https://rockconcert.com',
        category: categories.find((cat) => cat.name === 'Music')._id,
        organizer: users[0]._id,
      },
      {
        title: 'Modern Art Exhibition',
        description: 'Explore the latest trends in modern art.',
        location: 'San Francisco, CA',
        startDateTime: new Date('2024-10-01T11:00:00Z'),
        endDateTime: new Date('2024-10-01T17:00:00Z'),
        imageUrl: '../../assets/images/event_image2.jpg',
        price: '30',
        isFree: false,
        url: 'https://modernartexpo.com',
        category: categories.find((cat) => cat.name === 'Art')._id,
        organizer: users[1]._id,
      },
      {
        title: 'Food Festival',
        description: 'Taste a variety of cuisines from around the world.',
        location: 'Los Angeles, CA',
        startDateTime: new Date('2024-11-10T12:00:00Z'),
        endDateTime: new Date('2024-11-10T20:00:00Z'),
        imageUrl: '../../assets/images/event_image3.jpg',
        price: 'Free',
        isFree: true,
        url: 'https://foodfestival.com',
        category: categories.find((cat) => cat.name === 'Food')._id,
        organizer: users[2]._id,
      },
      {
        title: 'Tech Innovations Conference',
        description:
          'A conference showcasing the latest in technology innovations.',
        location: 'Austin, TX',
        startDateTime: new Date('2024-12-05T09:00:00Z'),
        endDateTime: new Date('2024-12-05T17:00:00Z'),
        imageUrl: '../../assets/images/event_image4.jpg',
        price: 'Free',
        isFree: true,
        url: 'https://techconference.com',
        category: categories.find((cat) => cat.name === 'Tech')._id,
        organizer: users[0]._id,
      },
      {
        title: 'Marathon Race',
        description:
          'Join the annual marathon race for a day of sports and fitness.',
        location: 'Berlin, Germany',
        startDateTime: new Date('2024-12-20T08:00:00Z'),
        endDateTime: new Date('2024-12-20T12:00:00Z'),
        imageUrl: '../../assets/images/event_image5.jpg',
        price: 'Free',
        isFree: true,
        url: 'https://marathonrace.com',
        category: categories.find((cat) => cat.name === 'Sports')._id,
        organizer: users[1]._id,
      },
      {
        title: 'Yoga Retreat',
        description:
          'A peaceful retreat focused on wellness and relaxation through yoga.',
        location: 'Bali, Indonesia',
        startDateTime: new Date('2024-11-25T09:00:00Z'),
        endDateTime: new Date('2024-11-25T17:00:00Z'),
        imageUrl: '../../assets/images/event_image6.jpg',
        price: '200',
        isFree: false,
        url: 'https://yogaretreat.com',
        category: categories.find((cat) => cat.name === 'Wellness')._id,
        organizer: users[2]._id,
      },
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
