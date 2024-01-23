const Blog = require('../models/Blog');


 const  getAllBlogs= async () => {
    try {
      const blogs = await Blog.find({},{title:1,body:1,author:1,_id:0});
      return blogs;
    } catch (error) {
      console.log("error in getallblogs");
    }
  }
  const getlatestBlogs = async () => {
    try {
        const latestBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(15);
        console.log(latestBlogs);
        return latestBlogs;
    } catch (error) {
        console.log("Error in getlatestBlogs:", error);
       
    }
}

 const getBlogByTitle= async (_title) => {
    try {
      const blog = await Blog.findOne({title:_title});
      return blog;
    } catch (error) {
      throw error;
    }
  }
  const Blogsearch= async (blogsearch) => {
    try{
    const blog = await Blog.find({
      $or: [{title: req.params.blogsearch},{ body:req.params.blogsearch },{ tags: { $in: [req.params.blogsearch] } }],
      })
    if (!blog) {
      return res.status(404).json('Blog not found' );
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json(  'Server error' );
  }
}

  const createBlog= async (_title, _body,_photo,_author,_tags) => {
    try {
        let data = await Blog.create({
            title:_title,
            body: _body,
             photo: _photo,
            author: _author,
            tags: _tags
           
        })

        if (data) {
            console.log("ok");
        }
    }
    catch (e) {

    }
  }

 const  updateBlog= async ( blogTitle,title, body,photo,author,tags) => {
    try {
      const updatedBlog = await Blog.updateOne({title:blogTitle},{title:title,body:body,photo:photo,author:author,tags:tags});

      return updatedBlog;
    } catch (error) {
      console.log(error in blogcontroller);;
    }
  }

  const deleteBlog =async (blogId) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      return deletedBlog;
    } catch (error) {
        console.log(e);
    }
  }


module.exports = {deleteBlog,updateBlog,createBlog,getBlogByTitle,getAllBlogs,getlatestBlogs,Blogsearch};
