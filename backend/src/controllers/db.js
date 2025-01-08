import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve('../../.env') });

async function connectDb() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MONGO_URI is not defined. Check your .env file and its path.');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

export default connectDb;
