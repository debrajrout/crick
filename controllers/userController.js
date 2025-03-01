const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    // Destructure the request body with default values
    const {
        firebaseUid,
        name = "Default Name",
        mobileNumber = "",
        gender = "Unknown",
        email = "default@example.com"
    } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ firebaseUid });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            firebaseUid,
            name,
            mobileNumber,
            gender,
            email,
        });

        await newUser.save();
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
