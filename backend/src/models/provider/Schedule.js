import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    times: [
        {
            time: { type: Date, required: true },
            isBooked: { type: Boolean, default: false },
            bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If booked
        },
    ],
}, {
    timestamps: true,
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;