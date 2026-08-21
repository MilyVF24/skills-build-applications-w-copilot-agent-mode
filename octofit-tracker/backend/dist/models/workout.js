import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    focus: { type: String, enum: ['cardio', 'strength', 'recovery', 'mobility'], required: true },
}, { timestamps: true });
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
