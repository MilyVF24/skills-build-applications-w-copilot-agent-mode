import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: 'cardio' | 'strength' | 'recovery' | 'mobility';
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    focus: { type: String, enum: ['cardio', 'strength', 'recovery', 'mobility'], required: true },
  },
  { timestamps: true },
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
