import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboardEntry.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
        res.json({ success: true, count: leaderboard.length, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to load leaderboard', error: String(error) });
    }
});
router.get('/:rank', async (req, res) => {
    try {
        const match = await LeaderboardEntry.findOne({ rank: Number(req.params.rank) }).lean();
        if (!match) {
            return res.status(404).json({ success: false, message: 'Leaderboard entry not found' });
        }
        return res.json({ success: true, data: match });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to load leaderboard entry', error: String(error) });
    }
});
export default router;
