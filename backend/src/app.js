import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDb from './controllers/db.js';
import user from './routes/Users.js';
import auth from './routes/Auth.js';
import category from './routes/Category.js';
import provider from './routes/Provider.js';
import service from './routes/Service.js';
import booking from './routes/Booking.js'
import review from './routes/Review.js'
import authentication from "./middlewares/Authentication.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDb().then(r => r);

// Routes
app.use('/api', authentication) //token verification middleware

app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/provider', provider);
app.use('/api/service', service);
app.use('/api/booking', booking);
app.use('/api/review', review);

export default app;
