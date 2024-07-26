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
    const { fullname, yearofbirth, address, code, job, sex, record, schedules } = req.body
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id, 
            { fullname, yearofbirth, address, code, job, sex, record, schedules },
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
// Get profile by code
exports.getProfileByCode = async (req, res) => {
  const { year, count } = req.query;

  if (!year || !count) {
    return res.status(400).json({ message: 'Year and count are required' });
  }

  try {
    const profile = await Profile.findOne({ 'code.year': parseInt(year), 'code.count': parseInt(count) });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
