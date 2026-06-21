#!/usr/bin/env node

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

async function main() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection.db;

  // Drop existing collections if they exist (safe to ignore errors)
  await db.collection('workouts').drop().catch(() => {});
  await db.collection('users').drop().catch(() => {});

  const users = [
    { name: 'Alice', email: 'alice@example.com', createdAt: new Date() },
    { name: 'Bob', email: 'bob@example.com', createdAt: new Date() },
    { name: 'Charlie', email: 'charlie@example.com', createdAt: new Date() }
  ];

  const resUsers = await db.collection('users').insertMany(users);
  const aliceId = resUsers.insertedIds[0];
  const bobId = resUsers.insertedIds[1];
  const charlieId = resUsers.insertedIds[2];

  const workouts = [
    { user: aliceId, type: 'run', duration: 30, calories: 300, date: new Date() },
    { user: bobId, type: 'bike', duration: 45, calories: 450, date: new Date() },
    { user: aliceId, type: 'yoga', duration: 60, calories: 200, date: new Date() },
    { user: charlieId, type: 'swim', duration: 40, calories: 350, date: new Date() }
  ];

  await db.collection('workouts').insertMany(workouts);

  console.log('Seed complete: inserted', Object.keys(resUsers.insertedIds).length, 'users and', workouts.length, 'workouts');
  await mongoose.disconnect();
}

main().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
