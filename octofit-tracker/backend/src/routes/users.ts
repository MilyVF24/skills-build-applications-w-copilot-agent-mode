import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find({}).lean();
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load users', error: String(error) });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to load user', error: String(error) });
  }
});

export default router;
