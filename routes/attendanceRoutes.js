// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint to mark attendance
router.post('/mark', async (req, res) => {
    const { userId, year, month, day, present } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let yearRecord = user.attendance.find(record => record.year === year);
        if (!yearRecord) {
            yearRecord = { year, months: [] };
            user.attendance.push(yearRecord);
        }

        let monthRecord = yearRecord.months.find(m => m.month === month);
        if (!monthRecord) {
            monthRecord = { month, days: [] };
            yearRecord.months.push(monthRecord);
        }

        const dayRecord = monthRecord.days.find(d => d.day === day);
        if (dayRecord) {
            dayRecord.present = present; // Update existing record
        } else {
            monthRecord.days.push({ day, present }); // Add new day record
        }

        await user.save();
        res.status(200).json({ message: 'Attendance marked successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get attendance percentage for a specific month
router.get('/percentage/:userId/:year/:month', async (req, res) => {
    const { userId, year, month } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const percentage = user.getAttendancePercentage(parseInt(year), parseInt(month));
        res.status(200).json({ attendancePercentage: percentage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;