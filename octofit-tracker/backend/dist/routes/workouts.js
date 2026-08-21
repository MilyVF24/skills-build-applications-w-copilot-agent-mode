import { Router } from 'express';
import Workout from '../models/workout.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ durationMinutes: 1 }).lean();
        res.json({ success: true, count: workouts.length, data: workouts });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to load workouts', error: String(error) });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).lean();
        if (!workout) {
            return res.status(404).json({ success: false, message: 'Workout not found' });
        }
        return res.json({ success: true, data: workout });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to load workout', error: String(error) });
    }
});
export default router;
