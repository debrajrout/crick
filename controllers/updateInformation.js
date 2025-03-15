const User = require('../models/User');

exports.updateUserInfo = async (req, res) => {
    const {
        firebaseUid, name, weight, height, birthDate, education, referance, disease,
        injury, parrentName, occupation, address, remark, mobileNumber, email,
        batch, gender, role, playerType, attendance, playedMatches, upcomingMatches
    } = req.body;

    // Ensure required field
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

        // Update only provided fields
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
        if (education !== undefined) user.education = education;
        if (referance !== undefined) user.referance = referance;
        if (disease !== undefined) user.disease = disease;
        if (injury !== undefined) user.injury = injury;
        if (parrentName !== undefined) user.parrentName = parrentName;
        if (occupation !== undefined) user.occupation = occupation;
        if (address !== undefined) user.address = address;
        if (remark !== undefined) user.remark = remark;
        if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
        if (email !== undefined) user.email = email;
        if (batch !== undefined) user.batch = batch;
        if (gender !== undefined) user.gender = gender;
        if (role !== undefined) user.role = role;
        if (playerType !== undefined) user.playerType = playerType;
        if (attendance !== undefined) user.attendance = attendance;
        if (playedMatches !== undefined) user.playedMatches = playedMatches;
        if (upcomingMatches !== undefined) user.upcomingMatches = upcomingMatches;

        // Save the updated user document
        await user.save();

        res.status(200).json({
            message: 'User information updated successfully',
            user
        });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
