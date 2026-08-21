import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find({}).populate('members').lean();
    res.json({ success: true, count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load teams', error: String(error) });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members').lean();

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    return res.json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to load team', error: String(error) });
  }
});

export default router;
