import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker',
    baseUrl: apiBaseUrl,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`OctoFit Tracker API listening on port ${PORT}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API:', error);
    process.exit(1);
  }
}

startServer();
