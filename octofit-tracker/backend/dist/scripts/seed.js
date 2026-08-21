import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboardEntry.js';
import Workout from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava.patel@octofit.com',
                passwordHash: 'hashed_password_ava',
                role: 'member',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Marcus Chen',
                email: 'marcus.chen@octofit.com',
                passwordHash: 'hashed_password_marcus',
                role: 'coach',
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Priya Singh',
                email: 'priya.singh@octofit.com',
                passwordHash: 'hashed_password_priya',
                role: 'member',
                fitnessLevel: 'beginner',
            },
            {
                name: 'Liam Johnson',
                email: 'liam.johnson@octofit.com',
                passwordHash: 'hashed_password_liam',
                role: 'member',
                fitnessLevel: 'intermediate',
            },
        ]);
        await Team.insertMany([
            {
                name: 'Velocity Crew',
                members: [users[0]._id, users[2]._id],
                goal: 'Improve weekly mileage and endurance consistency',
            },
            {
                name: 'Peak Pursuit',
                members: [users[1]._id, users[3]._id],
                goal: 'Build strength and recovery consistency',
            },
        ]);
        await Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 42,
                distanceKm: 8.2,
                date: new Date('2026-08-19T06:30:00.000Z'),
            },
            {
                userId: users[2]._id,
                type: 'cycling',
                durationMinutes: 55,
                distanceKm: 21.5,
                date: new Date('2026-08-20T07:15:00.000Z'),
            },
            {
                userId: users[1]._id,
                type: 'strength',
                durationMinutes: 35,
                distanceKm: 0,
                date: new Date('2026-08-21T18:00:00.000Z'),
            },
            {
                userId: users[3]._id,
                type: 'walk',
                durationMinutes: 28,
                distanceKm: 4.5,
                date: new Date('2026-08-22T08:00:00.000Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            { rank: 1, userId: users[0]._id, name: users[0].name, points: 1250 },
            { rank: 2, userId: users[1]._id, name: users[1].name, points: 1180 },
            { rank: 3, userId: users[2]._id, name: users[2].name, points: 970 },
            { rank: 4, userId: users[3]._id, name: users[3].name, points: 910 },
        ]);
        await Workout.insertMany([
            {
                title: 'Tempo Run',
                level: 'intermediate',
                durationMinutes: 30,
                focus: 'cardio',
            },
            {
                title: 'Core Stability Circuit',
                level: 'beginner',
                durationMinutes: 25,
                focus: 'strength',
            },
            {
                title: 'HIIT Mobility Flow',
                level: 'advanced',
                durationMinutes: 20,
                focus: 'recovery',
            },
            {
                title: 'Power Walk Ladder',
                level: 'beginner',
                durationMinutes: 18,
                focus: 'mobility',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
