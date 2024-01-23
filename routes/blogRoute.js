const express = require('express');
const route = express.Router();
const multer = require('multer'); // for handling file uploads
const path = require('path');
const Blog = require('../models/Blog');
const User = require("../models/User");
const authenticateToken = require('./authmiddleware');
const BlogController = require('../controllers/BlogController'); // 
const userController = require('../controllers/UserController');
const secret_Key = "yoyo";
// Multer  for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads")); // specify  where you want to store uploaded photos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); //   filename
  },
});

const upload = multer({ storage: storage });

// Get the latest blog posts
route.get('/getlatestBlogs', async (req, res) => {
    console.log('Reached here'); 
    try {
      const latestblogs =  await BlogController.getlatestBlogs();
      res.json(latestblogs);
     
    } catch (error) {
       
      res.status(500).json({ error: 'Server error' });
    }
  });

//Get all blogs
route.get('/getAllBlogs', async (req, res) => {
  try {
    const blogs = await BlogController.getAllBlogs(); 
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
route.get('/getBlogByTitle', async (req, res) => {
  try {
    const title=req.params.getBlogByTitle;
    const blogs = await BlogController.getBlogByTitle(title); 
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


//Blog search
route.get('blogsearch/:blogsearch', async (req, res) => {
  try {
    const blogs = await BlogController.blogsearch(); 
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

route.get('/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId); //  author details
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


    //const blog = await Blog.find(req.params.blogsearch); 
   

// function verifyToken(req,res,next){
//   const bearerHeader =req.header['authorization']
//   if(typeof bearerHeader !='undefined'){
//       const bearer=bearerHeader.split('');
//       const bearerToken=bearer[1];
//       req.token=bearerToken;
//       next();
//   }else{
//       res.json('not verified');
//   }

// }
// Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).send('Unauthorized');

//   jwt.verify(token,secret_Key, (err, user) => {
//     if (err) return res.status(403).send('Forbidden');
//     req.user = user;
//     next();
//   });
// };


//Create a new blog
route.post('/createBlog',authenticateToken, upload.single('photo'), async (req, res) => {
    try {
      let imgurl = req.file.filename;
      console.log(req.body);
      const { title, body, author, tags } = req.body;
      
      const foundauthor = await User.findOne({_id:author});
      jwt.verify(req.token,secret_Key,(err,authData)=>{
        if(err){
            res.json('error verify')
        } else{
            res.json('blog created',authData)
        }
    })
     console.log(author);
      if (!foundauthor) {
        return res.status(404).json({ error: 'Author not found' });
      }
  
      let data = await BlogController.createBlog(title, body, imgurl, author, tags)
      res.send("data is saved in the database");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  


// Update a blog by title
route.patch('updateblog/:blogTitle', upload.single('photo'), async (req, res) => {
  try {
    const { title, body,author,tags } = req.body;
    const blogTitle = req.params.blogTitle;
  
    let photo = req.file.filename;
    const updatedBlog = await BlogController.updateBlog(blogTitle,title,body,photo,author,tags);
    console.log("Edit Blog :", updatedBlog);
      
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
  }
   catch (error) {
    res.status(500).json({ error: 'Server error in blog' });
  }
});

// Delete a blog by ID
route.delete('/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

  
module.exports = route;
