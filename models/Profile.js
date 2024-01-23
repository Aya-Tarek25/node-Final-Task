const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  bio: String,
  // Add any other profile-related fields here
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
