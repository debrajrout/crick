// models/Match.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const matchSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    place: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
        trim: true,
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    prize: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Played', 'Upcoming'],
        default: 'Upcoming',
    }
}, {
    timestamps: true,
});
matchSchema.pre('save', function (next) {
    const currentTime = new Date();
    if (this.time <= currentTime) {
        this.status = 'Played';
    } else {
        this.status = 'Upcoming';
    }
    next();
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;