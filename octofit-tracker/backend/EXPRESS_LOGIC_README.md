# Express Logic Tier

This commit adds a simple Express "logic tier" to the backend. It includes:

- Mongoose models:
  - User (src/models/User.ts)
  - Workout (src/models/Workout.ts)
- Express routes:
  - /api/users (create/list/get)
  - /api/workouts (create/list/get)
- Integration in server.ts with CORS, dotenv, and an error handler
- Updated backend package.json to include cors and dotenv

How to test

1. Install backend deps:
   cd octofit-tracker/backend && npm install
2. Start MongoDB (example using Docker):
   docker run --name octofit-mongo -p 27017:27017 -d mongo:7
3. Start the backend:
   npm run dev
4. Quick tests:
   - Health: curl http://localhost:8000/health
   - Create user:
     curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com"}' http://localhost:8000/api/users
   - Create workout (replace USER_ID with created user's _id):
     curl -X POST -H "Content-Type: application/json" -d '{"user":"USER_ID","type":"run","duration":30,"calories":300}' http://localhost:8000/api/workouts

