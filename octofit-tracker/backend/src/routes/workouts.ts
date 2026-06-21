import express from 'express';
import Workout from '../models/Workout';
import User from '../models/User';

const router = express.Router();

// Create a workout
router.post('/', async (req, res) => {
  try {
    const { user: userId, type, duration, calories, date } = req.body;
    if (!userId || !type || !duration) return res.status(400).json({ error: 'user, type and duration are required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'user not found' });

    const workout = new Workout({ user: userId, type, duration, calories: calories || 0, date: date || undefined });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// List workouts (optionally filter by user)
router.get('/', async (req, res) => {
  try {
    const { user } = req.query;
    const filter: any = {};
    if (user) filter.user = user;

    const workouts = await Workout.find(filter).sort({ date: -1 }).limit(500).populate('user', 'name email');
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// Get workout by id
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('user', 'name email');
    if (!workout) return res.status(404).json({ error: 'workout not found' });
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'invalid id' });
  }
});

export default router;
