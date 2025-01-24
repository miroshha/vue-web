import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    isGoogleRegistered: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['client', 'provider'],
        default: 'client',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    bookings: [
        {
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
            providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
            date: { type: Date },
            time: { type: String },
        },
    ],
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;