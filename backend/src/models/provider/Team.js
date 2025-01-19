import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    servicesId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Service',
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});

const Team = mongoose.model('Team', TeamSchema);

export default Team;