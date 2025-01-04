const Batch = require('../models/Batch'); // Import the Batch model
const User = require('../models/User');  // Import the User model (if needed to reference users)

const createBatch = async (req, res) => {
    const { name, subBatches } = req.body;

    // Check if the required fields are provided
    if (!name || !subBatches || !Array.isArray(subBatches)) {
        return res.status(400).json({ error: 'Batch name and sub-batches are required' });
    }

    // Ensure each sub-batch has a name and users
    for (const subBatch of subBatches) {
        if (!subBatch.name || !Array.isArray(subBatch.users)) {
            return res.status(400).json({ error: 'Each sub-batch must have a name and users' });
        }
    }

    try {
        // Create a new batch with sub-batches
        const newBatch = new Batch({
            name,
            subBatches: subBatches.map(subBatch => ({
                name: subBatch.name,
                users: subBatch.users,  // Array of user IDs
            })),
        });

        // Save the batch to the database
        await newBatch.save();

        return res.status(201).json({
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
