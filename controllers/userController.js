const admin = require('../config/firebaseConfig');
const User = require('../models/User');

// Registration flow
exports.registerUser = async (req, res) => {
    const { phoneNumber, verificationId, verificationCode, name, gender } = req.body;

    try {
        // Verify the OTP
        const credential = admin.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
        const userRecord = await admin.auth().signInWithCredential(credential);

        // Check if user already exists
        let user = await User.findOne({ mobileNumber: phoneNumber });

        if (!user) {
            // Create new user
            user = new User({
                name,
                mobileNumber: phoneNumber,
                gender,
            });
            await user.save();
            res.status(200).json({ message: "User registered successfully", user });
        } else {
            res.status(400).json({ error: "User already registered" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "OTP verification failed or internal server error" });
    }
};

// Login flow
exports.loginUser = async (req, res) => {
    const { phoneNumber, verificationId, verificationCode } = req.body;

    try {
        // Check if the user is registered
        let user = await User.findOne({ mobileNumber: phoneNumber });

        if (!user) {
            return res.status(400).json({ error: "User is not registered" });
        }

        // Verify the OTP
        const credential = admin.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
        const userRecord = await admin.auth().signInWithCredential(credential);

        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "OTP verification failed or internal server error" });
    }
};
