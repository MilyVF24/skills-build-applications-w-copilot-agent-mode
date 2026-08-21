import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    goal: { type: String, required: true, trim: true },
}, { timestamps: true });
const Team = mongoose.model('Team', teamSchema);
export default Team;
