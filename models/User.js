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
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
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

// Method to calculate attendance percentage for a specific month
userSchema.methods.getAttendancePercentage = function (year, month) {
    const yearRecord = this.attendance.find(record => record.year === year);
    if (!yearRecord) return 0;

    const monthRecord = yearRecord.months.find(m => m.month === month);
    if (!monthRecord) return 0;

    const totalDays = monthRecord.days.length;
    const presentDays = monthRecord.days.filter(day => day.present).length;

    return totalDays ? (presentDays / totalDays) * 100 : 0;
};

const User = mongoose.model('User', userSchema);
module.exports = User;