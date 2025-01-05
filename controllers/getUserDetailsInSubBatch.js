const User = require('../models/User');  // Import the User model
const Batch = require('../models/Batch');  // Import the Batch model

// Controller to fetch name and playerType of users in a sub-batch
exports.getUserDetailsInSubBatch = async (req, res) => {
    const { userIds } = req.body;  // Array of user IDs passed in the request body

    try {
        // Fetch users by their IDs
        const users = await User.find({ '_id': { $in: userIds } }, 'name playerType');

        // If no users are found
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // Map the users' data to return only name and playerType
        const userDetails = users.map(user => ({
            name: user.name,
            playerType: user.playerType,
        }));

        // Send back the user details
        res.status(200).json({ userDetails });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
