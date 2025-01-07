import mongoose from 'mongoose';

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log('Connected to MongoDB'));
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Заверши процесс при ошибке подключения
    }
}

export default connectDb;