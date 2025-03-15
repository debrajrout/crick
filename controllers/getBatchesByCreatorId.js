const Batch = require('../models/Batch'); // Import the Batch model
const User = require('../models/User');  // Import the User model (if needed to reference users)

const getBatchesByCreatorId = async (req, res) => {
    const { creatorId } = req.params;  // Get creatorId from URL parameters

    try {
        // Check if the creator (user) exists in the User model
        const creator = await User.findById(creatorId);
        if (!creator) {
            return res.status(404).json({ error: 'Creator not found' });
        }

        // Fetch all batches created by the user
        const batches = await Batch.find({ creatorId });

        // If no batches are found, return an empty array
        if (batches.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No batches found for this user.',
                batches: [],
            });
        }

        // Return the batches
        return res.status(200).json({
            success: true,
            message: 'Batches fetched successfully!',
            batches,
        });
    } catch (error) {
        console.error('Error fetching batches:', error);
        return res.status(500).json({ error: 'Error fetching batches' });
    }
};

module.exports = {
    getBatchesByCreatorId,
};
