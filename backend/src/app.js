import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

export default app;
