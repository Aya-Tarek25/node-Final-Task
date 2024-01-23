const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender:{type:String,default:'male'},
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);
User.createIndexes({ username: 1 });
module.exports = User;
