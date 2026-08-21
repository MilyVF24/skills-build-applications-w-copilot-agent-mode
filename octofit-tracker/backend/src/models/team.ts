import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  goal: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    goal: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
