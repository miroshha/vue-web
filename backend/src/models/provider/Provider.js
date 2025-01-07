import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    workingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String },
    },

}, {
    timestamps: true,
});

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;