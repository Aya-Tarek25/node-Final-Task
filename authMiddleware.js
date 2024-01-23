const jwt = require('jsonwebtoken');
const secret_Key = "yoyo";

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, secret_Key, (err, user) => {
        if (err) return res.status(403).send('Forbidden');
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
