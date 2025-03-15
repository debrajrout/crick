const User = require('../models/User');

// Get user details by firebaseUid
exports.getUserByFirebaseUid = async (req, res) => {
    const { firebaseUid } = req.params;

    try {
        // Find the user by firebaseUid
        const user = await User.findOne({ firebaseUid })

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
