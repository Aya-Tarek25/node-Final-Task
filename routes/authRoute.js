const AuthController = require('../controllers/AuthController');
const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();
const bcrypt = require('bcrypt');
const Auth = require("../models/Auth");
const authenticateToken = require('./authmiddleware');

const express = require('express');



// Route to generate and save authentication token
route.post('/login',AuthController.login);

module.exports = route;
