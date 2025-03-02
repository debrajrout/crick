const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    // Destructure the request body with only the essential fields from Firebase phone auth
    const {
        firebaseUid,
        mobileNumber,
        name,        // Optional, no default
        gender,      // Optional, no default
        email        // Optional, no default
    } = req.body;

    // Validate required fields
    if (!firebaseUid || !mobileNumber) {
        return res.status(400).json({ error: 'Firebase UID and mobile number are required' });
    }

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ firebaseUid });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user with only provided fields
        const newUser = new User({
            firebaseUid,
            mobileNumber,
            ...(name && { name }),       // Include only if provided
            ...(gender && { gender }),   // Include only if provided
            ...(email && { email })      // Include only if provided
        });

        await newUser.save();
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};