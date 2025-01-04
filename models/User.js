// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    months: [{
        month: {
            type: Number,
            required: true,
        },
        days: [{
            day: {
                type: Number,
                required: true,
            },
            present: {
                type: Boolean,
                required: true,
            }
        }]
    }]
});

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    birthDate: {
        type: Date,
    },
    mobileNumber: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
    },
    batch: {
        type: Schema.Types.ObjectId,
        ref: 'Batch',  // Use the name of the model as a string
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    role: {
        type: String,
        enum: ['Admin', 'Player', 'Coach'],
        default: 'Player',
    },
    attendance: [attendanceSchema],
    playedMatches: [
        {
            match: {
                type: Schema.Types.ObjectId,
                ref: 'Match',
            },
            result: {
                type: String,
                enum: ['Win', 'Lose'],
            },
        }
    ],
    upcomingMatches: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Match',
        }
    ],
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
module.exports = User;
