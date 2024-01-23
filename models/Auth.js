const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  token: { type: String, required: true },
});

const Auth = mongoose.model('Auth', authSchema);



module.exports = Auth;
