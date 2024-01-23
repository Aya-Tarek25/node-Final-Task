const mongoose = require('mongoose');
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = 8000;
//const session = require('express-session')
const User = require('./models/User');
const Blog = require('./models/Blog');
const Auth = require('./models/Auth');
const{authenticateToken}=require('authmiddleware')
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
//const authRoute = require('./routes/authRoute');
//const profileRoute = require('./routes/profileRoute'); 

const userController = require("./controllers/UserController")
const todoController = require("./controllers/BlogController")
mongoose.connect('mongodb://127.0.0.1:27017/BlogWebsite').then(() => {
    console.log("connect to db");
}).catch(err => {
    console.log(err);
})

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Unauthorized');
  
//     jwt.verify(token,secret_Key, (err, user) => {
//       if (err) return res.status(403).send('Forbidden');
//       req.user = user;
//       next();
//     });
//   };
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(authenticateToken);
// app.use(session({
//     secret: "yoyo",
//     resave: false,
//     saveUninitialized: true,

// }))
 
  
  

// routes
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/auth', authRoute);




app.listen(port, () => console.log(`listening on port ${port}!`))
