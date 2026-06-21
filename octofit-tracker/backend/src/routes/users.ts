import express from 'express';
import User from '../models/User';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'user with this email already exists' });

    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// List users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(100);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'user not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'invalid id' });
  }
});

export default router;
