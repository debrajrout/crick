const User = require('../models/User');

// Get user details by _id
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by _id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
