import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'run' | 'cycling' | 'strength' | 'walk' | 'swim';
  durationMinutes: number;
  distanceKm: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['run', 'cycling', 'strength', 'walk', 'swim'], required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, default: 0, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
