import dotenv from 'dotenv';
dotenv.config(); // .env читается на верхнем уровне

import express from 'express';
import cors from 'cors';
import connectDb from './controllers/db.js';
import userRoutes from './routes/Users.js';
import authRoutes from './routes/Auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDb();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
