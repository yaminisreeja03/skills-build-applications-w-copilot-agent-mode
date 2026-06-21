Seed script

This repository includes a seed script to initialize the octofit MongoDB with example users and workouts.

Files:
- octofit-tracker/backend/scripts/seed.js

What it does:
- Connects to MongoDB at the MONGO_URI environment variable or mongodb://localhost:27017/octofit
- Drops existing 'users' and 'workouts' collections (if present)
- Inserts 3 sample users and 4 sample workouts (workouts reference seeded users)

How to run:
1. Ensure MongoDB is running (default port 27017). Example using Docker:
   docker run --name octofit-mongo -p 27017:27017 -d mongo:7
2. From the backend directory:
   cd octofit-tracker/backend
   npm install
   npm run seed

Notes:
- If you need to use a custom MongoDB URI, set MONGO_URI before running the script, e.g.:
  MONGO_URI="mongodb://localhost:27017/octofit" npm run seed
