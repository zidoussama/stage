const user =require('../models/Users');

exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await user.findById(req.user.id);
        if (!userProfile) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(userProfile);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.updateUserProfile = async (req, res) => {
    try {
        const { firstname, lastname, phonenumber, email } = req.body;

        const userProfile = await user.findById(req.user.id);
        if (!userProfile) return res.status(404).json({ message: 'User not found' });

        userProfile.firstname = firstname || userProfile.firstname;
        userProfile.lastname = lastname || userProfile.lastname;
        userProfile.phonenumber = phonenumber || userProfile.phonenumber;
        userProfile.email = email || userProfile.email;

        await userProfile.save();
        res.status(200).json({ message: 'User profile updated', userProfile });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await user.findByIdAndDelete(req.user.id);
        if (!userProfile) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User profile deleted', userProfile });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};