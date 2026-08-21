import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker',
        timestamp: new Date().toISOString(),
    });
});
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Connected to MongoDB: ${MONGODB_URI}`);
        app.listen(PORT, () => {
            console.log(`OctoFit Tracker API listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start OctoFit Tracker API:', error);
        process.exit(1);
    }
}
startServer();
