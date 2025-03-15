const User = require('../models/User');

// Function to calculate the Haversine distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// Mark attendance if user is within 1 km and within time range
exports.markAttendance = async (req, res) => {
    const { firebaseUid, latitude, longitude } = req.body;
    const predefinedLat = 21.4974;
    const predefinedLon = 83.9040;

    try {
        // Find user by firebaseUid
        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate distance from predefined coordinates
        const distance = calculateDistance(latitude, longitude, predefinedLat, predefinedLon);

        if (distance <= 10000000000000) {
            // Get the current date and time
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Month is 0-indexed, adding 1
            const day = currentDate.getDate();
            const currentHour = currentDate.getHours();

            // Ensure the current time is between 9 AM and 7 PM
            if (currentHour < 9 || currentHour > 19) {
                return res.status(400).json({ message: 'Attendance can only be marked between 9 AM and 7 PM' });
            }

            // Find or create year record
            let yearRecord = user.attendance.find(record => record.year === year);
            if (!yearRecord) {
                yearRecord = { year, months: [] };
                user.attendance.push(yearRecord);
            }

            // Find or create month record
            let monthRecord = yearRecord.months.find(m => m.month === month);
            if (!monthRecord) {
                monthRecord = { month, days: [] };
                yearRecord.months.push(monthRecord);
            }

            // Check if attendance for today is already marked
            let dayRecord = monthRecord.days.find(d => d.day === day);
            if (!dayRecord) {
                // Mark attendance for the day if not already present
                dayRecord = { day, present: true };
                monthRecord.days.push(dayRecord);
            } else if (!dayRecord.present) {
                // Update present status if day exists but not marked as present
                dayRecord.present = true;
            } else {
                // Attendance already marked
                return res.status(200).json({ message: 'Attendance already marked for today' });
            }

            // Reassign arrays to ensure changes are recognized by Mongoose
            yearRecord.months = yearRecord.months.map(m => (m.month === month ? monthRecord : m));
            user.attendance = user.attendance.map(record => (record.year === year ? yearRecord : record));

            // Mark the attendance field as modified and save the user document
            user.markModified('attendance');
            await user.save();

            // Send response with date and present status
            res.status(200).json({
                message: 'Attendance marked successfully',
                attendance: {
                    date: `${year}-${month}-${day}`,
                    present: true
                }
            });
        } else {
            res.status(400).json({ message: 'User is not within the required distance to mark attendance' });
        }
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
