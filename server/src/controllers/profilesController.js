const Profile = require('../models/profileModel')

// Create Profile
exports.createProfile = async (req, res) => {
    const { code, fullname, yearofbirth, sex, job, phone, address } = req.body
    const record = []
    const schedules = []
    try {
      const newProfile = new Profile({ code, fullname, yearofbirth, sex, job, phone, address, job, record, schedules });
      const savedProfile = await newProfile.save();
      res.status(201).json(savedProfile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update profile
exports.updateProfile = async (req, res) => {
    const { fullname, birthday, address, code, job, sex, record, schedules } = req.body
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id, 
            { fullname, birthday, address, code, job, sex, record, schedules },
            { new: true }
        );
        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete profile
exports.deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
