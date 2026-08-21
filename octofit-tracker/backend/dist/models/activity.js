import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['run', 'cycling', 'strength', 'walk', 'swim'], required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, default: 0, min: 0 },
    date: { type: Date, required: true },
}, { timestamps: true });
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
