import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity.find({}).sort({ date: -1 }).lean();
        res.json({ success: true, count: activities.length, data: activities });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to load activities', error: String(error) });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).lean();
        if (!activity) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }
        return res.json({ success: true, data: activity });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to load activity', error: String(error) });
    }
});
export default router;
