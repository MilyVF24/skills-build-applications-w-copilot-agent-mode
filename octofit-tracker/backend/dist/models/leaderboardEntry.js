import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    rank: { type: Number, required: true, min: 1 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
}, { timestamps: true });
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
