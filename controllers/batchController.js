const Batch = require('../models/Batch'); // Import the Batch model
const User = require('../models/User'); // Import the User model (if needed to reference users)

const createBatch = async (req, res) => {
    const { name, subBatches, creatorId, description } = req.body; // Added creatorId and description to the request body

    // Check if the required fields are provided
    if (!name || !subBatches || !Array.isArray(subBatches) || !creatorId) {
        return res.status(400).json({ error: 'Batch name, sub-batches, and creator are required' });
    }

    // Ensure each sub-batch has a name and users
    for (const subBatch of subBatches) {
        if (!subBatch.name || !Array.isArray(subBatch.users)) {
            return res.status(400).json({ error: 'Each sub-batch must have a name and users' });
        }
    }

    try {
        // Check if the creator (user) exists in the User model
        const creator = await User.findById(creatorId);
        if (!creator) {
            return res.status(404).json({ error: 'Creator not found' });
        }

        // Create a new batch with sub-batches, description, and creatorId
        const newBatch = new Batch({
            name,
            description,  // Add description to the batch (optional)
            subBatches: subBatches.map(subBatch => ({
                name: subBatch.name,
                users: subBatch.users,  // Array of user IDs
            })),
            creatorId,  // Set the creatorId field to the provided user ID
        });

        // Save the batch to the database
        await newBatch.save();

        return res.status(201).json({
            success: true,
            message: 'Batch created successfully!',
            batch: newBatch,
        });
    } catch (error) {
        console.error('Error creating batch:', error);
        return res.status(500).json({ error: 'Error creating batch' });
    }
};

module.exports = {
    createBatch,
};
