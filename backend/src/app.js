import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })
import express from 'express'
import mongoose from 'mongoose';
// import routes from './routes'
import cors from 'cors'

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
app.use('/', (req, res) =>{
    res.send('123123123')
});

export default app;
