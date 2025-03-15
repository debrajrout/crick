const User = require('../models/User');

exports.updateUserInfo = async (req, res) => {
    const { firebaseUid, name, weight, height, birthDate } = req.body;

    // Ensure all required fields are present
    if (!firebaseUid) {
        return res.status(400).json({ error: 'firebaseUid is required' });
    }

    try {
        // Find the user by firebaseUid
        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Explicitly prevent firebaseUid modification
        if (req.body.firebaseUid && req.body.firebaseUid !== firebaseUid) {
            return res.status(400).json({ error: 'Modification of firebaseUid is not allowed' });
        }

        // Update only the fields provided in the request body
        if (name !== undefined) user.name = name;
        if (weight !== undefined) user.weight = weight;
        if (height !== undefined) user.height = height;
        if (birthDate !== undefined) {
            const parsedDate = new Date(birthDate);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ error: 'Invalid birthDate format' });
            }
            user.birthDate = parsedDate;
        }

        // Save the updated user document
        await user.save();

        // Respond with the updated user information
        res.status(200).json({
            message: 'User information updated successfully',
            user: {
                name: user.name,
                weight: user.weight,
                height: user.height,
                birthDate: user.birthDate,
                firebaseUid: user.firebaseUid
            }
        });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
