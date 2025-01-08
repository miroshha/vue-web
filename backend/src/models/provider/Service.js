import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'archived'],
        default: 'active',
    },
    discount: {
        type: Number,
        default: 0,
    }

}, {
    timestamps: true,
});

const Service = mongoose.model('Service', ServiceSchema);

export default Service;