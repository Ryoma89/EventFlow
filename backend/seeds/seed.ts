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
        photo:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        photo:
          'https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        photo:
          'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      },
    ]);

    const events = await Event.insertMany([
      {
        title: 'Rock Concert',
        description: 'An electrifying rock concert with live bands.',
        location: 'New York, NY',
        startDateTime: new Date('2024-09-15T20:00:00Z'),
        endDateTime: new Date('2024-09-15T23:00:00Z'),
        imageUrl:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D',
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
        imageUrl:
          'https://images.unsplash.com/photo-1656129974517-7da8bb940a1d?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        imageUrl:
          'https://images.unsplash.com/photo-1678646142794-253fdd20fa05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Rm9vZCUyMGZlc3RpdmFsfGVufDB8fDB8fHww',
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
        imageUrl:
          'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
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
        imageUrl:
          'https://images.unsplash.com/photo-1524646349956-1590eacfa324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFyYXRob258ZW58MHx8MHx8fDA%3D',
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
        imageUrl:
          'https://images.unsplash.com/photo-1529693662653-9d480530a697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHlvZ2F8ZW58MHx8MHx8fDA%3D',
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
