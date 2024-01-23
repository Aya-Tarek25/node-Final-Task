const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Auth = require('../models/Auth');
const secret_Key = "yoyo";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json('Invalid credentials' );
    }
 // Save token in Auth 
    const token = jwt.sign({ userId: user._id }, secret_Key, { expiresIn: '1h' });
    let data = await Auth.create({ user: user._id ,token:token});
   console.log(data);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {login};
